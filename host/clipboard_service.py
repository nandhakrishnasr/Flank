import ctypes
from ctypes import wintypes
import datetime
import hashlib
import os
import re
import sqlite3
import threading
import time
from typing import Any, Dict, List, Optional

user32 = ctypes.WinDLL('user32', use_last_error=True)
kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
shell32 = ctypes.WinDLL('shell32', use_last_error=True)

PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
kernel32.OpenProcess.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
kernel32.OpenProcess.restype = wintypes.HANDLE
kernel32.QueryFullProcessImageNameW.argtypes = [
    wintypes.HANDLE,
    wintypes.DWORD,
    wintypes.LPWSTR,
    ctypes.POINTER(wintypes.DWORD),
]
kernel32.QueryFullProcessImageNameW.restype = wintypes.BOOL
kernel32.CloseHandle.argtypes = [wintypes.HANDLE]
kernel32.CloseHandle.restype = wintypes.BOOL

CF_UNICODETEXT = 13
CF_HDROP = 15
GMEM_MOVEABLE = 0x0002

user32.OpenClipboard.argtypes = [wintypes.HWND]
user32.OpenClipboard.restype = wintypes.BOOL
user32.CloseClipboard.argtypes = []
user32.CloseClipboard.restype = wintypes.BOOL
user32.EmptyClipboard.argtypes = []
user32.EmptyClipboard.restype = wintypes.BOOL
user32.GetClipboardData.argtypes = [wintypes.UINT]
user32.GetClipboardData.restype = wintypes.HANDLE
user32.SetClipboardData.argtypes = [wintypes.UINT, wintypes.HANDLE]
user32.SetClipboardData.restype = wintypes.HANDLE
user32.IsClipboardFormatAvailable.argtypes = [wintypes.UINT]
user32.IsClipboardFormatAvailable.restype = wintypes.BOOL
user32.RegisterClipboardFormatW.argtypes = [wintypes.LPCWSTR]
user32.RegisterClipboardFormatW.restype = wintypes.UINT
user32.GetClipboardSequenceNumber.argtypes = []
user32.GetClipboardSequenceNumber.restype = wintypes.DWORD
user32.GetForegroundWindow.argtypes = []
user32.GetForegroundWindow.restype = wintypes.HWND
user32.GetWindowThreadProcessId.argtypes = [wintypes.HWND, ctypes.POINTER(wintypes.DWORD)]
user32.GetWindowThreadProcessId.restype = wintypes.DWORD

kernel32.GlobalLock.argtypes = [wintypes.HGLOBAL]
kernel32.GlobalLock.restype = ctypes.c_void_p
kernel32.GlobalUnlock.argtypes = [wintypes.HGLOBAL]
kernel32.GlobalUnlock.restype = wintypes.BOOL
kernel32.GlobalAlloc.argtypes = [wintypes.UINT, ctypes.c_size_t]
kernel32.GlobalAlloc.restype = wintypes.HGLOBAL

shell32.DragQueryFileW.argtypes = [wintypes.HANDLE, wintypes.UINT, wintypes.LPWSTR, wintypes.UINT]
shell32.DragQueryFileW.restype = wintypes.UINT


def get_foreground_app_name() -> str:
    try:
        hwnd = user32.GetForegroundWindow()
        if not hwnd:
            return 'System'
        pid = wintypes.DWORD(0)
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if not pid.value:
            return 'System'
        h_proc = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid.value)
        if not h_proc:
            return 'Windows'
        try:
            buf_len = wintypes.DWORD(520)
            buf = ctypes.create_unicode_buffer(520)
            if kernel32.QueryFullProcessImageNameW(h_proc, 0, buf, ctypes.byref(buf_len)):
                name = os.path.basename(buf.value)
            else:
                name = 'Windows'
        finally:
            kernel32.CloseHandle(h_proc)
        if name.lower().endswith('.exe'):
            name = name[:-4]
        friendly = {
            'chrome': 'Chrome',
            'msedge': 'Edge',
            'firefox': 'Firefox',
            'code': 'VS Code',
            'windowsterminal': 'Windows Terminal',
            'explorer': 'File Explorer',
            'notepad': 'Notepad',
        }
        return friendly.get(name.lower(), name.capitalize())
    except Exception:
        return 'Windows'


def format_relative_time(ts: float) -> str:
    diff = max(0.0, time.time() - ts)
    if diff < 45:
        return 'just now'
    if diff < 3600:
        return f'{int(diff // 60)} min ago'
    if diff < 86400:
        hrs = int(diff // 3600)
        return f'{hrs} hr ago'
    return 'Yesterday'


def classify_text(text: str) -> tuple[str, str, Optional[str]]:
    stripped = text.strip()
    if re.match(r'^https?://[^\s]+$', stripped, re.I) or re.match(
        r'^[a-z0-9.-]+\.[a-z]{2,}(/[^\s]*)?$', stripped, re.I
    ):
        clean_title = re.sub(r'^https?://', '', stripped)
        domain_char = clean_title[0].upper() if clean_title else 'L'
        return ('link', clean_title[:120], domain_char)
    if any(
         stripped.startswith(prefix)
        for prefix in ('npm ', 'git ', 'cargo ', 'python ', 'pip ', 'docker ', 'def ', 'function ', 'const ', 'import ')
    ):
        first_line = stripped.splitlines()[0][:120]
        return ('code', first_line, None)
    first_line = stripped.splitlines()[0] if stripped.splitlines() else stripped
    return ('text', first_line[:120], None)


class ClipboardService:
    """
    Event-driven / sequence-checked Windows clipboard manager with SQLite storage.
    Enforces DESIGN.md section 4.1 & 7:
    - Up to 200 items total, newest 12 images
    - Skips password manager private items (ExcludeClipboardContentFromMonitorProcessing)
    """

    MAX_ITEMS = 200
    MAX_IMAGES = 12

    KNOWN_VAULT_APPS = {
        '1password', '1password.exe',
        'bitwarden', 'bitwarden.exe',
        'keepass', 'keepass.exe',
        'keepassxc', 'keepassxc.exe',
        'enpass', 'enpass.exe',
        'dashlane', 'dashlane.exe',
        'nordpass', 'nordpass.exe',
        'proton pass', 'proton pass.exe',
        'lastpass', 'lastpass.exe',
        'credentialuibroker', 'credentialuibroker.exe',
        'authy', 'authy.exe',
    }

    def __init__(self, db_path: str):
        self.db_path = db_path
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self._lock = threading.Lock()
        self._last_seq = 0
        self._ignore_next_seq = False
        self._fmt_exclude = user32.RegisterClipboardFormatW('ExcludeClipboardContentFromMonitorProcessing')
        self._fmt_history = user32.RegisterClipboardFormatW('CanIncludeInClipboardHistory')
        self._fmt_viewer_ignore = user32.RegisterClipboardFormatW('ClipboardViewerIgnore')
        self._fmt_viewer_ignore_spaced = user32.RegisterClipboardFormatW('Clipboard Viewer Ignore')
        self._fmt_cloud_ignore = user32.RegisterClipboardFormatW('CanUploadToCloudClipboard')
        self._fmt_prevent_all = user32.RegisterClipboardFormatW('PreventClipboardCloudAndHistory')
        self._init_db()
        # Capture current clipboard on startup if non-empty
        try:
            self.poll_if_changed()
        except Exception:
            pass

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self.db_path, check_same_thread=False)

    def _init_db(self) -> None:
        with self._lock, self._connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS clipboard_entries (
                    id TEXT PRIMARY KEY,
                    kind TEXT NOT NULL,
                    title TEXT NOT NULL,
                    content TEXT NOT NULL,
                    preview_subtitle TEXT,
                    source_app TEXT NOT NULL,
                    copied_ts REAL NOT NULL,
                    copied_at TEXT NOT NULL,
                    length_label TEXT NOT NULL,
                    pinned INTEGER NOT NULL DEFAULT 0,
                    monogram TEXT
                )
                """
            )
            # Remove any historical mock seed data
            conn.execute("DELETE FROM clipboard_entries WHERE id LIKE 'cb-seed-%'")
            conn.commit()

    def _is_private_clipboard(self, source_app: str = '') -> bool:
        if source_app and source_app.strip().lower() in self.KNOWN_VAULT_APPS:
            return True
        if self._fmt_exclude and user32.IsClipboardFormatAvailable(self._fmt_exclude):
            return True
        if self._fmt_viewer_ignore and user32.IsClipboardFormatAvailable(self._fmt_viewer_ignore):
            return True
        if self._fmt_viewer_ignore_spaced and user32.IsClipboardFormatAvailable(self._fmt_viewer_ignore_spaced):
            return True
        if self._fmt_prevent_all and user32.IsClipboardFormatAvailable(self._fmt_prevent_all):
            return True
        if self._fmt_history and user32.IsClipboardFormatAvailable(self._fmt_history):
            h_data = user32.GetClipboardData(self._fmt_history)
            if h_data:
                ptr = kernel32.GlobalLock(h_data)
                if ptr:
                    try:
                        val = ctypes.cast(ptr, ctypes.POINTER(wintypes.DWORD)).contents.value
                        if val == 0:
                            return True
                    finally:
                        kernel32.GlobalUnlock(h_data)
        if self._fmt_cloud_ignore and user32.IsClipboardFormatAvailable(self._fmt_cloud_ignore):
            h_data = user32.GetClipboardData(self._fmt_cloud_ignore)
            if h_data:
                ptr = kernel32.GlobalLock(h_data)
                if ptr:
                    try:
                        val = ctypes.cast(ptr, ctypes.POINTER(wintypes.DWORD)).contents.value
                        if val == 0:
                            return True
                    finally:
                        kernel32.GlobalUnlock(h_data)
        return False

    def poll_if_changed(self) -> bool:
        seq = user32.GetClipboardSequenceNumber()
        if seq == self._last_seq:
            return False
        self._last_seq = seq
        if self._ignore_next_seq:
            self._ignore_next_seq = False
            return False

        source_app = get_foreground_app_name()
        if not user32.OpenClipboard(None):
            return False

        try:
            if self._is_private_clipboard(source_app):
                return False

            if user32.IsClipboardFormatAvailable(CF_UNICODETEXT):
                h_data = user32.GetClipboardData(CF_UNICODETEXT)
                if h_data:
                    ptr = kernel32.GlobalLock(h_data)
                    if ptr:
                        try:
                            text = ctypes.wstring_at(ptr)
                        finally:
                            kernel32.GlobalUnlock(h_data)
                        if text and text.strip():
                            self._record_text_entry(text, source_app)
                            return True

            if user32.IsClipboardFormatAvailable(CF_HDROP):
                h_drop = user32.GetClipboardData(CF_HDROP)
                if h_drop:
                    count = shell32.DragQueryFileW(h_drop, 0xFFFFFFFF, None, 0)
                    if count > 0:
                        buf = ctypes.create_unicode_buffer(520)
                        shell32.DragQueryFileW(h_drop, 0, buf, 520)
                        file_path = buf.value
                        if file_path:
                            self._record_file_entry(file_path, source_app)
                            return True
        except Exception:
            pass
        finally:
            user32.CloseClipboard()

        return False

    def _record_text_entry(self, text: str, source_app: str) -> None:
        kind, title, monogram = classify_text(text)
        entry_id = 'cb-' + hashlib.sha1(text.encode('utf-8', errors='ignore')).hexdigest()[:12]
        now = time.time()
        copied_at = datetime.datetime.now().strftime('Today, %I:%M %p').replace(' 0', ' ')
        length_label = f'{len(text)} characters'
        subtitle = 'Opens in your default browser' if kind == 'link' else ('Shell / code snippet' if kind == 'code' else 'Plain text')

        with self._lock, self._connect() as conn:
            conn.execute(
                """
                INSERT INTO clipboard_entries
                (id, kind, title, content, preview_subtitle, source_app, copied_ts, copied_at, length_label, pinned, monogram)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT pinned FROM clipboard_entries WHERE id = ?), 0), ?)
                ON CONFLICT(id) DO UPDATE SET
                    copied_ts = excluded.copied_ts,
                    copied_at = excluded.copied_at,
                    source_app = excluded.source_app
                """,
                (entry_id, kind, title, text[:8000], subtitle, source_app, now, copied_at, length_label, entry_id, monogram),
            )
            self._enforce_caps(conn)
            conn.commit()

    def _record_file_entry(self, file_path: str, source_app: str) -> None:
        fname = os.path.basename(file_path) or file_path
        entry_id = 'cb-' + hashlib.sha1(file_path.encode('utf-8', errors='ignore')).hexdigest()[:12]
        now = time.time()
        copied_at = datetime.datetime.now().strftime('Today, %I:%M %p').replace(' 0', ' ')
        try:
            sz = os.path.getsize(file_path)
            length_label = f'{sz / (1024 * 1024):.1f} MB' if sz >= 1024 * 1024 else f'{max(1, sz // 1024)} KB'
        except Exception:
            length_label = 'File'

        ext = os.path.splitext(fname)[1].lower()
        kind = 'image' if ext in ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp') else 'file'

        with self._lock, self._connect() as conn:
            conn.execute(
                """
                INSERT INTO clipboard_entries
                (id, kind, title, content, preview_subtitle, source_app, copied_ts, copied_at, length_label, pinned, monogram)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT pinned FROM clipboard_entries WHERE id = ?), 0), NULL)
                ON CONFLICT(id) DO UPDATE SET
                    copied_ts = excluded.copied_ts,
                    copied_at = excluded.copied_at
                """,
                (entry_id, kind, fname, file_path, file_path, source_app, now, copied_at, length_label, entry_id),
            )
            self._enforce_caps(conn)
            conn.commit()

    def _enforce_caps(self, conn: sqlite3.Connection) -> None:
        # Cap images at newest 12
        conn.execute(
            """
            DELETE FROM clipboard_entries
            WHERE kind = 'image' AND pinned = 0 AND id NOT IN (
                SELECT id FROM clipboard_entries WHERE kind = 'image' ORDER BY copied_ts DESC LIMIT ?
            )
            """,
            (self.MAX_IMAGES,),
        )
        # Cap total entries at 200
        conn.execute(
            """
            DELETE FROM clipboard_entries
            WHERE pinned = 0 AND id NOT IN (
                SELECT id FROM clipboard_entries ORDER BY pinned DESC, copied_ts DESC LIMIT ?
            )
            """,
            (self.MAX_ITEMS,),
        )

    def get_payload(self) -> Dict[str, Any]:
        with self._lock, self._connect() as conn:
            cur = conn.execute(
                """
                SELECT id, kind, title, content, preview_subtitle, source_app, copied_ts, copied_at, length_label, pinned, monogram
                FROM clipboard_entries
                ORDER BY pinned DESC, copied_ts DESC
                LIMIT ?
                """,
                (self.MAX_ITEMS,),
            )
            rows = cur.fetchall()

        items: List[Dict[str, Any]] = []
        for r in rows:
            items.append(
                {
                    'id': r[0],
                    'kind': r[1],
                    'title': r[2],
                    'content': r[3],
                    'previewSubtitle': r[4],
                    'sourceApp': r[5],
                    'relativeTime': format_relative_time(float(r[6])),
                    'copiedAt': r[7],
                    'lengthLabel': r[8],
                    'pinned': bool(r[9]),
                    'monogram': r[10],
                }
            )
        return {
            'count': len(items),
            'maxItems': self.MAX_ITEMS,
            'items': items,
        }

    def copy_to_system_clipboard(self, entry_id: str) -> bool:
        with self._lock, self._connect() as conn:
            cur = conn.execute('SELECT content FROM clipboard_entries WHERE id = ?', (entry_id,))
            row = cur.fetchone()
            if not row:
                return False
            text = str(row[0])
            conn.execute('UPDATE clipboard_entries SET copied_ts = ? WHERE id = ?', (time.time(), entry_id))
            conn.commit()

        self._ignore_next_seq = True
        if not user32.OpenClipboard(None):
            return False
        try:
            user32.EmptyClipboard()
            encoded = (text + '\0').encode('utf-16-le')
            h_mem = kernel32.GlobalAlloc(GMEM_MOVEABLE, len(encoded))
            if h_mem:
                ptr = kernel32.GlobalLock(h_mem)
                if ptr:
                    ctypes.memmove(ptr, encoded, len(encoded))
                    kernel32.GlobalUnlock(h_mem)
                    user32.SetClipboardData(CF_UNICODETEXT, h_mem)
                    return True
        finally:
            user32.CloseClipboard()
        return False

    def toggle_pin(self, entry_id: str) -> bool:
        with self._lock, self._connect() as conn:
            conn.execute(
                'UPDATE clipboard_entries SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ?',
                (entry_id,),
            )
            conn.commit()
        return True

    def delete_entry(self, entry_id: str) -> bool:
        with self._lock, self._connect() as conn:
            conn.execute('DELETE FROM clipboard_entries WHERE id = ?', (entry_id,))
            conn.commit()
        return True

    def clear_unpinned(self) -> bool:
        with self._lock, self._connect() as conn:
            conn.execute('DELETE FROM clipboard_entries WHERE pinned = 0')
            conn.commit()
        return True

    def set_clipboard_text(self, text: str) -> bool:
        if not text:
            return False
        self._ignore_next_seq = True
        if not user32.OpenClipboard(None):
            return False
        try:
            user32.EmptyClipboard()
            encoded = (text + '\0').encode('utf-16-le')
            h_mem = kernel32.GlobalAlloc(GMEM_MOVEABLE, len(encoded))
            if h_mem:
                ptr = kernel32.GlobalLock(h_mem)
                if ptr:
                    ctypes.memmove(ptr, encoded, len(encoded))
                    kernel32.GlobalUnlock(h_mem)
                    user32.SetClipboardData(CF_UNICODETEXT, h_mem)
                    return True
        finally:
            user32.CloseClipboard()
        return False

