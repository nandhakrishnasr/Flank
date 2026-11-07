import os
# Force WebView2 default background color to fully transparent before anything initializes
os.environ['WEBVIEW2_DEFAULT_BACKGROUND_COLOR'] = '0'

import ctypes
from ctypes import wintypes
import json
import shutil
import subprocess
import sys
import threading
import time
import webbrowser
import winreg
from typing import Any, Dict, List

# Enable Per-Monitor V2 DPI Awareness before WebView2 / WinForms initialization for crisp rendering
try:
    ctypes.windll.user32.SetProcessDpiAwarenessContext(ctypes.c_void_p(-4))
except Exception:
    try:
        ctypes.windll.shcore.SetProcessDpiAwareness(2)
    except Exception:
        pass

import webview

try:
    import clr
    clr.AddReference('System.Drawing')
    clr.AddReference('System.Windows.Forms')
    import System.Drawing as Drawing
    import System.Windows.Forms as Forms
    import System
except Exception:
    Drawing = None
    Forms = None
    System = None

# Ensure host directory is on sys.path

def _log_debug(msg: str) -> None:
    try:
        app_data_dir = os.path.join(os.environ.get('APPDATA', os.path.expanduser('~')), 'Flank')
        os.makedirs(app_data_dir, exist_ok=True)
        with open(os.path.join(app_data_dir, 'flank_debug.log'), 'a', encoding='utf-8') as f:
            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}\n")
    except Exception:
        pass
HOST_DIR = os.path.dirname(os.path.abspath(__file__))
if HOST_DIR not in sys.path:
    sys.path.insert(0, HOST_DIR)

from clipboard_service import ClipboardService
from providers import SystemProviders
from wallpaper import WallpaperManager

user32 = ctypes.WinDLL('user32', use_last_error=True)
gdi32 = ctypes.WinDLL('gdi32', use_last_error=True)
shell32 = ctypes.WinDLL('shell32', use_last_error=True)
dwmapi = ctypes.WinDLL('dwmapi', use_last_error=True)

GWL_EXSTYLE = -20
WS_EX_TOOLWINDOW = 0x00000080
WS_EX_TOPMOST = 0x00000008
WS_EX_NOACTIVATE = 0x08000000

WM_HOTKEY = 0x0312
WM_RELOAD_HOTKEYS = 0x0401  # WM_USER + 1
MOD_ALT = 0x0001
MOD_CONTROL = 0x0002
MOD_SHIFT = 0x0004
MOD_NOREPEAT = 0x4000

class RECT(ctypes.Structure):
    _fields_ = [
        ('left', ctypes.c_long),
        ('top', ctypes.c_long),
        ('right', ctypes.c_long),
        ('bottom', ctypes.c_long),
    ]

SPI_GETWORKAREA = 0x0030
RGN_AND = 1
MONITOR_DEFAULTTONEAREST = 2

class MONITORINFO(ctypes.Structure):
    _fields_ = [
        ('cbSize', wintypes.DWORD),
        ('rcMonitor', RECT),
        ('rcWork', RECT),
        ('dwFlags', wintypes.DWORD),
    ]

class SHFILEINFOW(ctypes.Structure):
    _fields_ = [
        ('hIcon', wintypes.HICON),
        ('iIcon', ctypes.c_int),
        ('dwAttributes', wintypes.DWORD),
        ('szDisplayName', wintypes.WCHAR * 260),
        ('szTypeName', wintypes.WCHAR * 80),
    ]

SHGFI_ICON = 0x000000100
SHGFI_LARGEICON = 0x000000000

class LASTINPUTINFO(ctypes.Structure):
    _fields_ = [('cbSize', wintypes.UINT), ('dwTime', wintypes.DWORD)]

def get_work_area_for_hwnd(hwnd: int) -> tuple[int, int, int, int]:
    try:
        hmon = user32.MonitorFromWindow(wintypes.HWND(hwnd), MONITOR_DEFAULTTONEAREST)
        if hmon:
            mi = MONITORINFO()
            mi.cbSize = ctypes.sizeof(MONITORINFO)
            if user32.GetMonitorInfoW(hmon, ctypes.byref(mi)):
                rc = mi.rcWork
                w = rc.right - rc.left
                h = rc.bottom - rc.top
                if w > 0 and h > 0:
                    return (rc.left, rc.top, w, h)
    except Exception:
        pass
    return get_work_area()

def get_idle_seconds() -> float:
    try:
        lii = LASTINPUTINFO()
        lii.cbSize = ctypes.sizeof(LASTINPUTINFO)
        if user32.GetLastInputInfo(ctypes.byref(lii)):
            millis = ctypes.windll.kernel32.GetTickCount() - lii.dwTime
            return millis / 1000.0
    except Exception:
        pass
    return 0.0

def is_fullscreen_app_active() -> bool:
    try:
        q_state = wintypes.DWORD()
        res = shell32.SHQueryUserNotificationState(ctypes.byref(q_state))
        if res == 0 and q_state.value == 3:  # QUNS_RUNNING_D3D_FULL_SCREEN
            return True
    except Exception:
        pass
    return False


WM_SETICON = 0x0080
ICON_SMALL = 0
ICON_BIG = 1
IMAGE_ICON = 1
LR_LOADFROMFILE = 0x0010

def apply_window_icon(hwnd: int, icon_path: str) -> None:
    try:
        if os.path.isfile(icon_path):
            h_big = user32.LoadImageW(None, icon_path, IMAGE_ICON, 32, 32, LR_LOADFROMFILE)
            if h_big:
                user32.SendMessageW(hwnd, WM_SETICON, ICON_BIG, h_big)
            h_small = user32.LoadImageW(None, icon_path, IMAGE_ICON, 16, 16, LR_LOADFROMFILE)
            if h_small:
                user32.SendMessageW(hwnd, WM_SETICON, ICON_SMALL, h_small)
    except Exception as e:
        _log_debug(f"apply_window_icon error: {e}")
def resolve_icon_path() -> str:
    if getattr(sys, 'frozen', False):
        exe_dir = os.path.dirname(sys.executable)
        for cand in (
            os.path.join(exe_dir, '_internal', 'assets', 'brand', 'flank.ico'),
            os.path.join(exe_dir, '_internal', 'assets', 'flank.ico'),
            os.path.join(exe_dir, 'assets', 'brand', 'flank.ico'),
            os.path.join(exe_dir, 'assets', 'flank.ico'),
        ):
            if os.path.isfile(cand):
                return cand
        if hasattr(sys, '_MEIPASS'):
            for cand in (
                os.path.join(sys._MEIPASS, 'assets', 'brand', 'flank.ico'),
                os.path.join(sys._MEIPASS, 'assets', 'flank.ico'),
            ):
                if os.path.isfile(cand):
                    return cand
    base = os.path.abspath(os.path.join(HOST_DIR, '..'))
    p = os.path.join(base, 'assets', 'brand', 'flank.ico')
    if os.path.isfile(p):
        return p
    return os.path.join(base, 'assets', 'flank.ico')

class FlankTray:
    def __init__(self, api: Any):
        _log_debug("FlankTray __init__ start")
        self.api = api
        self.notify_icon = Forms.NotifyIcon()
        icon_path = resolve_icon_path()
        if Drawing and os.path.isfile(icon_path):
            try:
                self.notify_icon.Icon = Drawing.Icon(icon_path, 16, 16)
            except Exception:
                try:
                    self.notify_icon.Icon = Drawing.Icon(icon_path)
                except Exception:
                    pass
        self.notify_icon.Text = "Flank"

        self.menu = Forms.ContextMenuStrip()
        self.toggle_item = Forms.ToolStripMenuItem("Hide Flank")
        self.toggle_item.Click += self._on_toggle
        self.settings_item = Forms.ToolStripMenuItem("Settings")
        self.settings_item.Click += self._on_settings
        self.quit_item = Forms.ToolStripMenuItem("Quit")
        self.quit_item.Click += self._on_quit

        self.menu.Items.Add(self.toggle_item)
        self.menu.Items.Add(self.settings_item)
        self.menu.Items.Add(Forms.ToolStripSeparator())
        self.menu.Items.Add(self.quit_item)

        self.notify_icon.ContextMenuStrip = self.menu
        self.notify_icon.DoubleClick += self._on_double_click
        self.notify_icon.Visible = True

    def update_state(self, collapsed: bool):
        try:
            self.toggle_item.Text = "Show Flank" if collapsed else "Hide Flank"
        except Exception:
            pass

    def _on_toggle(self, sender, args):
        self.api.toggle_dock()

    def _on_settings(self, sender, args):
        self.api.open_window('settings')

    def _on_quit(self, sender, args):
        self.dispose()
        os._exit(0)

    def _on_double_click(self, sender, args):
        self.api.toggle_dock()

    def dispose(self):
        try:
            self.notify_icon.Visible = False
            self.notify_icon.Dispose()
        except Exception:
            pass

DEFAULT_ITEMS: List[Dict[str, Any]] = [
    # Apps Group (Default ON)
    {'id': 'app-terminal', 'group': 'apps', 'kind': 'app', 'label': 'Terminal', 'shortCode': '01', 'icon': 'terminal', 'shortcut': 'Alt+1', 'enabled': True, 'target': 'wt.exe'},
    {'id': 'app-browser', 'group': 'apps', 'kind': 'app', 'label': 'Browser', 'shortCode': '02', 'icon': 'browser', 'shortcut': 'Alt+2', 'enabled': True, 'target': 'https://www.google.com'},
    {'id': 'app-files', 'group': 'apps', 'kind': 'app', 'label': 'Files', 'shortCode': '03', 'icon': 'files', 'shortcut': 'Alt+3', 'enabled': True, 'target': 'explorer.exe'},
    {'id': 'app-notes', 'group': 'apps', 'kind': 'app', 'label': 'Notes', 'shortCode': '04', 'icon': 'notes', 'shortcut': 'Alt+4', 'enabled': True, 'target': 'notepad.exe'},
    # Recommended Widgets Group (Default ON)
    {'id': 'widget-clock', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'clock', 'label': 'World clock', 'shortCode': 'clk', 'icon': 'clock', 'shortcut': 'Alt+C', 'enabled': True},
    {'id': 'widget-weather', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'weather', 'label': 'Weather', 'shortCode': 'wthr', 'icon': 'sun', 'shortcut': 'Alt+W', 'enabled': True},
    {'id': 'widget-battery', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'battery', 'label': 'Laptop battery', 'shortCode': 'bat', 'icon': 'battery', 'shortcut': 'Alt+B', 'enabled': True},
    {'id': 'widget-audio', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'audio', 'label': 'Audio & mic mixer', 'shortCode': 'vol', 'icon': 'volume', 'shortcut': 'Alt+U', 'enabled': True},
    {'id': 'widget-focus', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'focus', 'label': 'Focus timer', 'shortCode': 'fcs', 'icon': 'focus', 'shortcut': 'Alt+F', 'enabled': True},
    {'id': 'widget-activity', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'activity', 'label': 'AI activity', 'shortCode': 'act', 'icon': 'activity', 'shortcut': 'Alt+Y', 'enabled': True},
    {'id': 'widget-bluetooth', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'bluetooth', 'label': 'Bluetooth & peripherals', 'shortCode': 'bt', 'icon': 'bluetooth', 'shortcut': 'Alt+E', 'enabled': True},
    {'id': 'widget-calendar', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'calendar', 'label': 'Agenda & meetings', 'shortCode': 'cal', 'icon': 'calendar', 'shortcut': 'Alt+M', 'enabled': True},
    # Secondary Widgets (Available in Settings, Default OFF)
    {'id': 'widget-clipboard', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'clipboard', 'label': 'Clipboard history', 'shortCode': 'clip', 'icon': 'clipboard', 'shortcut': 'Ctrl+Alt+V', 'enabled': False},
    {'id': 'widget-stats', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'stats', 'label': 'System diagnostics', 'shortCode': 'cpu', 'icon': 'cpu', 'shortcut': 'Alt+S', 'enabled': False},
    {'id': 'widget-player', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'player', 'label': 'Mini player', 'shortCode': 'play', 'icon': 'equalizer', 'shortcut': 'Alt+P', 'enabled': False},
    {'id': 'widget-scratchpad', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'scratchpad', 'label': 'Quick scratchpad', 'shortCode': 'pad', 'icon': 'scratchpad', 'shortcut': 'Alt+N', 'enabled': False},
    {'id': 'widget-colorpicker', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'colorpicker', 'label': 'Color picker', 'shortCode': 'clr', 'icon': 'eyedropper', 'shortcut': 'Alt+K', 'enabled': False},
    {'id': 'widget-network', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'network', 'label': 'Network & ports', 'shortCode': 'net', 'icon': 'wifi', 'shortcut': 'Alt+I', 'enabled': False},
    {'id': 'widget-ai', 'group': 'widgets', 'kind': 'widget', 'widgetKind': 'ai', 'label': 'AI usage', 'shortCode': 'ai', 'icon': 'globe', 'shortcut': 'Alt+A', 'enabled': False},
]





gdi32.CreateRoundRectRgn.argtypes = [
    ctypes.c_int,
    ctypes.c_int,
    ctypes.c_int,
    ctypes.c_int,
    ctypes.c_int,
    ctypes.c_int,
]
gdi32.CreateRoundRectRgn.restype = wintypes.HRGN
gdi32.CreateRectRgn.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int, ctypes.c_int]
gdi32.CreateRectRgn.restype = wintypes.HRGN
gdi32.DeleteObject.argtypes = [wintypes.HGDIOBJ]
gdi32.DeleteObject.restype = wintypes.BOOL
gdi32.CombineRgn.argtypes = [wintypes.HRGN, wintypes.HRGN, wintypes.HRGN, ctypes.c_int]
gdi32.CombineRgn.restype = ctypes.c_int

user32.SetWindowRgn.argtypes = [wintypes.HWND, wintypes.HRGN, wintypes.BOOL]
user32.SetWindowRgn.restype = ctypes.c_int
user32.GetWindowLongW.argtypes = [wintypes.HWND, ctypes.c_int]
user32.GetWindowLongW.restype = ctypes.c_long
user32.SetWindowLongW.argtypes = [wintypes.HWND, ctypes.c_int, ctypes.c_long]
user32.SetWindowLongW.restype = ctypes.c_long

# DWM attributes used to strip the Windows 11 frame chrome
DWMWA_NCRENDERING_POLICY = 2
DWMNCRP_DISABLED = 1
DWMWA_WINDOW_CORNER_PREFERENCE = 33
DWMWCP_DONOTROUND = 1
DWMWCP_ROUND = 2
DWMWCP_ROUNDSMALL = 3
DWMWA_BORDER_COLOR = 34
DWMWA_COLOR_NONE = 0xFFFFFFFE
DWMWA_SYSTEMBACKDROP_TYPE = 38
DWMSBT_NONE = 1


def _dwm_set(hwnd: int, attr: int, value: int) -> None:
    try:
        v = ctypes.c_uint(value)
        dwmapi.DwmSetWindowAttribute(wintypes.HWND(hwnd), attr, ctypes.byref(v), ctypes.sizeof(v))
    except Exception:
        pass


class MARGINS(ctypes.Structure):
    _fields_ = [
        ('cxLeftWidth', ctypes.c_int),
        ('cxRightWidth', ctypes.c_int),
        ('cyTopHeight', ctypes.c_int),
        ('cyBottomHeight', ctypes.c_int),
    ]


def setup_transparency(form) -> None:
    """Make the native WinForms Form and its WebView2 fully transparent via DWM desktop composition."""
    try:
        hwnd = form.Handle.ToInt32()
        m = MARGINS(-1, -1, -1, -1)
        dwmapi.DwmExtendFrameIntoClientArea(wintypes.HWND(hwnd), ctypes.byref(m))
        if Drawing:
            form.BackColor = Drawing.Color.Black
        strip_dwm_chrome(hwnd)
        _dwm_set(hwnd, DWMWA_SYSTEMBACKDROP_TYPE, DWMSBT_NONE)
    except Exception:
        pass


def strip_dwm_chrome(hwnd: int) -> None:
    """Disable DWM's own rounded corners and border."""
    _dwm_set(hwnd, DWMWA_WINDOW_CORNER_PREFERENCE, DWMWCP_DONOTROUND)
    _dwm_set(hwnd, DWMWA_BORDER_COLOR, DWMWA_COLOR_NONE)


def apply_window_shape(hwnd: int, rgn: int = 0) -> None:
    """Strip DWM chrome then clip the window to `rgn` (system takes ownership)."""
    strip_dwm_chrome(hwnd)
    if rgn:
        user32.SetWindowRgn(hwnd, rgn, True)
    else:
        user32.SetWindowRgn(hwnd, 0, True)


def resolve_public_dir() -> str:
    if getattr(sys, 'frozen', False):
        if hasattr(sys, '_MEIPASS'):
            p = os.path.join(sys._MEIPASS, 'public')
            if os.path.isdir(p):
                return p
        exe_dir = os.path.dirname(sys.executable)
        for sub in ('_internal/public', 'public'):
            p = os.path.normpath(os.path.join(exe_dir, sub))
            if os.path.isdir(p):
                return p
    return os.path.abspath(os.path.join(HOST_DIR, '..', 'public'))


def get_work_area() -> tuple[int, int, int, int]:
    rc = RECT()
    user32.SystemParametersInfoW(SPI_GETWORKAREA, 0, ctypes.byref(rc), 0)
    w = rc.right - rc.left
    h = rc.bottom - rc.top
    if w <= 0 or h <= 0:
        return (0, 0, 1920, 1040)
    return (rc.left, rc.top, w, h)


def parse_shortcut_combo(combo: str) -> tuple[int, int] | None:
    parts = [p.strip().upper() for p in combo.split('+') if p.strip()]
    if not parts:
        return None
    mods = MOD_NOREPEAT
    key_part = parts[-1]
    for m in parts[:-1]:
        if m in ('CTRL', 'CONTROL'):
            mods |= MOD_CONTROL
        elif m == 'ALT':
            mods |= MOD_ALT
        elif m == 'SHIFT':
            mods |= MOD_SHIFT
    if len(key_part) == 1 and key_part.isalnum():
        return (mods, ord(key_part))
    special_vks = {
        ',': 0xBC,
        '.': 0xBE,
        '/': 0xBF,
        'SPACE': 0x20,
        'TAB': 0x09,
    }
    if key_part in special_vks:
        return (mods, special_vks[key_part])
    return None


windows: Dict[str, webview.Window] = {}


class FlankHostApi:
    def __init__(self, app_data_dir: str):
        self.app_data_dir = app_data_dir
        os.makedirs(app_data_dir, exist_ok=True)
        self.config_path = os.path.join(app_data_dir, 'config.json')
        self._clipboard = ClipboardService(os.path.join(app_data_dir, 'clipboard.db'))
        self._providers = SystemProviders(app_data_dir)
        self.hwnd: int = 0
        self.hotkey_thread_id: int = 0
        self.prefs = self._load_prefs()
        city = self.prefs.get('weatherCity')
        if city:
            self._providers._weather_city = city
        self._card_hide_timer: threading.Timer | None = None
        self._card_open: bool = False
        self._card_pinned: bool = False
        self._modal_open: bool = False
        # Logical (DIP) card and dock shape sizes & window padding (0 for clean borderless shape)
        self._dock_window_padding: int = 0
        self._card_window_padding: int = 0
        self._modal_window_padding: int = 0
        self._card_shape_size: tuple[int, int, int] = (292, 240, 20)
        self._dock_shape_rect: tuple[int, int, int, int] = (0, 0, 60, 660)
        self._wallpaper_mgr = WallpaperManager()
        self._is_collapsed = self.prefs.get('dockState') == 'collapsed' or self.prefs.get('startCollapsed', False)
        self._tray: FlankTray | None = None
        self._collapsed_due_to_fullscreen = False

    def _load_prefs(self) -> Dict[str, Any]:
        if os.path.isfile(self.config_path):
            try:
                with open(self.config_path, 'r', encoding='utf-8') as f:
                    prefs = json.load(f)
                items = prefs.get('items')
                if isinstance(items, list) and len(items) > 0:
                    existing_ids = set()
                    changed = False
                    for item in items:
                        if isinstance(item, dict):
                            existing_ids.add(item.get('id'))
                            if item.get('id') == 'widget-battery' and item.get('label') == 'Battery':
                                item['label'] = 'Laptop battery'
                                changed = True
                            if item.get('id') == 'widget-stats':
                                if item.get('icon') != 'cpu':
                                    item['icon'] = 'cpu'
                                    changed = True
                                if item.get('label') == 'System stats':
                                    item['label'] = 'System diagnostics'
                                    changed = True
                            # Normalize legacy 'widget' key to 'widgetKind'
                            if item.get('kind') == 'widget' and not item.get('widgetKind') and item.get('widget'):
                                item['widgetKind'] = item.pop('widget')
                                changed = True
                            if item.get('id') == 'widget-focus' and not item.get('shortCode'):
                                item['shortCode'] = 'fcs'
                                changed = True
                            if item.get('id') == 'widget-clock' and not item.get('shortCode'):
                                item['shortCode'] = 'clk'
                                changed = True
                            if not item.get('group'):
                                item['group'] = 'apps' if item.get('kind') in ('app', 'link') else 'widgets'
                                changed = True
                    # Merge new default widgets (e.g., Focus timer, World clock) if not yet in saved config
                    migrated_ids = set(prefs.get('migratedWidgets') or [])
                    for def_item in DEFAULT_ITEMS:
                        did = def_item['id']
                        if did not in existing_ids and did not in migrated_ids:
                            # Insert before widget-ai if present, else append
                            ai_idx = next((idx for idx, it in enumerate(items) if it.get('id') == 'widget-ai'), len(items))
                            items.insert(ai_idx, dict(def_item))
                            migrated_ids.add(did)
                            changed = True
                        elif did in existing_ids and did not in migrated_ids:
                            migrated_ids.add(did)
                            changed = True
                    prefs['migratedWidgets'] = list(migrated_ids)
                    if changed:
                        try:
                            with open(self.config_path, 'w', encoding='utf-8') as wf:
                                json.dump(prefs, wf, indent=2)
                        except Exception:
                            pass
                else:
                    prefs['items'] = [dict(it) for it in DEFAULT_ITEMS]
                    prefs['migratedWidgets'] = [it['id'] for it in DEFAULT_ITEMS]
                return prefs
            except Exception:
                pass
        return {
            'themeId': 'paper',
            'edgeOverride': None,
            'accentOverride': None,
            'reserveScreenSpace': False,
            'autostart': False,
            'items': [dict(it) for it in DEFAULT_ITEMS],
            'migratedWidgets': [it['id'] for it in DEFAULT_ITEMS],
        }

    def _get_hydrated_items(self) -> list[dict[str, Any]]:
        import base64
        items = self.prefs.get('items', [dict(it) for it in DEFAULT_ITEMS])
        for it in items:
            if isinstance(it, dict):
                p = it.get('iconPath')
                uri = it.get('iconUri', '')
                if p and os.path.isfile(p) and (not uri or uri.startswith('file:')):
                    try:
                        with open(p, 'rb') as f:
                            b64 = base64.b64encode(f.read()).decode('ascii')
                        it['iconUri'] = f"data:image/png;base64,{b64}"
                    except Exception:
                        pass
                elif not uri and it.get('target'):
                    self.resolve_item_icon(it.get('id', ''), it.get('target', ''))
        return items

    def get_initial_state(self) -> Dict[str, Any]:
        sw = user32.GetSystemMetrics(0) or 1920
        sh = user32.GetSystemMetrics(1) or 1080
        dock_x, dock_y, dock_w, dock_h = self._dock_shape_rect
        init_backdrop = self._wallpaper_mgr.get_backdrop(
            sw, sh, dock_x, dock_y, dock_w or 64, dock_h or 660
        )
        items = self._get_hydrated_items()
        enabled_widgets = [it for it in items if it.get('enabled', True) and (it.get('group') == 'widgets' or it.get('kind') == 'widget')]
        saved_widgets_collapsed = self.prefs.get('widgetsCollapsed')
        widgets_collapsed = saved_widgets_collapsed if saved_widgets_collapsed is not None else (len(enabled_widgets) > 6)
        return {
            'dataSource': 'live',
            'themeId': self.prefs.get('themeId', 'paper'),
            'edgeOverride': self.prefs.get('edgeOverride'),
            'accentOverride': self.prefs.get('accentOverride'),
            'reserveScreenSpace': bool(self.prefs.get('reserveScreenSpace', False)),
            'autostart': bool(self.prefs.get('autostart', False)),
            'widgetsCollapsed': bool(widgets_collapsed),
            'dockState': 'collapsed' if self._is_collapsed else 'expanded',
            'startCollapsed': bool(self.prefs.get('startCollapsed', False)),
            'showLogoOnTab': bool(self.prefs.get('showLogoOnTab', False)),
            'autoCollapse': bool(self.prefs.get('autoCollapse', False)),
            'autoCollapseSeconds': int(self.prefs.get('autoCollapseSeconds', 10)),
            'collapseOnFullscreen': bool(self.prefs.get('collapseOnFullscreen', False)),
            'collapseHotkey': self.prefs.get('collapseHotkey', 'Ctrl+Alt+F'),
            'items': items,
            'clipboard': self._clipboard.get_payload(),
            'weather': self._providers.fetch_weather(city=self.prefs.get('weatherCity', 'Kyoto')),
            'stats': self._providers.sample_stats(),
            'battery': self._providers.sample_battery(),
            'player': self._providers.sample_player(),
            'focus': self._providers.sample_focus(),
            'clock': self._providers.sample_clock(),
            'scratchpad': self._providers.sample_scratchpad(),
            'colorpicker': self._providers.sample_colorpicker(),
            'calendar': self._providers.sample_calendar(),
            'audio': self._providers.sample_audio(),
            'network': self._providers.sample_network(),
            'ai': self._providers.sample_ai_usage(),
            'bluetooth': self._providers.sample_bluetooth(),
            'activity': self._providers.sample_ai_activity(),
            'topProcesses': self._providers.sample_top_processes(30),
            'backdrop': init_backdrop,
        }

    def get_wallpaper_backdrop(
        self, view_name: str, shape_x: int, shape_y: int, shape_w: int, shape_h: int
    ) -> Dict[str, Any]:
        try:
            sw = user32.GetSystemMetrics(0) or 1920
            sh = user32.GetSystemMetrics(1) or 1080
            return self._wallpaper_mgr.get_backdrop(sw, sh, shape_x, shape_y, shape_w, shape_h)
        except Exception:
            return {
                'enabled': False,
                'solidFallback': False,
                'wallpaperUrl': '',
                'adaptiveAlpha': 0.42,
                'useTextShadow': False,
            }

    def init_tray(self) -> None:
        if Forms and not self._tray:
            try:
                self._tray = FlankTray(self)
                self._tray.update_state(self._is_collapsed)
            except Exception:
                pass

    def set_dock_state(self, state: str) -> None:
        """One window, two shapes. Resizes and moves dock window between expanded and collapsed edge tab."""
        dock = windows.get('dock')
        if not dock or not hasattr(dock, 'native') or not dock.native:
            return
        try:
            hwnd = dock.native.Handle.ToInt32()
            scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0
            wx, wy, ww, wh = get_work_area_for_hwnd(hwnd)

            logical_wx = int(round(wx / scale))
            logical_wy = int(round(wy / scale))
            logical_ww = int(round(ww / scale))
            logical_wh = int(round(wh / scale))

            edge = self.prefs.get('edgeOverride') or 'right'

            if state in ('collapsed', 'collapsing'):
                self._is_collapsed = True
                self.close_hover_card()
                show_logo = bool(self.prefs.get('showLogoOnTab', False))
                tab_w = 36 if show_logo else 24
                tab_h = 104 if show_logo else 72

                # Vertically centered where the dock was
                _, cur_dock_y, _, cur_dock_h = self._dock_shape_rect
                dock_center_y = cur_dock_y + (cur_dock_h // 2)
                tab_y = max(logical_wy + 10, min(logical_wy + logical_wh - tab_h - 10, dock_center_y - (tab_h // 2)))

                pw = int(round(tab_w * scale))
                ph = int(round(tab_h * scale))

                # Flush to the physical screen edge to eliminate any subpixel gap
                if edge == 'left':
                    px = wx
                else:
                    px = (wx + ww) - pw

                py = int(round(tab_y * scale))

                setup_transparency(dock.native)

                # SWP_NOZORDER (4) | SWP_NOACTIVATE (16) | SWP_SHOWWINDOW (64) = 84
                user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0010 | 0x0040)

                # Inward 12px radius, flat 0px on edge
                corner_d = int(round(12 * scale * 2))
                dest_rgn = gdi32.CreateRectRgn(0, 0, 0, 0)
                rect_rgn = gdi32.CreateRectRgn(0, 0, pw + 1, ph + 1)

                if edge == 'right':
                    round_rgn = gdi32.CreateRoundRectRgn(0, 0, pw + corner_d + 1, ph + 1, corner_d, corner_d)
                else:
                    round_rgn = gdi32.CreateRoundRectRgn(-corner_d, 0, pw + 1, ph + 1, corner_d, corner_d)

                gdi32.CombineRgn(dest_rgn, round_rgn, rect_rgn, RGN_AND)
                user32.SetWindowRgn(hwnd, dest_rgn, True)
                gdi32.DeleteObject(round_rgn)
                gdi32.DeleteObject(rect_rgn)

                if self._tray:
                    self._tray.update_state(True)
            else:
                self._is_collapsed = False
                # Restore to expanded dock bounds
                dock_x, dock_y, dock_w, dock_h = self._dock_shape_rect
                if dock_w <= 0 or dock_h <= 0:
                    dock_w = 64
                    dock_h = 420
                    dock_x = (logical_wx + logical_ww - dock_w - 12) if edge == 'right' else (logical_wx + 12)
                    dock_y = logical_wy + (logical_wh - dock_h) // 2

                pw = int(round(dock_w * scale))
                ph = int(round(dock_h * scale))
                if edge == 'right':
                    px = (wx + ww) - pw - int(round(12 * scale))
                else:
                    px = wx + int(round(12 * scale))
                py = int(round(dock_y * scale))

                setup_transparency(dock.native)
                user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0010 | 0x0040)

                shape = self.prefs.get('themeShape', 'pill')
                if shape == 'pill':
                    rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, pw, pw)
                    user32.SetWindowRgn(hwnd, rgn, True)
                elif shape == 'rail':
                    corner_d = int(round(16 * scale * 2))
                    rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, corner_d, corner_d)
                    user32.SetWindowRgn(hwnd, rgn, True)
                else:
                    user32.SetWindowRgn(hwnd, 0, True)

                if self._tray:
                    self._tray.update_state(False)

            # Update backdrop for glass mode
            try:
                sw = user32.GetSystemMetrics(0) or 1920
                sh = user32.GetSystemMetrics(1) or 1080
                backdrop = self._wallpaper_mgr.get_backdrop(sw, sh, px, py, pw, ph)
                dock.evaluate_js(f"window.flankUpdateBackdrop && window.flankUpdateBackdrop({json.dumps(backdrop)})")
            except Exception:
                pass
        except Exception:
            pass

    def collapse_dock(self) -> None:
        self.close_hover_card()
        dock = windows.get('dock')
        if dock:
            try:
                dock.evaluate_js("window.flankSetDockState && window.flankSetDockState('collapsing')")
            except Exception:
                pass

    def dock_collapse_done(self) -> None:
        self.close_hover_card()
        self.set_dock_state('collapsed')
        self.prefs['dockState'] = 'collapsed'
        dock = windows.get('dock')
        if dock:
            try:
                dock.evaluate_js("window.flankSetDockState && window.flankSetDockState('collapsed')")
            except Exception:
                pass

    def expand_dock(self) -> None:
        self.set_dock_state('expanded')
        dock = windows.get('dock')
        if dock:
            try:
                dock.evaluate_js("window.flankSetDockState && window.flankSetDockState('expanding')")
            except Exception:
                pass

    def dock_expand_done(self) -> None:
        self._is_collapsed = False
        self.prefs['dockState'] = 'expanded'
        if self._tray:
            self._tray.update_state(False)
        dock = windows.get('dock')
        if dock:
            try:
                dock.evaluate_js("window.flankSetDockState && window.flankSetDockState('expanded')")
            except Exception:
                pass

    def toggle_dock(self) -> None:
        if self._is_collapsed:
            self.expand_dock()
        else:
            self.collapse_dock()

    def _get_icons_cache_dir(self) -> str:
        d = os.path.join(self.app_data_dir, 'icons')
        os.makedirs(d, exist_ok=True)
        return d

    def _process_and_cache_image(self, data_or_img: Any, cache_key: str) -> tuple[str, str] | None:
        try:
            import hashlib, io, base64
            from PIL import Image

            if isinstance(data_or_img, (bytes, bytearray)):
                try:
                    pil_img = Image.open(io.BytesIO(data_or_img))
                except Exception:
                    return None
            elif hasattr(data_or_img, 'save'):
                pil_img = data_or_img
            else:
                return None

            # 1. Multi-frame selection (ICO / GIF / TIFF) - select largest frame
            if getattr(pil_img, 'n_frames', 1) > 1:
                largest = None
                max_area = 0
                for f in range(pil_img.n_frames):
                    try:
                        pil_img.seek(f)
                        area = pil_img.width * pil_img.height
                        if area > max_area:
                            max_area = area
                            largest = pil_img.copy()
                    except Exception:
                        pass
                if largest:
                    pil_img = largest

            pil_img = pil_img.convert('RGBA')

            # 2. Crop empty transparent margins to normalise odd icons
            bbox = pil_img.getbbox()
            if bbox:
                pil_img = pil_img.crop(bbox)

            w, h = pil_img.width, pil_img.height

            # 3. Quality Gate 1: Reject only if too small to render cleanly (< 16px max or < 12px min)
            if max(w, h) < 16 or min(w, h) < 12:
                _log_debug(f"Quality gate rejected: too small ({w}x{h})")
                return None

            # 4. Quality Gate 2: Reject extreme banner/strip aspect ratio
            aspect = w / float(h)
            if aspect < 0.25 or aspect > 4.0:
                _log_debug(f"Quality gate rejected: extreme aspect ratio ({aspect:.2f})")
                return None

            # 5. Canvas fitting & high-quality downsampling (never upscale)
            target_size = 128
            max_dim = max(w, h)
            if max_dim > target_size:
                scale = target_size / float(max_dim)
                new_w = max(1, int(round(w * scale)))
                new_h = max(1, int(round(h * scale)))
                resized = pil_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                new_w, new_h = w, h
                resized = pil_img

            canvas = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
            dx = (target_size - new_w) // 2
            dy = (target_size - new_h) // 2
            canvas.paste(resized, (dx, dy), resized)

            sha = hashlib.sha1(cache_key.encode('utf-8', errors='ignore')).hexdigest()
            out_file = os.path.join(self._get_icons_cache_dir(), f"{sha}.png")
            canvas.save(out_file, format='PNG')

            buf = io.BytesIO()
            canvas.save(buf, format='PNG')
            data_uri = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode('ascii')
            return data_uri, out_file
        except Exception as e:
            _log_debug(f"_process_and_cache_image error: {e}")
            return None

    def _get_favicon_candidate_urls(self, url: str, use_online_fallback: bool = True) -> list[str]:
        import urllib.request, urllib.parse, re
        candidates = []
        try:
            parsed = urllib.parse.urlparse(url)
            if not parsed.scheme or not parsed.netloc:
                if not url.startswith('http://') and not url.startswith('https://'):
                    url = 'https://' + url
                    parsed = urllib.parse.urlparse(url)
            if not parsed.netloc:
                return []
            origin = f"{parsed.scheme}://{parsed.netloc}"

            apple_touch_urls = []
            icon_urls = []

            # 1. Inspect HTML head for declared icon tags
            try:
                req = urllib.request.Request(
                    url,
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Flank/1.0'}
                )
                with urllib.request.urlopen(req, timeout=4.0) as resp:
                    c_type = resp.headers.get('Content-Type', '')
                    if 'html' in c_type:
                        head_chunk = resp.read(262144).decode('utf-8', errors='ignore')

                        for m in re.finditer(r"""<link[^>]+rel=['"][^'"]*apple-touch-icon[^'"]*['"][^>]*>""", head_chunk, re.IGNORECASE):
                            tag = m.group(0)
                            hm = re.search(r"""href=['\"]([^'\"]+)['\"]""", tag, re.IGNORECASE)
                            if hm:
                                apple_touch_urls.append(urllib.parse.urljoin(url, hm.group(1).strip()))

                        for m in re.finditer(r"""<link[^>]+rel=['"][^'"]*icon[^'"]*['"][^>]*>""", head_chunk, re.IGNORECASE):
                            tag = m.group(0)
                            if 'apple-touch-icon' in tag.lower():
                                continue
                            hm = re.search(r"""href=['\"]([^'\"]+)['\"]""", tag, re.IGNORECASE)
                            if hm:
                                icon_urls.append(urllib.parse.urljoin(url, hm.group(1).strip()))
            except Exception:
                pass

            candidates.extend(apple_touch_urls)
            candidates.extend(icon_urls)
            candidates.append(urllib.parse.urljoin(origin, '/apple-touch-icon.png'))
            candidates.append(urllib.parse.urljoin(origin, '/apple-touch-icon-precomposed.png'))
            candidates.append(urllib.parse.urljoin(origin, '/favicon.ico'))
            if use_online_fallback:
                candidates.append(f"https://www.google.com/s2/favicons?domain={parsed.netloc}&sz=128")
        except Exception:
            pass
        return candidates

    def resolve_item_icon(self, item_id: str, target: str, force: bool = False) -> None:
        def _resolve():
            try:
                target_str = str(target or '').strip()
                if not target_str:
                    return

                import hashlib, base64
                sha = hashlib.sha1(target_str.encode('utf-8', errors='ignore')).hexdigest()
                cached_file = os.path.join(self._get_icons_cache_dir(), f"{sha}.png")

                if not force and os.path.isfile(cached_file) and os.path.getsize(cached_file) > 100:
                    with open(cached_file, 'rb') as f:
                        b64 = base64.b64encode(f.read()).decode('ascii')
                    icon_uri = f"data:image/png;base64,{b64}"
                    self._broadcast_icon_resolved(item_id, icon_uri, cached_file)
                    return

                if target_str.startswith('http://') or target_str.startswith('https://') or ('.' in target_str.split('/')[0] and not target_str.endswith('.exe')):
                    use_online = self.prefs.get('useOnlineFaviconFallback', True)
                    candidates = self._get_favicon_candidate_urls(target_str, use_online)
                    import urllib.request
                    seen = set()
                    for cand in candidates:
                        if cand in seen:
                            continue
                        seen.add(cand)
                        try:
                            req = urllib.request.Request(
                                cand,
                                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'}
                            )
                            with urllib.request.urlopen(req, timeout=4.0) as resp:
                                data = resp.read()
                                if len(data) >= 32:
                                    res = self._process_and_cache_image(data, target_str)
                                    if res:
                                        self._broadcast_icon_resolved(item_id, res[0], res[1])
                                        return
                        except Exception:
                            continue
                else:
                    expanded = os.path.expandvars(target_str)
                    cmd_part = expanded.split()[0].strip('"')
                    resolved_exe = shutil.which(cmd_part) or cmd_part
                    if os.path.exists(resolved_exe):
                        sfi = SHFILEINFOW()
                        res = shell32.SHGetFileInfoW(resolved_exe, 0, ctypes.byref(sfi), ctypes.sizeof(sfi), SHGFI_ICON | SHGFI_LARGEICON)
                        if res and sfi.hIcon:
                            try:
                                import clr
                                clr.AddReference('System')
                                clr.AddReference('System.Drawing')
                                import System, System.Drawing as Drawing, System.IO
                                ico = Drawing.Icon.FromHandle(System.IntPtr(int(sfi.hIcon)))
                                bmp = ico.ToBitmap()
                                ms = System.IO.MemoryStream()
                                bmp.Save(ms, Drawing.Imaging.ImageFormat.Png)
                                png_b = bytes(ms.ToArray())
                                bmp.Dispose()
                                ico.Dispose()
                                out_res = self._process_and_cache_image(png_b, target_str)
                                if out_res:
                                    self._broadcast_icon_resolved(item_id, out_res[0], out_res[1])
                                    return
                            except Exception as e:
                                _log_debug(f"HICON extraction error: {e}")
                            finally:
                                user32.DestroyIcon(sfi.hIcon)
            except Exception as e:
                _log_debug(f"resolve_item_icon exception: {e}")

        threading.Thread(target=_resolve, daemon=True).start()

    def _broadcast_icon_resolved(self, item_id: str, icon_uri: str, icon_path: str) -> None:
        items = self.prefs.get('items', [])
        for it in items:
            if isinstance(it, dict) and it.get('id') == item_id:
                it['iconUri'] = icon_uri
                it['iconPath'] = icon_path
                break
        self.save_preferences({'items': items})

        payload = json.dumps({'id': item_id, 'iconUri': icon_uri, 'iconPath': icon_path})
        for win_name in ('dock', 'modal'):
            w = windows.get(win_name)
            if w:
                try:
                    w.evaluate_js(f"window.flankOnIconResolved && window.flankOnIconResolved({payload})")
                except Exception:
                    pass

    def choose_custom_icon_file(self, item_id: str) -> None:
        def _choose():
            if not Forms:
                return
            try:
                dlg = Forms.OpenFileDialog()
                dlg.Title = "Select Custom Icon"
                dlg.Filter = "Image Files (*.png;*.ico;*.jpg;*.jpeg;*.bmp;*.webp;*.svg)|*.png;*.ico;*.jpg;*.jpeg;*.bmp;*.webp;*.svg|All Files (*.*)|*.*"
                if dlg.ShowDialog() == Forms.DialogResult.OK:
                    chosen = dlg.FileName
                    if os.path.isfile(chosen):
                        if chosen.lower().endswith('.svg'):
                            with open(chosen, 'r', encoding='utf-8', errors='ignore') as f:
                                svg_text = f.read()
                            import urllib.parse
                            encoded_svg = urllib.parse.quote(svg_text)
                            data_uri = f"data:image/svg+xml;utf8,{encoded_svg}"
                            self._broadcast_icon_resolved(item_id, data_uri, chosen)
                        else:
                            with open(chosen, 'rb') as f:
                                b = f.read()
                            res = self._process_and_cache_image(b, chosen)
                            if res:
                                self._broadcast_icon_resolved(item_id, res[0], res[1])
            except Exception as e:
                _log_debug(f"choose_custom_icon_file error: {e}")

        threading.Thread(target=_choose, daemon=True).start()

    def set_dock_bounds(self, width: int, height: int, shape: str = 'pill', window_padding: int | None = None) -> None:
        dock = windows.get('dock')
        if not dock or not hasattr(dock, 'native') or not dock.native:
            return
        try:
            hwnd = dock.native.Handle.ToInt32()
            scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0
            wx, wy, ww, wh = get_work_area()

            # Normalize work area to logical DIPs
            logical_wx = int(round(wx / scale))
            logical_wy = int(round(wy / scale))
            logical_ww = int(round(ww / scale))
            logical_wh = int(round(wh / scale))

            self._dock_window_padding = 0
            self.prefs['themeShape'] = shape

            if self._is_collapsed:
                return

            # Shape size (logical DIP)
            w = max(32, min(260, width))
            h = max(120, min(logical_wh - 12, height))

            edge = self.prefs.get('edgeOverride') or 'right'
            if edge == 'left':
                shape_x = logical_wx + 12
            else:
                shape_x = logical_wx + logical_ww - w - 12

            shape_y = logical_wy + max(6, (logical_wh - h) // 2)

            self._dock_shape_rect = (shape_x, shape_y, w, h)

            # Convert to physical device pixels
            px = int(round(shape_x * scale))
            py = int(round(shape_y * scale))
            pw = int(round(w * scale))
            ph = int(round(h * scale))

            setup_transparency(dock.native)

            # SWP_NOZORDER (4) | SWP_NOACTIVATE (16) | SWP_SHOWWINDOW (64) = 84
            user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0010 | 0x0040)

            # Apply region clipping to shape (+1 for GDI exclusive right/bottom boundaries)
            if shape == 'pill':
                rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, pw, pw)
                user32.SetWindowRgn(hwnd, rgn, True)
            elif shape == 'rail':
                corner_d = int(round(16 * scale * 2))
                rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, corner_d, corner_d)
                user32.SetWindowRgn(hwnd, rgn, True)
            else:
                user32.SetWindowRgn(hwnd, 0, True)

            # Update backdrop for glass mode
            try:
                sw = user32.GetSystemMetrics(0) or 1920
                sh = user32.GetSystemMetrics(1) or 1080
                backdrop = self._wallpaper_mgr.get_backdrop(
                    sw, sh, px, py, pw, ph
                )
                dock.evaluate_js(f"window.flankUpdateBackdrop && window.flankUpdateBackdrop({json.dumps(backdrop)})")
            except Exception:
                pass
        except Exception:
            pass

    def _update_card_window_size(self, hwnd: int) -> None:
        scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0
        cw, ch, cradius = self._card_shape_size
        pw = int(round(cw * scale))
        ph = int(round(ch * scale))
        setup_transparency(windows['card'].native)
        radius = cradius if cradius > 0 else 20
        diameter = int(round(radius * 2 * scale))
        user32.SetWindowPos(hwnd, 0, 0, 0, pw, ph, 0x0002 | 0x0010)  # SWP_NOMOVE | SWP_NOACTIVATE
        rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, diameter, diameter)
        user32.SetWindowRgn(hwnd, rgn, True)
        if not self._card_open:
            user32.ShowWindow(hwnd, 0)

    def set_card_bounds(self, width: int, height: int, radius: int = 20, window_padding: int | None = None) -> None:
        card = windows.get('card')
        if not card or not hasattr(card, 'native') or not card.native:
            return
        try:
            w = max(240, min(360, int(width)))
            h = max(120, min(640, int(height)))
            self._card_window_padding = 0
            self._card_shape_size = (w, h, max(0, int(radius)))
            self._update_card_window_size(card.native.Handle.ToInt32())
        except Exception:
            pass

    def show_hover_card(self, kind: str, client_y: int, pin: bool | None = None) -> None:
        card = windows.get('card')
        dock = windows.get('dock')
        if not card or not dock or self._is_collapsed:
            return
        if self._card_hide_timer:
            self._card_hide_timer.cancel()
            self._card_hide_timer = None

        if pin is not None:
            self._card_pinned = pin
        else:
            self._card_pinned = False

        self._card_open = True
        wx, wy, ww, wh = get_work_area()
        scale = 1.0
        if hasattr(card, 'native') and card.native:
            hwnd = card.native.Handle.ToInt32()
            scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0

        logical_wx = int(round(wx / scale))
        logical_wy = int(round(wy / scale))
        logical_ww = int(round(ww / scale))
        logical_wh = int(round(wh / scale))

        cw, ch, cradius = self._card_shape_size
        dock_x, dock_y, dock_w, dock_h = self._dock_shape_rect
        if dock_x == 0 and dock_y == 0:
            dock_x, dock_y, dock_w = dock.x, dock.y, dock.width

        # Shape positioning (logical DIP)
        card_offset = 12
        shape_card_x = dock_x - cw - card_offset
        if shape_card_x < logical_wx + 10:
            shape_card_x = dock_x + dock_w + card_offset

        shape_card_y = max(logical_wy + 10, min(logical_wy + logical_wh - ch - 10, dock_y + client_y - ch // 2))

        pw = int(round(cw * scale))
        ph = int(round(ch * scale))
        px = int(round(shape_card_x * scale))
        py = int(round(shape_card_y * scale))

        try:
            card.evaluate_js(f"window.flankShowCard && window.flankShowCard('{kind}')")
            if hasattr(card, 'native') and card.native:
                hwnd = card.native.Handle.ToInt32()
                setup_transparency(card.native)
                radius = cradius if cradius > 0 else 20
                diameter = int(round(radius * 2 * scale))
                # SWP_NOZORDER (4) | SWP_NOACTIVATE (16) | SWP_SHOWWINDOW (64) = 84
                user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0010 | 0x0040)
                rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, diameter, diameter)
                user32.SetWindowRgn(hwnd, rgn, True)
                user32.ShowWindow(hwnd, 4)  # SW_SHOWNOACTIVATE

                try:
                    sw = user32.GetSystemMetrics(0) or 1920
                    sh = user32.GetSystemMetrics(1) or 1080
                    card_bd = self._wallpaper_mgr.get_backdrop(sw, sh, px, py, pw, ph)
                    card.evaluate_js(f"window.flankUpdateBackdrop && window.flankUpdateBackdrop({json.dumps(card_bd)})")
                except Exception:
                    pass
        except Exception:
            pass

    def toggle_hover_card(self, kind: str, client_y: int) -> None:
        if self._card_open and self._card_pinned:
            self.close_hover_card()
        else:
            self.show_hover_card(kind, client_y, pin=True)

    def close_hover_card(self) -> None:
        self._card_pinned = False
        self._card_open = False
        card = windows.get('card')
        if card and hasattr(card, 'native') and card.native:
            try:
                user32.ShowWindow(card.native.Handle.ToInt32(), 0)
            except Exception:
                pass

    def cancel_hide_card(self) -> None:
        if self._card_hide_timer:
            self._card_hide_timer.cancel()
            self._card_hide_timer = None

    def hide_hover_card(self) -> None:
        if self._card_pinned:
            return
        if self._card_hide_timer:
            self._card_hide_timer.cancel()

        def do_hide():
            if self._card_pinned:
                return
            self._card_open = False
            card = windows.get('card')
            if card and hasattr(card, 'native') and card.native:
                try:
                    user32.ShowWindow(card.native.Handle.ToInt32(), 0)
                except Exception:
                    pass

        self._card_hide_timer = threading.Timer(0.20, do_hide)
        self._card_hide_timer.start()

    def open_window(self, win_name: str) -> None:
        self._card_open = False
        card = windows.get('card')
        if card:
            try:
                if hasattr(card, 'native') and card.native:
                    user32.ShowWindow(card.native.Handle.ToInt32(), 0)
                card.hide()
            except Exception:
                pass
        modal = windows.get('modal')
        if modal:
            try:
                self._modal_open = True
                modal.evaluate_js(f"window.flankOpenModal && window.flankOpenModal('{win_name}')")
                modal.show()
                if hasattr(modal, 'native') and modal.native:
                    hwnd = modal.native.Handle.ToInt32()
                    scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0
                    pad = self._modal_window_padding
                    shape_w, shape_h = 960, 680
                    wx, wy, ww, wh = get_work_area()
                    logical_wx = int(round(wx / scale))
                    logical_wy = int(round(wy / scale))
                    logical_ww = int(round(ww / scale))
                    logical_wh = int(round(wh / scale))

                    shape_x = logical_wx + (logical_ww - shape_w) // 2
                    shape_y = logical_wy + (logical_wh - shape_h) // 2

                    pw = int(round(shape_w * scale))
                    ph = int(round(shape_h * scale))
                    px = int(round(shape_x * scale))
                    py = int(round(shape_y * scale))

                    setup_transparency(modal.native)
                    _dwm_set(hwnd, DWMWA_WINDOW_CORNER_PREFERENCE, DWMWCP_ROUND)
                    user32.SetWindowRgn(hwnd, 0, True)

                    user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0040)
                    user32.ShowWindow(hwnd, 9)  # SW_RESTORE
                    user32.SetForegroundWindow(hwnd)
            except Exception:
                pass

    def close_window(self) -> None:
        self._modal_open = False
        modal = windows.get('modal')
        if modal:
            try:
                if hasattr(modal, 'native') and modal.native:
                    user32.ShowWindow(modal.native.Handle.ToInt32(), 0)
            except Exception:
                pass

    def set_window_interactive(self, mode: str, rects: List[Dict[str, Any]]) -> None:
        pass

    def launch_item(self, item_id: str, target: str) -> bool:
        if not target:
            return False
        try:
            t = target.strip()
            if t.startswith('http://') or t.startswith('https://') or t.startswith('ms-settings:'):
                webbrowser.open(t)
                return True
            if t.lower() == 'wt.exe' and not shutil.which('wt.exe'):
                subprocess.Popen('powershell.exe', shell=True)
                return True
            subprocess.Popen(t, shell=True)
            return True
        except Exception:
            return False

    def copy_clipboard_item(self, item_id: str) -> bool:
        return self._clipboard.copy_to_system_clipboard(item_id)

    def pin_clipboard_item(self, item_id: str) -> bool:
        return self._clipboard.toggle_pin(item_id)

    def delete_clipboard_item(self, item_id: str) -> bool:
        return self._clipboard.delete_entry(item_id)

    def clear_unpinned_clipboard(self) -> bool:
        return self._clipboard.clear_unpinned()

    def media_control(self, action: str) -> bool:
        ok = self._providers.media_control(action)
        payload = {'player': self._providers.sample_player()}
        self._broadcast_update(payload)
        return ok

    def focus_control(self, action: str, value: int | None = None) -> Dict[str, Any]:
        focus_data = self._providers.focus_control(action, value)
        payload = {'focus': focus_data}
        self._broadcast_update(payload)
        return payload

    def add_world_clock(self, city: str) -> Dict[str, Any]:
        clock_data = self._providers.add_world_clock(city)
        payload = {'clock': clock_data}
        self._broadcast_update(payload)
        return payload

    def remove_world_clock(self, clock_id: str) -> Dict[str, Any]:
        clock_data = self._providers.remove_world_clock(clock_id)
        payload = {'clock': clock_data}
        self._broadcast_update(payload)
        return payload

    def scratchpad_action(self, action: str, note_id: str = '', content: str = '') -> Dict[str, Any]:
        data = self._providers.scratchpad_action(action, note_id, content)
        payload = {'scratchpad': data}
        self._broadcast_update(payload)
        return payload

    def pick_screen_color(self) -> Dict[str, Any]:
        data = self._providers.pick_screen_color()
        payload = {'colorpicker': data}
        self._broadcast_update(payload)
        return payload

    def set_picked_color(self, hex_color: str) -> Dict[str, Any]:
        data = self._providers.set_picked_color(hex_color)
        payload = {'colorpicker': data}
        self._broadcast_update(payload)
        return payload

    def calendar_action(self, action: str, title_or_id: str = '', time_text: str = '', join_url: str = '') -> Dict[str, Any]:
        data = self._providers.calendar_action(action, title_or_id, time_text, join_url)
        payload = {'calendar': data}
        self._broadcast_update(payload)
        return payload

    def audio_control(self, action: str, value: int | None = None) -> Dict[str, Any]:
        data = self._providers.audio_control(action, value)
        payload = {'audio': data}
        self._broadcast_update(payload)
        return payload

    def network_action(self, action: str, pid: int = 0) -> Dict[str, Any]:
        data = self._providers.network_action(action, pid)
        payload = {'network': data}
        self._broadcast_update(payload)
        return payload

    def copy_raw_text(self, text: str) -> bool:
        return self._clipboard.set_clipboard_text(text)

    def _broadcast_update(self, payload: Dict[str, Any]) -> None:
        js_arg = json.dumps(payload)
        for w in list(windows.values()):
            try:
                w.evaluate_js(f'window.flankReceiveHostUpdate && window.flankReceiveHostUpdate({js_arg})')
            except Exception:
                pass

    def update_weather_city(self, city: str) -> Dict[str, Any]:
        cleaned = (city or '').strip()
        if not cleaned:
            return {'weather': self._providers.fetch_weather()}
        self.prefs['weatherCity'] = cleaned
        self.save_preferences(self.prefs)
        wx = self._providers.fetch_weather(city=cleaned, force=True)
        payload = {'weather': wx}
        self._broadcast_update(payload)
        return {'weather': wx}

    def save_ai_settings(self, ai_data: Dict[str, Any]) -> Dict[str, Any]:
        res = self._providers.save_ai_settings(ai_data)
        self._broadcast_update({'ai': res})
        return {'ok': True, 'ai': res}

    def test_ai_key(self, api_key: str) -> Dict[str, Any]:
        return self._providers.test_ai_key(api_key)

    def register_item_shortcut(self, item_id: str, shortcut: str) -> Dict[str, Any]:
        parsed = parse_shortcut_combo(shortcut)
        if not parsed:
            return {'ok': False, 'conflict': f'Invalid key combination: {shortcut}'}
        # Check if another item already uses this shortcut
        for item in self.prefs.get('items', []):
            if isinstance(item, dict) and item.get('id') != item_id:
                existing = (item.get('shortcut') or '').strip()
                if existing and existing.upper() == shortcut.strip().upper():
                    return {'ok': False, 'conflict': f'{shortcut} is already assigned to {item.get("label", "another item")}.'}
        return {'ok': True}

    def save_preferences(self, prefs: Dict[str, Any]) -> Dict[str, Any]:
        self.prefs.update(prefs)
        try:
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(self.prefs, f, indent=2)
            self._apply_autostart(bool(self.prefs.get('autostart', False)))

            # Broadcast full preferences & items list to all open windows (dock, card, modal)
            sync_payload = {
                'themeId': self.prefs.get('themeId', 'paper'),
                'edgeOverride': self.prefs.get('edgeOverride'),
                'accentOverride': self.prefs.get('accentOverride'),
                'reserveScreenSpace': bool(self.prefs.get('reserveScreenSpace', False)),
                'autostart': bool(self.prefs.get('autostart', False)),
                'widgetsCollapsed': bool(self.prefs.get('widgetsCollapsed', False)),
                'items': self.prefs.get('items', []),
            }
            self._broadcast_update(sync_payload)

            tid = self.prefs.get('themeId')
            if tid:
                for w in list(windows.values()):
                    try:
                        w.evaluate_js(f"window.flankSwitchTheme && window.flankSwitchTheme('{tid}')")
                    except Exception:
                        pass
                if tid == 'liquid-glass':
                    try:
                        sw = user32.GetSystemMetrics(0) or 1920
                        sh = user32.GetSystemMetrics(1) or 1080
                        dock_x, dock_y, dock_w, dock_h = self._dock_shape_rect
                        backdrop = self._wallpaper_mgr.get_backdrop(sw, sh, dock_x, dock_y, dock_w or 64, dock_h or 660)
                        dock = windows.get('dock')
                        if dock:
                            dock.evaluate_js(f"window.flankUpdateBackdrop && window.flankUpdateBackdrop({json.dumps(backdrop)})")
                    except Exception:
                        pass

            if self.hotkey_thread_id:
                try:
                    user32.PostThreadMessageW(self.hotkey_thread_id, WM_RELOAD_HOTKEYS, 0, 0)
                except Exception:
                    pass

            return {'ok': True}
        except Exception as e:
            return {'ok': False, 'message': str(e)}

    def reset_recommended_items(self) -> Dict[str, Any]:
        recommended = [dict(it) for it in DEFAULT_ITEMS]
        self.prefs['items'] = recommended
        try:
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(self.prefs, f, indent=2)
            self._broadcast_update({'items': recommended})
        except Exception:
            pass
        return {'ok': True, 'items': recommended}

    def set_widgets_collapsed(self, collapsed: bool) -> Dict[str, Any]:
        self.prefs['widgetsCollapsed'] = bool(collapsed)
        try:
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(self.prefs, f, indent=2)
            self._broadcast_update({'widgetsCollapsed': bool(collapsed)})
        except Exception:
            pass
        return {'ok': True, 'widgetsCollapsed': bool(collapsed)}

    def _apply_autostart(self, enabled: bool) -> None:
        try:
            key = winreg.OpenKey(
                winreg.HKEY_CURRENT_USER,
                r'Software\Microsoft\Windows\CurrentVersion\Run',
                0,
                winreg.KEY_SET_VALUE,
            )
            with key:
                if enabled:
                    exe_path = f'"{sys.executable}"' if getattr(sys, 'frozen', False) else f'"{sys.executable}" "{os.path.abspath(__file__)}"'
                    winreg.SetValueEx(key, 'Flank', 0, winreg.REG_SZ, exe_path)
                else:
                    try:
                        winreg.DeleteValue(key, 'Flank')
                    except FileNotFoundError:
                        pass
        except Exception:
            pass


def start_hotkey_listener(api: FlankHostApi) -> None:
    api.hotkey_thread_id = ctypes.windll.kernel32.GetCurrentThreadId()
    registered_ids: Dict[int, Dict[str, Any]] = {}
    HOTKEY_SETTINGS = 1099
    HOTKEY_COLLAPSE = 1100

    def reload_hotkeys() -> None:
        for hk_id in list(registered_ids.keys()):
            try:
                user32.UnregisterHotKey(None, hk_id)
            except Exception:
                pass
        registered_ids.clear()
        try:
            user32.UnregisterHotKey(None, HOTKEY_SETTINGS)
            user32.UnregisterHotKey(None, HOTKEY_COLLAPSE)
        except Exception:
            pass
        user32.RegisterHotKey(None, HOTKEY_SETTINGS, MOD_ALT | MOD_NOREPEAT, 0xBC)

        collapse_combo = api.prefs.get('collapseHotkey', 'Ctrl+Alt+F')
        parsed_c = parse_shortcut_combo(collapse_combo)
        if parsed_c:
            user32.RegisterHotKey(None, HOTKEY_COLLAPSE, parsed_c[0], parsed_c[1])

        items = api.prefs.get('items', [])
        for idx, item in enumerate(items):
            if not isinstance(item, dict) or not item.get('enabled', True):
                continue
            shortcut = (item.get('shortcut') or '').strip()
            if not shortcut:
                continue
            parsed = parse_shortcut_combo(shortcut)
            if not parsed:
                continue
            mods, vk = parsed
            hk_id = 2000 + idx
            if user32.RegisterHotKey(None, hk_id, mods, vk):
                registered_ids[hk_id] = item

    reload_hotkeys()

    msg = wintypes.MSG()
    while user32.GetMessageW(ctypes.byref(msg), None, 0, 0) != 0:
        if msg.message == WM_RELOAD_HOTKEYS:
            reload_hotkeys()
        elif msg.message == WM_HOTKEY:
            hk_id = int(msg.wParam)
            try:
                if hk_id == HOTKEY_SETTINGS:
                    api.open_window('settings')
                elif hk_id == HOTKEY_COLLAPSE:
                    api.toggle_dock()
                elif hk_id in registered_ids:
                    if api._is_collapsed:
                        api.expand_dock()
                        time.sleep(0.25)
                    item = registered_ids[hk_id]
                    kind = item.get('kind')
                    if kind in ('app', 'folder', 'link') and item.get('target'):
                        api.launch_item(str(item.get('id', '')), str(item.get('target', '')))
                    elif kind == 'widget':
                        wkind = item.get('widgetKind') or item.get('widget')
                        if wkind in ('clipboard', 'stats', 'battery', 'clock'):
                            api.open_window(wkind)
                        elif wkind in ('weather', 'player', 'focus', 'scratchpad', 'colorpicker', 'calendar', 'audio', 'network', 'ai'):
                            api.show_hover_card(wkind, 260)
            except Exception:
                pass


def start_telemetry_loop(api: FlankHostApi) -> None:
    tick = 0
    while True:
        time.sleep(1.0)
        tick += 1
        try:
            if api.prefs.get('collapseOnFullscreen', False):
                fs_active = is_fullscreen_app_active()
                if fs_active and not api._is_collapsed:
                    api._collapsed_due_to_fullscreen = True
                    api.collapse_dock()
                elif not fs_active and api._is_collapsed and api._collapsed_due_to_fullscreen:
                    api._collapsed_due_to_fullscreen = False
                    api.expand_dock()

            if api.prefs.get('autoCollapse', False) and not api._is_collapsed:
                idle_s = get_idle_seconds()
                thresh = float(api.prefs.get('autoCollapseSeconds', 10))
                if idle_s >= thresh:
                    api.collapse_dock()

            cb_changed = api._clipboard.poll_if_changed()
            payload: Dict[str, Any] = {
                'stats': api._providers.sample_stats(),
                'player': api._providers.sample_player(),
                'focus': api._providers.sample_focus(),
                'audio': api._providers.sample_audio(),
            }
            if tick % 2 == 0:
                payload['topProcesses'] = api._providers.sample_top_processes(30)
                payload['activity'] = api._providers.sample_ai_activity()
            if tick % 4 == 0:
                payload['bluetooth'] = api._providers.sample_bluetooth()
            if tick % 5 == 0:
                payload['clock'] = api._providers.sample_clock()
                payload['calendar'] = api._providers.sample_calendar()
            if tick % 8 == 0:
                payload['network'] = api._providers.sample_network()
            if cb_changed or tick % 4 == 0:
                payload['clipboard'] = api._clipboard.get_payload()
            if tick % 4 == 0:
                payload['battery'] = api._providers.sample_battery()
            if tick % 90 == 0:
                payload['weather'] = api._providers.fetch_weather()

            js_arg = json.dumps(payload)
            for w in list(windows.values()):
                try:
                    w.evaluate_js(f'window.flankReceiveHostUpdate && window.flankReceiveHostUpdate({js_arg})')
                except Exception:
                    pass
        except Exception:
            pass


def main() -> None:
    try:
        shell32.SetCurrentProcessExplicitAppUserModelID("Flank.App")
    except Exception:
        pass
    app_data_dir = os.path.join(os.environ.get('APPDATA', os.path.expanduser('~')), 'Flank')
    api = FlankHostApi(app_data_dir)

    public_dir = resolve_public_dir()
    index_html = os.path.join(public_dir, 'index.html')
    import pathlib
    index_url = pathlib.Path(index_html).as_uri()

    wx, wy, ww, wh = get_work_area()

    pad = 0
    api._dock_window_padding = pad
    api._card_window_padding = pad
    api._modal_window_padding = pad

    enabled_count = len([it for it in api.prefs.get('items', []) if isinstance(it, dict) and it.get('enabled', True)])
    dock_w = 64
    dock_h = max(120, min(wh - 16, enabled_count * 48 + 52))
    dock_x = wx + ww - dock_w - 12
    dock_y = wy + (wh - dock_h) // 2
    api._dock_shape_rect = (dock_x, dock_y, dock_w, dock_h)

    dock_window = webview.create_window(
        title='Flank',
        url=f'{index_url}#dock',
        js_api=api,
        x=dock_x,
        y=dock_y,
        width=dock_w,
        height=dock_h,
        min_size=(10, 10),
        frameless=True,
        on_top=True,
        focus=True,
        transparent=True,
        resizable=False,
    )

    card_window = webview.create_window(
        title='Flank Card',
        url=f'{index_url}#card',
        js_api=api,
        x=-9999,
        y=-9999,
        width=292,
        height=240,
        min_size=(10, 10),
        frameless=True,
        on_top=True,
        focus=True,
        transparent=True,
        resizable=False,
    )

    modal_window = webview.create_window(
        title='Flank Settings',
        url=f'{index_url}#modal',
        js_api=api,
        x=-9999,
        y=-9999,
        width=960,
        height=680,
        frameless=True,
        on_top=True,
        focus=True,
        transparent=True,
        resizable=False,
    )

    windows['dock'] = dock_window
    windows['card'] = card_window
    windows['modal'] = modal_window

    def on_dock_shown():
        _log_debug("on_dock_shown called")
        try:
            hwnd = dock_window.native.Handle.ToInt32()
            _log_debug(f"on_dock_shown: hwnd={hwnd}")
            api.hwnd = hwnd

            _log_debug("on_dock_shown: resolving icon")
            icon_p = resolve_icon_path()
            _log_debug(f"on_dock_shown: icon_p={icon_p}")
            apply_window_icon(hwnd, icon_p)

            _log_debug("on_dock_shown: calling init_tray")
            try:
                api.init_tray()
                _log_debug("on_dock_shown: init_tray complete")
            except BaseException as e:
                _log_debug(f"on_dock_shown: init_tray error {e}")
            scale = user32.GetDpiForWindow(hwnd) / 96.0 if user32.GetDpiForWindow(hwnd) > 0 else 1.0

            logical_wx = int(round(wx / scale))
            logical_wy = int(round(wy / scale))
            logical_ww = int(round(ww / scale))
            logical_wh = int(round(wh / scale))

            edge = api.prefs.get('edgeOverride') or 'right'
            if edge == 'left':
                shape_x = logical_wx + 12
            else:
                shape_x = logical_wx + logical_ww - dock_w - 12

            shape_y = logical_wy + (logical_wh - dock_h) // 2

            pw = int(round(dock_w * scale))
            ph = int(round(dock_h * scale))
            px = int(round(shape_x * scale))
            py = int(round(shape_y * scale))

            setup_transparency(dock_window.native)
            # Force exact window bounds
            user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0040)
            rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, pw, pw)
            user32.SetWindowRgn(hwnd, rgn, True)

            ex = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
            user32.SetWindowLongW(hwnd, GWL_EXSTYLE, (ex | WS_EX_TOOLWINDOW | WS_EX_TOPMOST) & ~WS_EX_NOACTIVATE)
            _log_debug("on_dock_shown: SetWindowLongW complete")

            if api._is_collapsed:
                _log_debug("on_dock_shown: starting collapsed")
                api.set_dock_state('collapsed')
                dock_window.evaluate_js("window.flankSetDockState && window.flankSetDockState('collapsed')")
            _log_debug("on_dock_shown: success!")
        except Exception as e:
            import traceback
            _log_debug(f"on_dock_shown EXCEPTION: {e}\n{traceback.format_exc()}")

        threading.Thread(target=start_hotkey_listener, args=(api,), daemon=True).start()
        threading.Thread(target=start_telemetry_loop, args=(api,), daemon=True).start()

        if '--smoke-test' in sys.argv:
            def run_smoke():
                time.sleep(2.2)
                try:
                    for tid in ('paper', 'glass', 'terminal', 'rail', 'aurora', 'liquid-glass', 'paper'):
                        dock_window.evaluate_js(f"window.flankSwitchTheme && window.flankSwitchTheme('{tid}')")
                        time.sleep(0.25)
                    res = dock_window.evaluate_js(
                        "JSON.stringify({theme: document.documentElement.getAttribute('data-theme'), shape: document.documentElement.getAttribute('data-shape'), width: document.getElementById('flank-dock')?.offsetWidth, height: document.getElementById('flank-dock')?.offsetHeight, tiles: document.querySelectorAll('[data-item-id]').length, batteryTile: !!document.querySelector('[data-widget=\"battery\"]'), focusTile: !!document.querySelector('[data-widget=\"focus\"]'), clockTile: !!document.querySelector('[data-widget=\"clock\"]'), scratchpadTile: !!document.querySelector('[data-widget=\"scratchpad\"]'), colorpickerTile: !!document.querySelector('[data-widget=\"colorpicker\"]'), calendarTile: !!document.querySelector('[data-widget=\"calendar\"]'), audioTile: !!document.querySelector('[data-widget=\"audio\"]'), networkTile: !!document.querySelector('[data-widget=\"network\"]')})"
                    )

                    # Smoke test collapse and expand
                    dock_window.evaluate_js("document.querySelector('[data-action=\"collapse-dock\"]').click()")
                    time.sleep(1.0)
                    rc_col = RECT()
                    user32.GetWindowRect(hwnd, ctypes.byref(rc_col))
                    col_info = dock_window.evaluate_js(
                        "JSON.stringify({dockState: document.documentElement.getAttribute('data-dock-state'), tab: !!document.querySelector('.flank-dock-tab'), tabHtml: document.querySelector('.flank-dock-tab')?.innerHTML, tabW: document.querySelector('.flank-dock-tab')?.offsetWidth, tabH: document.querySelector('.flank-dock-tab')?.offsetHeight})"
                    )

                    # Click tab to expand
                    dock_window.evaluate_js("document.querySelector('.flank-dock-tab').click()")
                    time.sleep(1.0)
                    rc_exp = RECT()
                    user32.GetWindowRect(hwnd, ctypes.byref(rc_exp))
                    exp_info = dock_window.evaluate_js(
                        "JSON.stringify({dockState: document.documentElement.getAttribute('data-dock-state'), dockW: document.getElementById('flank-dock')?.offsetWidth, dockH: document.getElementById('flank-dock')?.offsetHeight})"
                    )

                    smoke_out = os.path.join(app_data_dir, 'smoke_test.json')
                    with open(smoke_out, 'w', encoding='utf-8') as f:
                        f.write(json.dumps({
                            'initial': json.loads(res) if res else {},
                            'collapsed_window': {'left': rc_col.left, 'top': rc_col.top, 'right': rc_col.right, 'bottom': rc_col.bottom, 'w': rc_col.right - rc_col.left, 'h': rc_col.bottom - rc_col.top},
                            'collapsed_js': json.loads(col_info) if col_info else {},
                            'reexpanded_window': {'left': rc_exp.left, 'top': rc_exp.top, 'right': rc_exp.right, 'bottom': rc_exp.bottom, 'w': rc_exp.right - rc_exp.left, 'h': rc_exp.bottom - rc_exp.top},
                            'reexpanded_js': json.loads(exp_info) if exp_info else {},
                        }, indent=2))
                except Exception as e:
                    smoke_out = os.path.join(app_data_dir, 'smoke_test.json')
                    with open(smoke_out, 'w', encoding='utf-8') as f:
                        f.write(json.dumps({'error': str(e)}))
                finally:
                    dock_window.destroy()
                    card_window.destroy()
                    modal_window.destroy()

            threading.Thread(target=run_smoke, daemon=True).start()

    def on_card_shown():
        try:
            hwnd = card_window.native.Handle.ToInt32()
            icon_p = resolve_icon_path()
            apply_window_icon(hwnd, icon_p)
            ex = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
            user32.SetWindowLongW(hwnd, GWL_EXSTYLE, (ex | WS_EX_TOOLWINDOW | WS_EX_TOPMOST) & ~WS_EX_NOACTIVATE)
            setup_transparency(card_window.native)
            if not api._card_open:
                user32.ShowWindow(hwnd, 0)
        except Exception:
            pass

    def on_modal_shown():
        try:
            hwnd = modal_window.native.Handle.ToInt32()
            icon_p = resolve_icon_path()
            apply_window_icon(hwnd, icon_p)
            ex = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
            user32.SetWindowLongW(hwnd, GWL_EXSTYLE, (ex | WS_EX_TOOLWINDOW | WS_EX_TOPMOST) & ~WS_EX_NOACTIVATE)
            setup_transparency(modal_window.native)
            if not api._modal_open:
                user32.ShowWindow(hwnd, 0)
        except Exception:
            pass

    def on_card_loaded():
        if not api._card_open and hasattr(card_window, 'native') and card_window.native:
            user32.ShowWindow(card_window.native.Handle.ToInt32(), 0)

    def on_modal_loaded():
        if not api._modal_open and hasattr(modal_window, 'native') and modal_window.native:
            user32.ShowWindow(modal_window.native.Handle.ToInt32(), 0)

    dock_window.events.shown += on_dock_shown
    card_window.events.shown += on_card_shown
    modal_window.events.shown += on_modal_shown
    card_window.events.loaded += on_card_loaded
    modal_window.events.loaded += on_modal_loaded

    webview.start(gui='edgechromium', debug=False)


if __name__ == '__main__':
    main()
