import colorsys
import ctypes
from ctypes import wintypes
import datetime
import json
import os
import shutil
import socket
import subprocess
import threading
import time
import urllib.parse
import urllib.request
import uuid
from typing import Any, Dict, List

kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
user32 = ctypes.WinDLL('user32', use_last_error=True)
gdi32 = ctypes.WinDLL('gdi32', use_last_error=True)
psapi = ctypes.WinDLL('psapi', use_last_error=True)

class PROCESSENTRY32W(ctypes.Structure):
    _fields_ = [
        ('dwSize', wintypes.DWORD),
        ('cntUsage', wintypes.DWORD),
        ('th32ProcessID', wintypes.DWORD),
        ('th32DefaultHeapID', ctypes.POINTER(wintypes.ULONG)),
        ('th32ModuleID', wintypes.DWORD),
        ('cntThreads', wintypes.DWORD),
        ('th32ParentProcessID', wintypes.DWORD),
        ('pcPriClassBase', ctypes.c_long),
        ('dwFlags', wintypes.DWORD),
        ('szExeFile', ctypes.c_wchar * 260),
    ]

class PROCESS_MEMORY_COUNTERS_EX(ctypes.Structure):
    _fields_ = [
        ('cb', wintypes.DWORD),
        ('PageFaultCount', wintypes.DWORD),
        ('PeakWorkingSetSize', ctypes.c_size_t),
        ('WorkingSetSize', ctypes.c_size_t),
        ('QuotaPeakPagedPoolUsage', ctypes.c_size_t),
        ('QuotaPagedPoolUsage', ctypes.c_size_t),
        ('QuotaPeakNonPagedPoolUsage', ctypes.c_size_t),
        ('QuotaNonPagedPoolUsage', ctypes.c_size_t),
        ('PagefileUsage', ctypes.c_size_t),
        ('PeakPagefileUsage', ctypes.c_size_t),
        ('PrivateUsage', ctypes.c_size_t),
    ]

class GUID(ctypes.Structure):
    _fields_ = [
        ('Data1', wintypes.DWORD),
        ('Data2', wintypes.WORD),
        ('Data3', wintypes.WORD),
        ('Data4', wintypes.BYTE * 8),
    ]

def _make_guid(guid_str: str) -> GUID:
    u = uuid.UUID(guid_str)
    g = GUID()
    ctypes.memmove(ctypes.byref(g), u.bytes_le, 16)
    return g

CLSID_MMDeviceEnumerator = _make_guid('{BCDE0395-E52F-467C-8E3D-C4579291692E}')
IID_IMMDeviceEnumerator = _make_guid('{A95664D2-9614-4F35-A746-DE8DB63617E6}')
IID_IAudioEndpointVolume = _make_guid('{5CDF2C82-841E-4546-9722-0CF74078229A}')

class IMMDeviceEnumeratorVtbl(ctypes.Structure):
    _fields_ = [
        ('QueryInterface', ctypes.c_void_p),
        ('AddRef', ctypes.c_void_p),
        ('Release', ctypes.c_void_p),
        ('EnumAudioEndpoints', ctypes.c_void_p),
        ('GetDefaultAudioEndpoint', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.c_uint, ctypes.c_uint, ctypes.POINTER(ctypes.c_void_p))),
    ]
class IMMDeviceEnumerator(ctypes.Structure):
    _fields_ = [('lpVtbl', ctypes.POINTER(IMMDeviceEnumeratorVtbl))]

class IMMDeviceVtbl(ctypes.Structure):
    _fields_ = [
        ('QueryInterface', ctypes.c_void_p),
        ('AddRef', ctypes.c_void_p),
        ('Release', ctypes.c_void_p),
        ('Activate', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.POINTER(GUID), ctypes.c_uint, ctypes.c_void_p, ctypes.POINTER(ctypes.c_void_p))),
    ]
class IMMDevice(ctypes.Structure):
    _fields_ = [('lpVtbl', ctypes.POINTER(IMMDeviceVtbl))]

class IAudioEndpointVolumeVtbl(ctypes.Structure):
    _fields_ = [
        ('QueryInterface', ctypes.c_void_p),
        ('AddRef', ctypes.c_void_p),
        ('Release', ctypes.c_void_p),
        ('RegisterControlChangeNotify', ctypes.c_void_p),
        ('UnregisterControlChangeNotify', ctypes.c_void_p),
        ('GetChannelCount', ctypes.c_void_p),
        ('SetMasterVolumeLevel', ctypes.c_void_p),
        ('SetMasterVolumeLevelScalar', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.c_float, ctypes.c_void_p)),
        ('GetMasterVolumeLevel', ctypes.c_void_p),
        ('GetMasterVolumeLevelScalar', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.POINTER(ctypes.c_float))),
        ('SetChannelVolumeLevel', ctypes.c_void_p),
        ('SetChannelVolumeLevelScalar', ctypes.c_void_p),
        ('GetChannelVolumeLevel', ctypes.c_void_p),
        ('GetChannelVolumeLevelScalar', ctypes.c_void_p),
        ('SetMute', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.c_bool, ctypes.c_void_p)),
        ('GetMute', ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p, ctypes.POINTER(ctypes.c_bool))),
    ]
class IAudioEndpointVolume(ctypes.Structure):
    _fields_ = [('lpVtbl', ctypes.POINTER(IAudioEndpointVolumeVtbl))]

def get_windows_master_volume() -> tuple[int, bool] | None:
    try:
        ole32 = ctypes.oledll.ole32
        ole32.CoInitialize(None)
        enumerator = ctypes.c_void_p()
        hr = ole32.CoCreateInstance(
            ctypes.byref(CLSID_MMDeviceEnumerator),
            None,
            23,
            ctypes.byref(IID_IMMDeviceEnumerator),
            ctypes.byref(enumerator)
        )
        if hr != 0 or not enumerator:
            return None
        enum_ptr = ctypes.cast(enumerator, ctypes.POINTER(IMMDeviceEnumerator))
        dev_p = ctypes.c_void_p()
        hr = enum_ptr.contents.lpVtbl.contents.GetDefaultAudioEndpoint(enum_ptr, 0, 0, ctypes.byref(dev_p))
        if hr != 0 or not dev_p:
            return None
        dev_ptr = ctypes.cast(dev_p, ctypes.POINTER(IMMDevice))
        aev_p = ctypes.c_void_p()
        hr = dev_ptr.contents.lpVtbl.contents.Activate(dev_ptr, ctypes.byref(IID_IAudioEndpointVolume), 23, None, ctypes.byref(aev_p))
        if hr != 0 or not aev_p:
            return None
        aev_ptr = ctypes.cast(aev_p, ctypes.POINTER(IAudioEndpointVolume))
        vol = ctypes.c_float()
        aev_ptr.contents.lpVtbl.contents.GetMasterVolumeLevelScalar(aev_ptr, ctypes.byref(vol))
        mute = ctypes.c_bool()
        aev_ptr.contents.lpVtbl.contents.GetMute(aev_ptr, ctypes.byref(mute))
        return int(round(vol.value * 100)), bool(mute.value)
    except Exception:
        return None

def set_windows_master_volume(level_percent: int | None = None, mute: bool | None = None) -> bool:
    try:
        ole32 = ctypes.oledll.ole32
        ole32.CoInitialize(None)
        enumerator = ctypes.c_void_p()
        hr = ole32.CoCreateInstance(
            ctypes.byref(CLSID_MMDeviceEnumerator),
            None,
            23,
            ctypes.byref(IID_IMMDeviceEnumerator),
            ctypes.byref(enumerator)
        )
        if hr != 0 or not enumerator:
            return False
        enum_ptr = ctypes.cast(enumerator, ctypes.POINTER(IMMDeviceEnumerator))
        dev_p = ctypes.c_void_p()
        hr = enum_ptr.contents.lpVtbl.contents.GetDefaultAudioEndpoint(enum_ptr, 0, 0, ctypes.byref(dev_p))
        if hr != 0 or not dev_p:
            return False
        dev_ptr = ctypes.cast(dev_p, ctypes.POINTER(IMMDevice))
        aev_p = ctypes.c_void_p()
        hr = dev_ptr.contents.lpVtbl.contents.Activate(dev_ptr, ctypes.byref(IID_IAudioEndpointVolume), 23, None, ctypes.byref(aev_p))
        if hr != 0 or not aev_p:
            return False
        aev_ptr = ctypes.cast(aev_p, ctypes.POINTER(IAudioEndpointVolume))
        if level_percent is not None:
            scalar = max(0.0, min(1.0, level_percent / 100.0))
            aev_ptr.contents.lpVtbl.contents.SetMasterVolumeLevelScalar(aev_ptr, ctypes.c_float(scalar), None)
        if mute is not None:
            aev_ptr.contents.lpVtbl.contents.SetMute(aev_ptr, ctypes.c_bool(mute), None)
        return True
    except Exception:
        return False

VK_VOLUME_MUTE = 0xAD
VK_VOLUME_DOWN = 0xAE
VK_VOLUME_UP = 0xAF
VK_MEDIA_NEXT_TRACK = 0xB0
VK_MEDIA_PREV_TRACK = 0xB1
VK_MEDIA_PLAY_PAUSE = 0xB3
KEYEVENTF_KEYUP = 0x0002
DRIVE_FIXED = 3


class POINT(ctypes.Structure):
    _fields_ = [
        ('x', ctypes.c_long),
        ('y', ctypes.c_long),
    ]


class FILETIME(ctypes.Structure):
    _fields_ = [
        ('dwLowDateTime', wintypes.DWORD),
        ('dwHighDateTime', wintypes.DWORD),
    ]


class MEMORYSTATUSEX(ctypes.Structure):
    _fields_ = [
        ('dwLength', wintypes.DWORD),
        ('dwMemoryLoad', wintypes.DWORD),
        ('ullTotalPhys', ctypes.c_ulonglong),
        ('ullAvailPhys', ctypes.c_ulonglong),
        ('ullTotalPageFile', ctypes.c_ulonglong),
        ('ullAvailPageFile', ctypes.c_ulonglong),
        ('ullTotalVirtual', ctypes.c_ulonglong),
        ('ullAvailVirtual', ctypes.c_ulonglong),
        ('ullAvailExtendedVirtual', ctypes.c_ulonglong),
    ]


class SYSTEM_POWER_STATUS(ctypes.Structure):
    _fields_ = [
        ('ACLineStatus', ctypes.c_byte),
        ('BatteryFlag', ctypes.c_byte),
        ('BatteryLifePercent', ctypes.c_byte),
        ('SystemStatusFlag', ctypes.c_byte),
        ('BatteryLifeTime', ctypes.c_ulong),
        ('BatteryFullLifeTime', ctypes.c_ulong),
    ]


kernel32.GetSystemTimes.argtypes = [
    ctypes.POINTER(FILETIME),
    ctypes.POINTER(FILETIME),
    ctypes.POINTER(FILETIME),
]
kernel32.GetSystemTimes.restype = wintypes.BOOL
kernel32.GlobalMemoryStatusEx.argtypes = [ctypes.POINTER(MEMORYSTATUSEX)]
kernel32.GlobalMemoryStatusEx.restype = wintypes.BOOL
kernel32.GetSystemPowerStatus.argtypes = [ctypes.POINTER(SYSTEM_POWER_STATUS)]
kernel32.GetSystemPowerStatus.restype = ctypes.c_int
kernel32.GetLogicalDrives.argtypes = []
kernel32.GetLogicalDrives.restype = wintypes.DWORD
kernel32.GetDriveTypeW.argtypes = [wintypes.LPCWSTR]
kernel32.GetDriveTypeW.restype = wintypes.UINT


def _ft_to_int(ft: FILETIME) -> int:
    return (ft.dwHighDateTime << 32) | ft.dwLowDateTime


class SystemProviders:
    def __init__(self, app_data_dir: str):
        self.app_data_dir = app_data_dir
        os.makedirs(app_data_dir, exist_ok=True)
        self._cpu_history: List[int] = [18, 22, 20, 25, 21, 24, 22, 26, 20, 23, 21, 25, 22, 24, 23]
        self._prev_idle, self._prev_kernel, self._prev_user = self._read_cpu_times()
        self._gpu_percent = 8
        self._last_gpu_check = 0.0
        self._net_rx = 0
        self._net_tx = 0
        self._last_net_ts = 0.0
        self._down_bps = 180 * 1024.0
        self._up_bps = 42 * 1024.0

        self._weather_city = 'Kyoto'
        self._weather_cache: Dict[str, Any] = {
            'city': 'Kyoto',
            'tempC': 24,
            'condition': 'Sunny',
            'icon': 'sun',
            'highC': 29,
            'lowC': 18,
            'hourly': [
                {'label': '4 PM', 'tempC': 24, 'icon': 'sun'},
                {'label': '5 PM', 'tempC': 23, 'icon': 'sun'},
                {'label': '6 PM', 'tempC': 21, 'icon': 'sun'},
                {'label': '7 PM', 'tempC': 19, 'icon': 'moon'},
                {'label': '8 PM', 'tempC': 18, 'icon': 'moon'},
            ],
        }
        self._last_weather_ts = 0.0

        self._player_playing = False
        self._player_title = 'No media playing'
        self._player_artist = 'Play audio in browser or music app'
        self._player_source_app = 'System Media'
        self._player_artwork = ''
        self._player_pos = 0
        self._player_dur = 0
        self._player_base_pos = 0
        self._player_last_updated = 0.0
        self._last_media_poll_ts = 0.0
        self._media_polling = False

        self._tasks_file = os.path.join(self.app_data_dir, 'tasks.json')
        self._habits_file = os.path.join(self.app_data_dir, 'habits.json')
        self._last_storage_scan = 0.0
        self._storage_cache: Dict[str, Any] = {}
        self._last_display_scan = 0.0
        self._display_cache: Dict[str, Any] = {}
        self._last_gpu_scan = 0.0
        self._gpu_cache: Dict[str, Any] = {}
        self._runner_last_output = ''
        self._runner_last_cmd = ''
        self._runner_running = False
        self._current_runner_proc = None
        self._github_token = ''
        self._github_cache: Dict[str, Any] = {}
        self._last_github_fetch = 0.0

        self._focus_running = False
        self._focus_mode = 'focus'
        self._focus_duration_min = 25
        self._focus_remaining_sec = 25 * 60
        self._focus_total_sec = 25 * 60
        self._focus_completed = 0
        self._focus_minutes_today = 0
        self._focus_last_tick = time.time()

        self._clocks_file = os.path.join(self.app_data_dir, 'world_clocks.json')
        self._world_clocks = self._load_world_clocks()

        self._scratchpad_file = os.path.join(self.app_data_dir, 'scratchpad.json')
        self._scratchpad_data = self._load_scratchpad()

        self._colors_file = os.path.join(self.app_data_dir, 'colors.json')
        self._colors_data = self._load_colors()

        self._calendar_file = os.path.join(self.app_data_dir, 'calendar_events.json')
        self._calendar_events = self._load_calendar()

        self._audio_vol = 68
        self._audio_muted = False
        self._audio_mic_muted = False
        self._audio_out_dev = 'System Speakers'
        self._audio_in_dev = 'Microphone Array'

        self._network_cache: Dict[str, Any] | None = None
        self._last_network_scan_ts = 0.0

        # Prime GSMTC media session in background immediately on startup
        self._media_polling = True
        self._last_media_poll_ts = time.time()
        threading.Thread(target=self._poll_gsmtc_worker, daemon=True).start()

        self._battery_history: List[int] = [80, 81, 81, 82, 82, 82, 82, 82]
        self._last_wmi_bat_ts = 0.0
        self._bat_model = 'A32-K55'
        self._rem_wh = 53.6
        self._full_wh = 65.5
        self._design_wh = 68.0
        self._voltage_v = 16.1
        self._rate_w = 0.0
        self._wmi_charging: bool | None = None
        self._wmi_discharging: bool | None = None

        self._cached_kb_state: Dict[str, Any] | None = None
        self._cached_mouse_state: Dict[str, Any] | None = None
        self._last_periph_poll_ts = 0.0
        threading.Thread(target=self._poll_peripherals_worker, daemon=True).start()

    def _read_cpu_times(self) -> tuple[int, int, int]:
        idle = FILETIME()
        kernel = FILETIME()
        user = FILETIME()
        if kernel32.GetSystemTimes(ctypes.byref(idle), ctypes.byref(kernel), ctypes.byref(user)):
            return (_ft_to_int(idle), _ft_to_int(kernel), _ft_to_int(user))
        return (0, 0, 0)

    def _sample_cpu_percent(self) -> int:
        idle, kernel, user = self._read_cpu_times()
        d_idle = idle - self._prev_idle
        d_kernel = kernel - self._prev_kernel
        d_user = user - self._prev_user
        self._prev_idle, self._prev_kernel, self._prev_user = idle, kernel, user
        total = d_kernel + d_user
        if total <= 0:
            return self._cpu_history[-1] if self._cpu_history else 15
        busy = max(0, total - d_idle)
        return max(1, min(100, int(round((busy / total) * 100.0))))

    def sample_stats(self, refresh_sec: int = 1) -> Dict[str, Any]:
        cpu_total = self._sample_cpu_percent()
        self._cpu_history.append(cpu_total)
        if len(self._cpu_history) > 30:
            self._cpu_history = self._cpu_history[-30:]

        num_cores = min(16, os.cpu_count() or 8)
        cores = [max(1, min(100, cpu_total + ((i % 3) - 1) * 4)) for i in range(num_cores)]

        mem = MEMORYSTATUSEX()
        mem.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
        if kernel32.GlobalMemoryStatusEx(ctypes.byref(mem)):
            mem_total_gb = round(mem.ullTotalPhys / (1024**3), 1)
            mem_used_gb = round((mem.ullTotalPhys - mem.ullAvailPhys) / (1024**3), 1)
            mem_pct = int(mem.dwMemoryLoad)
        else:
            mem_total_gb = 32.0
            mem_used_gb = 11.4
            mem_pct = 36

        now = time.time()
        if now - self._last_gpu_check > 6.0:
            self._last_gpu_check = now
            self._gpu_percent = self._read_gpu_percent(cpu_total)

        if now - self._last_net_ts > 3.0:
            self._update_net_rates(now)

        disks = []
        mask = kernel32.GetLogicalDrives()
        for i in range(26):
            if mask & (1 << i):
                letter = f'{chr(65 + i)}:\\'
                if kernel32.GetDriveTypeW(letter) == DRIVE_FIXED:
                    try:
                        usage = shutil.disk_usage(letter)
                        used_gb = round(usage.used / (1024**3), 1)
                        total_gb = round(usage.total / (1024**3), 1)
                        pct = int(round((usage.used / max(1, usage.total)) * 100.0))
                        disks.append(
                            {
                                'mount': f'{chr(65 + i)}:',
                                'usedGb': used_gb,
                                'totalGb': total_gb,
                                'percent': pct,
                            }
                        )
                    except Exception:
                        pass

        primary = disks[0] if disks else {'mount': 'C:', 'usedGb': 412.0, 'totalGb': 953.0, 'percent': 43}

        return {
            'cpuPercent': cpu_total,
            'memUsedGb': mem_used_gb,
            'memTotalGb': mem_total_gb,
            'memPercent': mem_pct,
            'gpuPercent': self._gpu_percent,
            'diskMount': primary['mount'],
            'diskUsedGb': primary['usedGb'],
            'diskTotalGb': primary['totalGb'],
            'diskPercent': primary['percent'],
            'disks': disks,
            'cpuHistory': list(self._cpu_history),
            'cores': cores,
            'netDownBps': self._down_bps,
            'netUpBps': self._up_bps,
            'refreshSec': refresh_sec,
            'paused': False,
        }

    def _update_net_rates(self, now: float) -> None:
        try:
            res = subprocess.run(
                ['netstat', '-e'],
                capture_output=True,
                text=True,
                timeout=1.2,
                creationflags=0x08000000,
            )
            if res.returncode == 0:
                for line in res.stdout.splitlines():
                    parts = line.split()
                    if len(parts) >= 3 and parts[0].lower() == 'bytes':
                        rx = int(parts[1])
                        tx = int(parts[2])
                        if self._last_net_ts > 0:
                            dt = max(0.5, now - self._last_net_ts)
                            self._down_bps = max(0.0, (rx - self._net_rx) / dt)
                            self._up_bps = max(0.0, (tx - self._net_tx) / dt)
                        self._net_rx = rx
                        self._net_tx = tx
                        self._last_net_ts = now
                        break
        except Exception:
            self._last_net_ts = now

    def _read_gpu_percent(self, fallback_cpu: int) -> int:
        try:
            res = subprocess.run(
                ['nvidia-smi', '--query-gpu=utilization.gpu', '--format=csv,noheader,nounits'],
                capture_output=True,
                text=True,
                timeout=1.2,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout.strip():
                return max(0, min(100, int(res.stdout.strip().splitlines()[0])))
        except Exception:
            pass
        return max(2, min(95, int(fallback_cpu * 0.35)))

    def _refresh_wmi_battery(self, percent: int) -> None:
        now = time.time()
        if now - self._last_wmi_bat_ts < 30.0:
            return
        self._last_wmi_bat_ts = now
        try:
            ps_cmd = (
                "$b = Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue | Select-Object -First 1 Name,DesignVoltage; "
                "$f = Get-CimInstance -Namespace root\\WMI -ClassName BatteryFullChargedCapacity -ErrorAction SilentlyContinue | Select-Object -First 1 FullChargedCapacity; "
                "$s = Get-CimInstance -Namespace root\\WMI -ClassName BatteryStatus -ErrorAction SilentlyContinue | Select-Object -First 1 RemainingCapacity,Voltage,Charging,Discharging,ChargeRate,DischargeRate; "
                "[PSCustomObject]@{Name=$b.Name;Full=$f.FullChargedCapacity;Rem=$s.RemainingCapacity;Volt=$s.Voltage;Chg=$s.Charging;Dis=$s.Discharging;CRate=$s.ChargeRate;DRate=$s.DischargeRate} | ConvertTo-Json -Compress"
            )
            res = subprocess.run(
                ['powershell', '-NoProfile', '-NonInteractive', '-Command', ps_cmd],
                capture_output=True,
                text=True,
                timeout=2.5,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout.strip():
                data = json.loads(res.stdout.strip())
                if data.get('Name'):
                    self._bat_model = str(data['Name']).strip()
                if data.get('Full') and int(data['Full']) > 0:
                    self._full_wh = round(int(data['Full']) / 1000.0, 1)
                    self._design_wh = max(self._full_wh, round(self._full_wh / 0.96, 1))
                if data.get('Rem') is not None and int(data['Rem']) > 0:
                    self._rem_wh = round(int(data['Rem']) / 1000.0, 1)
                else:
                    self._rem_wh = round(self._full_wh * (percent / 100.0), 1)
                if data.get('Volt') and int(data['Volt']) > 0:
                    self._voltage_v = round(int(data['Volt']) / 1000.0, 2)
                if data.get('Chg') is not None:
                    self._wmi_charging = bool(data['Chg'])
                if data.get('Dis') is not None:
                    self._wmi_discharging = bool(data['Dis'])
                c_rate = int(data.get('CRate') or 0)
                d_rate = int(data.get('DRate') or 0)
                rate_mw = c_rate if c_rate > 0 else d_rate
                self._rate_w = round(rate_mw / 1000.0, 1) if rate_mw > 0 else 0.0
        except Exception:
            pass

    def _poll_peripherals_worker(self) -> None:
        time.sleep(1.0)
        while True:
            try:
                self._poll_peripherals_live()
            except Exception:
                pass
            time.sleep(20.0)

    def _poll_peripherals_live(self) -> None:
        self._last_periph_poll_ts = time.time()
        now = self._last_periph_poll_ts
        try:
            import hid
        except Exception:
            return

        # 1. VXE Dragonfly R1 Pro Mouse (VID: 13652 / 0x3554, PID: 62858 / 0xF58A)
        try:
            m_path = None
            for d in hid.enumerate(13652, 62858):
                if d.get('usage_page') == 65282 and d.get('usage') == 2:
                    raw_p = d.get('path')
                    m_path = raw_p.decode('utf-8', errors='ignore') if isinstance(raw_p, bytes) else str(raw_p)
                    break
            if m_path:
                h = hid.device()
                h.open_path(m_path.encode('utf-8') if isinstance(m_path, str) else m_path)
                h.set_nonblocking(1)
                payload = bytearray(16)
                payload[0] = 4
                s = 8 + sum(payload[:15])
                payload[15] = (85 - (s & 0xFF)) & 0xFF
                packet = bytes([8]) + bytes(payload)
                h.write(packet)
                resp = None
                for _ in range(25):
                    time.sleep(0.04)
                    data = h.read(64)
                    if data and len(data) >= 7:
                        resp = data
                        break
                h.close()
                if resp:
                    # Packet format: [8, 4, 0, 0, 0, status, lvl, chg, v_hi, v_lo, ...]
                    offset = 1 if resp[0] == 8 else 0
                    lvl = int(resp[offset + 5])
                    chg = bool(resp[offset + 6])
                    v_mv = ((resp[offset + 7] << 8) | resp[offset + 8]) if len(resp) > offset + 8 else 0
                    if 0 <= lvl <= 100:
                        self._cached_mouse_state = {
                            'id': 'periph-mouse',
                            'name': 'Dragonfly R1 Pro',
                            'kind': 'mouse',
                            'percent': lvl,
                            'charging': chg,
                            'connected': True,
                            'detail': f'2.4 GHz ({v_mv} mV)' if v_mv > 0 else '2.4 GHz Wireless',
                        }
                elif not self._cached_mouse_state:
                    self._cached_mouse_state = {
                        'id': 'periph-mouse',
                        'name': 'Dragonfly R1 Pro',
                        'kind': 'mouse',
                        'percent': 85,
                        'charging': False,
                        'connected': True,
                        'detail': '2.4 GHz (Idle / Sleeping)',
                    }
                else:
                    self._cached_mouse_state['connected'] = True
                    self._cached_mouse_state['detail'] = '2.4 GHz (Idle / Sleeping)'
        except Exception:
            pass

        # 2. CIDOO URX Core 75 Keyboard (VID: 14000 / 0x36B0, PID: 12290 / 0x3002)
        try:
            k_path = None
            for d in hid.enumerate(14000, 12290):
                if d.get('usage_page') == 65376 and d.get('usage') == 97:
                    raw_p = d.get('path')
                    k_path = raw_p.decode('utf-8', errors='ignore') if isinstance(raw_p, bytes) else str(raw_p)
                    break
            if k_path:
                h = hid.device()
                h.open_path(k_path.encode('utf-8') if isinstance(k_path, str) else k_path)
                pkt = [0, 8, 0, 7] + [0] * 29
                h.write(pkt)
                resp = h.read(33, timeout_ms=350)
                h.close()
                if resp and len(resp) >= 4:
                    lvl = -1
                    if resp[0] == 8 and resp[2] == 7:
                        lvl = int(resp[3])
                    elif len(resp) >= 5 and resp[1] == 8 and resp[3] == 7:
                        lvl = int(resp[4])
                    elif len(resp) >= 5 and resp[0] == 0 and resp[1] == 8:
                        lvl = int(resp[4])
                    if 0 <= lvl <= 100:
                        self._cached_kb_state = {
                            'id': 'periph-kb',
                            'name': 'CIDOO URX Core 75',
                            'kind': 'keyboard',
                            'percent': lvl,
                            'charging': False,
                            'connected': True,
                            'detail': '2.4 GHz Wireless HID',
                        }
                elif not self._cached_kb_state:
                    self._cached_kb_state = {
                        'id': 'periph-kb',
                        'name': 'CIDOO URX Core 75',
                        'kind': 'keyboard',
                        'percent': 85,
                        'charging': False,
                        'connected': True,
                        'detail': 'Wireless (Idle / Sleeping)',
                    }
                else:
                    self._cached_kb_state['connected'] = True
                    self._cached_kb_state['detail'] = 'Wireless (Idle / Sleeping)'
        except Exception:
            pass

        # Also write live states to cache file
        try:
            cache_file = os.path.join(self.app_data_dir, 'peripherals_state.json')
            payload = {}
            if os.path.isfile(cache_file):
                try:
                    with open(cache_file, 'r', encoding='utf-8') as f:
                        payload = json.load(f)
                except Exception:
                    payload = {}
            if self._cached_kb_state:
                payload['keyboard'] = {
                    'id': 'cidoo_core_75',
                    'name': self._cached_kb_state['name'],
                    'device_type': 'keyboard',
                    'level': self._cached_kb_state['percent'],
                    'charging': self._cached_kb_state.get('charging', False),
                    'connected': self._cached_kb_state.get('connected', True),
                    'last_updated': now,
                }
            if self._cached_mouse_state:
                payload['mouse'] = {
                    'id': 'dragonfly_r1_pro',
                    'name': self._cached_mouse_state['name'],
                    'device_type': 'mouse',
                    'level': self._cached_mouse_state['percent'],
                    'charging': self._cached_mouse_state.get('charging', False),
                    'connected': self._cached_mouse_state.get('connected', True),
                    'last_updated': now,
                }
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(payload, f, indent=2)
            smabar_cache = os.path.expandvars(r'%LOCALAPPDATA%\smabar\plugins\peripherals\peripherals_state.json')
            if os.path.isdir(os.path.dirname(smabar_cache)):
                with open(smabar_cache, 'w', encoding='utf-8') as f:
                    json.dump(payload, f, indent=2)
        except Exception:
            pass

    def sample_battery(self) -> Dict[str, Any]:
        sps = SYSTEM_POWER_STATUS()
        has_battery = False
        percent = 100
        charging = False
        ac_connected = True
        state_text = 'AC power'
        time_rem = 'Plugged in'
        power_mode = 'Balanced'

        if kernel32.GetSystemPowerStatus(ctypes.byref(sps)):
            ac_connected = sps.ACLineStatus == 1
            no_sys_bat = (sps.BatteryFlag & 128) != 0 or sps.BatteryLifePercent == 255
            has_battery = not no_sys_bat
            if has_battery:
                percent = max(0, min(100, int(sps.BatteryLifePercent)))
                self._refresh_wmi_battery(percent)
                flag_charging = (sps.BatteryFlag & 8) != 0
                charging = bool(self._wmi_charging) if self._wmi_charging is not None else flag_charging

                if charging:
                    state_text = 'Charging'
                    if self._rate_w > 1.0 and self._full_wh > self._rem_wh:
                        rem_min = max(5, int(((self._full_wh - self._rem_wh) / self._rate_w) * 60))
                    else:
                        rem_min = max(5, int((100 - percent) * 0.8))
                    time_rem = f'{rem_min} min to full'
                elif ac_connected and percent >= 99:
                    state_text = 'Fully charged'
                    time_rem = f'{self._full_wh:.1f} Wh · AC power'
                elif ac_connected:
                    state_text = 'Plugged in'
                    time_rem = f'{self._rem_wh:.1f} / {self._full_wh:.1f} Wh · AC power'
                else:
                    state_text = 'On battery'
                    if sps.BatteryLifeTime != 0xFFFFFFFF and sps.BatteryLifeTime > 0:
                        hrs = sps.BatteryLifeTime // 3600
                        mins = (sps.BatteryLifeTime % 3600) // 60
                        time_rem = f'{hrs}h {mins}m remaining'
                    elif self._rate_w > 1.0:
                        est_min = int((self._rem_wh / self._rate_w) * 60)
                        time_rem = f'{est_min // 60}h {est_min % 60}m remaining'
                    else:
                        est_min = int(percent * 3.2)
                        time_rem = f'{est_min // 60}h {est_min % 60}m remaining'
            else:
                percent = 100
                charging = False
                state_text = 'AC power'
                time_rem = 'Desktop power'

            if sps.SystemStatusFlag == 1:
                power_mode = 'Battery saver'
            elif ac_connected:
                power_mode = 'High performance'

        self._battery_history.append(percent)
        if len(self._battery_history) > 24:
            self._battery_history = self._battery_history[-24:]

        health_pct = max(50, min(100, int(round((self._full_wh / max(1.0, self._design_wh)) * 100))))
        bat_detail = (
            f'{self._bat_model} · {self._rem_wh:.1f} / {self._full_wh:.1f} Wh · {self._voltage_v:.1f} V'
            if has_battery
            else f'{state_text} · {time_rem}'
        )

        peripherals: List[Dict[str, Any]] = [
            {
                'id': 'sys-bat',
                'name': 'Laptop battery' if has_battery else 'System power (AC)',
                'kind': 'system',
                'percent': percent,
                'charging': charging,
                'connected': True,
                'detail': bat_detail,
            }
        ]

        if not self._cached_mouse_state and not self._cached_kb_state:
            self._poll_peripherals_live()

        loaded_periph = False
        if self._cached_kb_state:
            peripherals.append(dict(self._cached_kb_state))
            loaded_periph = True
        if self._cached_mouse_state:
            peripherals.append(dict(self._cached_mouse_state))
            loaded_periph = True

        if not loaded_periph:
            periph_candidates = [
                os.path.join(self.app_data_dir, 'peripherals_state.json'),
                os.path.expandvars(r'%LOCALAPPDATA%\smabar\plugins\peripherals\peripherals_state.json'),
            ]
            for ppath in periph_candidates:
                if os.path.isfile(ppath):
                    try:
                        with open(ppath, 'r', encoding='utf-8') as f:
                            pdata = json.load(f)
                        kb = pdata.get('keyboard')
                        mouse = pdata.get('mouse')
                        if isinstance(kb, dict) and kb.get('level', 0) > 0 and not self._cached_kb_state:
                            peripherals.append(
                                {
                                    'id': 'periph-kb',
                                    'name': kb.get('name', 'CIDOO URX Core 75'),
                                    'kind': 'keyboard',
                                    'percent': int(kb.get('level', 85)),
                                    'charging': bool(kb.get('charging', False)),
                                    'connected': bool(kb.get('connected', True)),
                                    'detail': '2.4 GHz Wireless HID',
                                }
                            )
                            loaded_periph = True
                        if isinstance(mouse, dict) and mouse.get('level', 0) > 0 and not self._cached_mouse_state:
                            peripherals.append(
                                {
                                    'id': 'periph-mouse',
                                    'name': mouse.get('name', 'Dragonfly R1 Pro'),
                                    'kind': 'mouse',
                                    'percent': int(mouse.get('level', 85)),
                                    'charging': bool(mouse.get('charging', False)),
                                    'connected': bool(mouse.get('connected', True)),
                                    'detail': '2.4 GHz Wireless',
                                }
                            )
                            loaded_periph = True
                        if loaded_periph:
                            break
                    except Exception:
                        pass

        if not loaded_periph:
            peripherals.extend(
                [
                    {
                        'id': 'periph-kb',
                        'name': 'Wireless keyboard',
                        'kind': 'keyboard',
                        'percent': 92,
                        'charging': False,
                        'connected': True,
                        'detail': 'Bluetooth LE',
                    },
                    {
                        'id': 'periph-mouse',
                        'name': 'Wireless mouse',
                        'kind': 'mouse',
                        'percent': 78,
                        'charging': False,
                        'connected': True,
                        'detail': '2.4 GHz receiver',
                    },
                ]
            )

        return {
            'hasSystemBattery': has_battery,
            'percent': percent,
            'charging': charging,
            'acConnected': ac_connected,
            'stateText': state_text,
            'timeRemainingText': time_rem,
            'powerMode': power_mode,
            'healthPercent': health_pct,
            'model': self._bat_model,
            'remainingWh': self._rem_wh,
            'fullChargedWh': self._full_wh,
            'designWh': self._design_wh,
            'voltageV': self._voltage_v,
            'powerRateW': self._rate_w,
            'history': list(self._battery_history),
            'peripherals': peripherals,
        }

    def fetch_weather(self, city: str | None = None, force: bool = False) -> Dict[str, Any]:
        if city:
            self._weather_city = city.strip()
        now = time.time()
        if not force and (now - self._last_weather_ts < 900):
            return self._weather_cache

        self._last_weather_ts = now
        try:
            q = urllib.parse.quote(self._weather_city)
            geo_url = f'https://geocoding-api.open-meteo.com/v1/search?name={q}&count=1&language=en&format=json'
            req = urllib.request.Request(geo_url, headers={'User-Agent': 'FlankDock/1.0'})
            geo_data = json.loads(urllib.request.urlopen(req, timeout=4).read().decode('utf-8'))
            results = geo_data.get('results') or []
            if results:
                loc = results[0]
                lat = loc['latitude']
                lon = loc['longitude']
                resolved_name = loc.get('name', self._weather_city)

                wx_url = (
                    f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}'
                    f'&current=temperature_2m,weather_code,is_day'
                    f'&hourly=temperature_2m,weather_code,is_day'
                    f'&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=2'
                )
                wreq = urllib.request.Request(wx_url, headers={'User-Agent': 'FlankDock/1.0'})
                wx = json.loads(urllib.request.urlopen(wreq, timeout=4).read().decode('utf-8'))

                cur = wx.get('current', {})
                temp_c = int(round(cur.get('temperature_2m', 24)))
                code = int(cur.get('weather_code', 0))
                is_day = bool(cur.get('is_day', 1))
                cond, icon = self._map_wmo(code, is_day)

                daily = wx.get('daily', {})
                highs = daily.get('temperature_2m_max') or [temp_c + 4]
                lows = daily.get('temperature_2m_min') or [temp_c - 4]

                hourly_obj = wx.get('hourly', {})
                h_times = hourly_obj.get('time') or []
                h_temps = hourly_obj.get('temperature_2m') or []
                h_codes = hourly_obj.get('weather_code') or []
                h_days = hourly_obj.get('is_day') or []

                cur_hour_iso = datetime.datetime.now().strftime('%Y-%m-%dT%H:00')
                start_idx = 0
                for idx, t_str in enumerate(h_times):
                    if t_str >= cur_hour_iso:
                        start_idx = idx
                        break

                hourly_list = []
                for idx in range(start_idx, min(start_idx + 5, len(h_times))):
                    dt_obj = datetime.datetime.fromisoformat(h_times[idx])
                    lbl = dt_obj.strftime('%I %p').lstrip('0')
                    ht = int(round(h_temps[idx])) if idx < len(h_temps) else temp_c
                    hc = int(h_codes[idx]) if idx < len(h_codes) else code
                    hd = bool(h_days[idx]) if idx < len(h_days) else is_day
                    _, h_icon = self._map_wmo(hc, hd)
                    hourly_list.append({'label': lbl, 'tempC': ht, 'icon': h_icon})

                if hourly_list:
                    self._weather_cache = {
                        'city': resolved_name,
                        'tempC': temp_c,
                        'condition': cond,
                        'icon': icon,
                        'highC': int(round(highs[0])),
                        'lowC': int(round(lows[0])),
                        'hourly': hourly_list,
                    }
            else:
                self._weather_cache['city'] = self._weather_city
        except Exception:
            self._weather_cache['city'] = self._weather_city

        return self._weather_cache

    def _map_wmo(self, code: int, is_day: bool) -> tuple[str, str]:
        if code == 0:
            return ('Sunny' if is_day else 'Clear', 'sun' if is_day else 'moon')
        if code in (1, 2):
            return ('Partly cloudy', 'sun' if is_day else 'moon')
        if code in (3, 45, 48):
            return ('Cloudy', 'cloud')
        if code in (51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99):
            return ('Rain', 'rain')
        return ('Cloudy', 'cloud')

    def _clean_source_app(self, raw_source: str) -> str:
        if not raw_source:
            return 'System Media'
        s = raw_source.lower()
        if 'dia' in s:
            return 'Dia'
        if 'chrome' in s:
            return 'Chrome'
        if 'msedge' in s or 'edge' in s:
            return 'Edge'
        if 'firefox' in s or 'mozilla' in s:
            return 'Firefox'
        if 'brave' in s:
            return 'Brave'
        if 'opera' in s:
            return 'Opera'
        if 'vivaldi' in s:
            return 'Vivaldi'
        if 'spotify' in s:
            return 'Spotify'
        if 'applemusic' in s or 'itunes' in s:
            return 'Apple Music'
        if 'vlc' in s:
            return 'VLC'
        if 'zune' in s or 'mediaplayer' in s:
            return 'Media Player'
        cleaned = raw_source.split('!')[-1].replace('.exe', '').strip()
        return cleaned[:24] if cleaned else 'System Media'

    def _poll_gsmtc_worker(self) -> None:
        try:
            ps_cmd = (
                "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; "
                "Add-Type -AssemblyName System.Runtime.WindowsRuntime; "
                "$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { "
                "$_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and "
                "$_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]; "
                "Function Await($WinRtTask, $ResultType) { "
                "$asTask = $asTaskGeneric.MakeGenericMethod($ResultType); "
                "$netTask = $asTask.Invoke($null, @($WinRtTask)); "
                "$netTask.Wait(-1) | Out-Null; $netTask.Result }; "
                "[Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager,Windows.Media.Control,ContentType=WindowsRuntime] | Out-Null; "
                "$mgr = Await ([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager]::RequestAsync()) "
                "([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager]); "
                "$s = $mgr.GetCurrentSession(); "
                "if (-not $s) { $all = $mgr.GetSessions(); if ($all.Count -gt 0) { $s = $all[0] } }; "
                "if ($s) { "
                "$p = Await ($s.TryGetMediaPropertiesAsync()) ([Windows.Media.Control.GlobalSystemMediaTransportControlsSessionMediaProperties]); "
                "$info = $s.GetPlaybackInfo(); "
                "$tl = $s.GetTimelineProperties(); "
                "$b64 = ''; "
                "if ($p.Thumbnail) { "
                "try { "
                "$stream = Await ($p.Thumbnail.OpenReadAsync()) ([Windows.Storage.Streams.IRandomAccessStreamWithContentType]); "
                "$asStreamMethod = ([System.IO.WindowsRuntimeStreamExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsStream' -and $_.GetParameters().Count -eq 1 })[0]; "
                "$netStream = $asStreamMethod.Invoke($null, @($stream)); "
                "$ms = New-Object System.IO.MemoryStream; "
                "$netStream.CopyTo($ms); "
                "$bytes = $ms.ToArray(); "
                "if ($bytes.Length -gt 0 -and $bytes.Length -lt 5000000) { $b64 = [Convert]::ToBase64String($bytes) } "
                "} catch {} }; "
                "[PSCustomObject]@{ "
                "Source=$s.SourceAppUserModelId; "
                "Title=$p.Title; "
                "Artist=$p.Artist; "
                "Album=$p.AlbumTitle; "
                "Status=$info.PlaybackStatus.ToString(); "
                "PosSec=[int]$tl.Position.TotalSeconds; "
                "EndSec=[int]$tl.EndTime.TotalSeconds; "
                "LastUpdated=[int][double]::Parse((Get-Date $tl.LastUpdatedTime.UtcDateTime -UFormat %s)); "
                "ArtworkBase64=$b64 "
                "} | ConvertTo-Json -Compress }"
            )
            res = subprocess.run(
                ['powershell', '-NoProfile', '-NonInteractive', '-Command', ps_cmd],
                capture_output=True,
                encoding='utf-8',
                errors='replace',
                timeout=4.0,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout and res.stdout.strip():
                data = json.loads(res.stdout.strip())
                title = (data.get('Title') or '').strip()
                artist = (data.get('Artist') or data.get('Album') or '').strip()
                status = (data.get('Status') or '').strip()
                source_app = self._clean_source_app(str(data.get('Source') or ''))
                pos_sec = max(0, int(data.get('PosSec') or 0))
                end_sec = max(0, int(data.get('EndSec') or 0))
                last_updated = float(data.get('LastUpdated') or 0.0)
                art_b64 = (data.get('ArtworkBase64') or '').strip()

                if art_b64:
                    self._player_artwork = f"data:image/jpeg;base64,{art_b64}"

                if title:
                    self._player_title = title
                    self._player_artist = artist if artist else source_app
                    self._player_source_app = source_app
                    self._player_playing = status == 'Playing'
                    self._player_base_pos = pos_sec
                    self._player_dur = end_sec
                    self._player_last_updated = last_updated if last_updated > 1000000000 else time.time()
                    if self._player_playing and self._player_last_updated > 0:
                        elapsed = max(0, int(time.time() - self._player_last_updated))
                        self._player_pos = (
                            min(self._player_dur, self._player_base_pos + elapsed)
                            if self._player_dur > 0
                            else self._player_base_pos + elapsed
                        )
                    else:
                        self._player_pos = self._player_base_pos
        except Exception:
            pass
        finally:
            self._media_polling = False

    def sample_player(self) -> Dict[str, Any]:
        now = time.time()
        if not self._media_polling and (now - self._last_media_poll_ts >= 2.5):
            self._last_media_poll_ts = now
            self._media_polling = True
            threading.Thread(target=self._poll_gsmtc_worker, daemon=True).start()

        if self._player_playing:
            if self._player_last_updated > 1000000000:
                elapsed = max(0, int(now - self._player_last_updated))
                pos = self._player_base_pos + elapsed
                self._player_pos = min(self._player_dur, pos) if self._player_dur > 0 else pos
            elif self._player_dur > 0:
                self._player_pos = min(self._player_dur, self._player_pos + 1)

        return {
            'playing': self._player_playing,
            'title': self._player_title,
            'artist': self._player_artist,
            'artworkUrl': self._player_artwork,
            'sourceApp': self._player_source_app,
            'positionSec': self._player_pos,
            'durationSec': self._player_dur,
        }

    def media_control(self, action: str) -> bool:
        vk = VK_MEDIA_PLAY_PAUSE
        if action == 'next':
            vk = VK_MEDIA_NEXT_TRACK
            self._player_pos = 0
            self._player_base_pos = 0
        elif action == 'previous':
            vk = VK_MEDIA_PREV_TRACK
            self._player_pos = 0
            self._player_base_pos = 0
        else:
            self._player_playing = not self._player_playing
            self._player_base_pos = self._player_pos
            self._player_last_updated = time.time()

        self._last_media_poll_ts = time.time() - 2.0
        try:
            user32.keybd_event(vk, 0, 0, 0)
            user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, 0)
            return True
        except Exception:
            return False

    def sample_focus(self) -> Dict[str, Any]:
        now = time.time()
        if self._focus_running:
            dt = max(0.0, now - self._focus_last_tick)
            if dt >= 1.0:
                steps = int(dt)
                self._focus_last_tick += steps
                self._focus_remaining_sec = max(0, self._focus_remaining_sec - steps)
                if self._focus_remaining_sec == 0:
                    self._focus_running = False
                    if self._focus_mode == 'focus':
                        self._focus_completed += 1
                        self._focus_minutes_today += self._focus_duration_min
                    try:
                        user32.MessageBeep(0x00000040)
                    except Exception:
                        pass
        else:
            self._focus_last_tick = now

        return {
            'running': self._focus_running,
            'mode': self._focus_mode,
            'durationMinutes': self._focus_duration_min,
            'remainingSec': self._focus_remaining_sec,
            'totalSec': self._focus_total_sec,
            'completedSessions': self._focus_completed,
            'focusedMinutesToday': self._focus_minutes_today,
        }

    def focus_control(self, action: str, value: int | None = None) -> Dict[str, Any]:
        self._focus_last_tick = time.time()
        if action == 'toggle':
            if self._focus_remaining_sec <= 0:
                self._focus_remaining_sec = self._focus_total_sec
            self._focus_running = not self._focus_running
        elif action == 'reset':
            self._focus_running = False
            self._focus_remaining_sec = self._focus_total_sec
        elif action == 'switch-mode':
            self._focus_running = False
            if self._focus_mode == 'focus':
                self._focus_mode = 'break'
                self._focus_total_sec = 5 * 60
                self._focus_remaining_sec = 5 * 60
            else:
                self._focus_mode = 'focus'
                self._focus_total_sec = self._focus_duration_min * 60
                self._focus_remaining_sec = self._focus_total_sec
        elif action == 'duration' and value is not None:
            mins = max(1, min(180, int(value)))
            self._focus_running = False
            if mins == 5:
                self._focus_mode = 'break'
                self._focus_total_sec = 5 * 60
                self._focus_remaining_sec = 5 * 60
            else:
                self._focus_mode = 'focus'
                self._focus_duration_min = mins
                self._focus_total_sec = mins * 60
                self._focus_remaining_sec = self._focus_total_sec
        return self.sample_focus()

    def _load_world_clocks(self) -> List[Dict[str, Any]]:
        if os.path.isfile(self._clocks_file):
            try:
                with open(self._clocks_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if isinstance(data, list) and data:
                    return data
            except Exception:
                pass
        defaults = [
            {'id': 'clock-tokyo', 'city': 'Tokyo', 'country': 'Japan', 'tz': 'Asia/Tokyo', 'utcOffsetSec': 32400},
            {'id': 'clock-london', 'city': 'London', 'country': 'UK', 'tz': 'Europe/London', 'utcOffsetSec': 0},
            {'id': 'clock-ny', 'city': 'New York', 'country': 'USA', 'tz': 'America/New_York', 'utcOffsetSec': -18000},
        ]
        self._save_world_clocks(defaults)
        return defaults

    def _save_world_clocks(self, clocks: List[Dict[str, Any]]) -> None:
        try:
            with open(self._clocks_file, 'w', encoding='utf-8') as f:
                json.dump(clocks, f, indent=2)
        except Exception:
            pass

    def add_world_clock(self, city_query: str) -> Dict[str, Any]:
        cleaned = (city_query or '').strip()
        if not cleaned:
            return self.sample_clock()

        fallback_cities = {
            'tokyo': ('Tokyo', 'Japan', 'Asia/Tokyo', 32400),
            'london': ('London', 'UK', 'Europe/London', 0),
            'new york': ('New York', 'USA', 'America/New_York', -18000),
            'san francisco': ('San Francisco', 'USA', 'America/Los_Angeles', -28800),
            'los angeles': ('Los Angeles', 'USA', 'America/Los_Angeles', -28800),
            'chicago': ('Chicago', 'USA', 'America/Chicago', -21600),
            'toronto': ('Toronto', 'Canada', 'America/Toronto', -18000),
            'singapore': ('Singapore', 'Singapore', 'Asia/Singapore', 28800),
            'sydney': ('Sydney', 'Australia', 'Australia/Sydney', 36000),
            'dubai': ('Dubai', 'UAE', 'Asia/Dubai', 14400),
            'paris': ('Paris', 'France', 'Europe/Paris', 3600),
            'berlin': ('Berlin', 'Germany', 'Europe/Berlin', 3600),
            'mumbai': ('Mumbai', 'India', 'Asia/Kolkata', 19800),
            'bengaluru': ('Bengaluru', 'India', 'Asia/Kolkata', 19800),
            'chennai': ('Chennai', 'India', 'Asia/Kolkata', 19800),
            'delhi': ('New Delhi', 'India', 'Asia/Kolkata', 19800),
            'seoul': ('Seoul', 'South Korea', 'Asia/Seoul', 32400),
            'hong kong': ('Hong Kong', 'China', 'Asia/Hong_Kong', 28800),
        }

        resolved_city = cleaned.title()
        resolved_country = ''
        resolved_tz = 'UTC'
        utc_offset_sec = 0

        key_lower = cleaned.lower()
        if key_lower in fallback_cities:
            resolved_city, resolved_country, resolved_tz, utc_offset_sec = fallback_cities[key_lower]
        else:
            try:
                q = urllib.parse.quote(cleaned)
                geo_url = f'https://geocoding-api.open-meteo.com/v1/search?name={q}&count=1&language=en&format=json'
                req = urllib.request.Request(geo_url, headers={'User-Agent': 'FlankDock/1.0'})
                geo_data = json.loads(urllib.request.urlopen(req, timeout=4).read().decode('utf-8'))
                results = geo_data.get('results') or []
                if results:
                    loc = results[0]
                    resolved_city = loc.get('name') or resolved_city
                    resolved_country = loc.get('country') or loc.get('country_code') or ''
                    resolved_tz = loc.get('timezone') or 'UTC'
                    lat = loc['latitude']
                    lon = loc['longitude']
                    wx_url = f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m&timezone=auto'
                    wreq = urllib.request.Request(wx_url, headers={'User-Agent': 'FlankDock/1.0'})
                    wx = json.loads(urllib.request.urlopen(wreq, timeout=4).read().decode('utf-8'))
                    utc_offset_sec = int(wx.get('utc_offset_seconds', 0))
            except Exception:
                pass

        clock_id = 'clock-' + ''.join(c for c in resolved_city.lower() if c.isalnum())
        self._world_clocks = [c for c in self._world_clocks if c.get('id') != clock_id and c.get('city', '').lower() != resolved_city.lower()]
        self._world_clocks.append(
            {
                'id': clock_id,
                'city': resolved_city,
                'country': resolved_country,
                'tz': resolved_tz,
                'utcOffsetSec': utc_offset_sec,
            }
        )
        self._save_world_clocks(self._world_clocks)
        return self.sample_clock()

    def remove_world_clock(self, clock_id: str) -> Dict[str, Any]:
        self._world_clocks = [c for c in self._world_clocks if c.get('id') != clock_id]
        self._save_world_clocks(self._world_clocks)
        return self.sample_clock()

    def sample_clock(self) -> Dict[str, Any]:
        now_utc = datetime.datetime.now(datetime.timezone.utc)
        now_local = datetime.datetime.now().astimezone()
        local_offset_sec = int(now_local.utcoffset().total_seconds()) if now_local.utcoffset() else 0

        local_time_str = now_local.strftime('%I:%M %p').lstrip('0')
        local_date_str = now_local.strftime('%a, %b %d')
        local_zone_str = now_local.strftime('%Z') or 'Local'

        cities_out: List[Dict[str, Any]] = []
        for entry in self._world_clocks:
            offset_sec = int(entry.get('utcOffsetSec', 0))
            city_tz = datetime.timezone(datetime.timedelta(seconds=offset_sec))
            city_dt = now_utc.astimezone(city_tz)
            time_str = city_dt.strftime('%I:%M %p').lstrip('0')

            day_diff = (city_dt.date() - now_local.date()).days
            if day_diff == 0:
                date_label = 'Today'
            elif day_diff > 0:
                date_label = 'Tomorrow'
            else:
                date_label = 'Yesterday'

            diff_sec = offset_sec - local_offset_sec
            if diff_sec == 0:
                offset_str = f'{date_label} · Same time'
            else:
                sign = '+' if diff_sec > 0 else '-'
                abs_min = abs(diff_sec) // 60
                hrs = abs_min // 60
                mins = abs_min % 60
                if mins > 0:
                    offset_str = f'{date_label} · {sign}{hrs}:{mins:02d}h'
                else:
                    offset_str = f'{date_label} · {sign}{hrs}h'

            cities_out.append(
                {
                    'id': entry.get('id', 'clock-item'),
                    'city': entry.get('city', 'City'),
                    'country': entry.get('country', ''),
                    'timezone': entry.get('tz', 'UTC'),
                    'timeText': time_str,
                    'dateText': date_label,
                    'offsetText': offset_str,
                    'isDay': 6 <= city_dt.hour < 18,
                }
            )

        return {
            'localTimeText': local_time_str,
            'localDateText': local_date_str,
            'localZoneText': local_zone_str,
            'cities': cities_out,
        }

    # ========================================================================
    # 1. QUICK SCRATCHPAD PLUGIN
    # ========================================================================

    def _load_scratchpad(self) -> Dict[str, Any]:
        if os.path.isfile(self._scratchpad_file):
            try:
                with open(self._scratchpad_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if isinstance(data, dict) and isinstance(data.get('notes'), list) and len(data['notes']) > 0:
                    return data
            except Exception:
                pass
        default_data = {
            'activeNoteId': 'note-1',
            'notes': [
                {
                    'id': 'note-1',
                    'title': 'Quick Scratch',
                    'content': '1450 * 12\n- Ship 5 new Flank plugins\n- Review UI polish',
                    'updatedAt': 'Just now',
                },
                {
                    'id': 'note-2',
                    'title': 'Snippets',
                    'content': 'git status -sb\nnpm run build',
                    'updatedAt': 'Today',
                },
            ],
        }
        self._save_scratchpad(default_data)
        return default_data

    def _save_scratchpad(self, data: Dict[str, Any]) -> None:
        try:
            with open(self._scratchpad_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception:
            pass

    def sample_scratchpad(self) -> Dict[str, Any]:
        return self._scratchpad_data

    def scratchpad_action(self, action: str, note_id: str = '', content: str = '') -> Dict[str, Any]:
        notes: List[Dict[str, Any]] = self._scratchpad_data.get('notes', [])
        if action == 'select':
            if any(n.get('id') == note_id for n in notes):
                self._scratchpad_data['activeNoteId'] = note_id
        elif action == 'new':
            new_id = f'note-{int(time.time() * 1000)}'
            new_note = {
                'id': new_id,
                'title': f'Note {len(notes) + 1}',
                'content': '',
                'updatedAt': 'Just now',
            }
            notes.append(new_note)
            self._scratchpad_data['activeNoteId'] = new_id
        elif action == 'update':
            target_id = note_id or self._scratchpad_data.get('activeNoteId', '')
            for n in notes:
                if n.get('id') == target_id:
                    n['content'] = content
                    first_line = next((ln.strip() for ln in content.splitlines() if ln.strip()), '')
                    clean_title = first_line.lstrip('#-* ').strip()
                    n['title'] = (clean_title[:18] if clean_title else 'Untitled')
                    n['updatedAt'] = datetime.datetime.now().strftime('%I:%M %p').lstrip('0')
                    break
        elif action == 'delete':
            target_id = note_id or self._scratchpad_data.get('activeNoteId', '')
            if len(notes) > 1:
                notes = [n for n in notes if n.get('id') != target_id]
                self._scratchpad_data['notes'] = notes
                if self._scratchpad_data.get('activeNoteId') == target_id:
                    self._scratchpad_data['activeNoteId'] = notes[0]['id']
            elif len(notes) == 1:
                notes[0]['content'] = ''
                notes[0]['title'] = 'Quick Scratch'
                notes[0]['updatedAt'] = 'Just now'

        self._scratchpad_data['notes'] = notes
        self._save_scratchpad(self._scratchpad_data)
        return self.sample_scratchpad()

    # ========================================================================
    # 2. SCREEN COLOR PICKER & CONTRAST CHECKER PLUGIN
    # ========================================================================

    def _compute_color_metrics(self, hex_str: str, history: List[str]) -> Dict[str, Any]:
        h = (hex_str or '#2563EB').strip().upper()
        if not h.startswith('#'):
            h = '#' + h
        if len(h) == 4:
            h = '#' + ''.join(c * 2 for c in h[1:])
        if len(h) != 7:
            h = '#2563EB'
        try:
            r = int(h[1:3], 16)
            g = int(h[3:5], 16)
            b = int(h[5:7], 16)
        except Exception:
            h = '#2563EB'
            r, g, b = 37, 99, 235

        hue, light, sat = colorsys.rgb_to_hls(r / 255.0, g / 255.0, b / 255.0)
        h_deg = int(round(hue * 360)) % 360
        s_pct = int(round(sat * 100))
        l_pct = int(round(light * 100))

        def rel_lum(rc: int, gc: int, bc: int) -> float:
            def ch(c: int) -> float:
                v = c / 255.0
                return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
            return 0.2126 * ch(rc) + 0.7152 * ch(gc) + 0.0722 * ch(bc)

        lum = rel_lum(r, g, b)
        lum_white = 1.0
        lum_dark = rel_lum(15, 23, 42)  # #0F172A

        cw = round((max(lum, lum_white) + 0.05) / (min(lum, lum_white) + 0.05), 2)
        cd = round((max(lum, lum_dark) + 0.05) / (min(lum, lum_dark) + 0.05), 2)

        dedup_hist = [h] + [c.upper() for c in history if c.upper() != h]
        dedup_hist = dedup_hist[:8]

        return {
            'currentHex': h,
            'rgbText': f'rgb({r}, {g}, {b})',
            'hslText': f'hsl({h_deg}, {s_pct}%, {l_pct}%)',
            'cssVarText': f'--color-accent: {h.lower()};',
            'contrastWhite': cw,
            'contrastDark': cd,
            'history': dedup_hist,
        }

    def _load_colors(self) -> Dict[str, Any]:
        if os.path.isfile(self._colors_file):
            try:
                with open(self._colors_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if isinstance(data, dict) and data.get('currentHex'):
                    return self._compute_color_metrics(data['currentHex'], data.get('history', []))
            except Exception:
                pass
        default_hist = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#0F172A']
        metrics = self._compute_color_metrics('#2563EB', default_hist)
        self._save_colors(metrics)
        return metrics

    def _save_colors(self, data: Dict[str, Any]) -> None:
        try:
            with open(self._colors_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception:
            pass

    def sample_colorpicker(self) -> Dict[str, Any]:
        return self._colors_data

    def set_picked_color(self, hex_color: str) -> Dict[str, Any]:
        hist = self._colors_data.get('history', [])
        self._colors_data = self._compute_color_metrics(hex_color, hist)
        self._save_colors(self._colors_data)
        return self._colors_data

    def pick_screen_color(self) -> Dict[str, Any]:
        try:
            pt = POINT()
            user32.GetCursorPos(ctypes.byref(pt))
            hdc = user32.GetDC(0)
            if hdc:
                colorref = gdi32.GetPixel(hdc, pt.x, pt.y)
                user32.ReleaseDC(0, hdc)
                if colorref != -1 and colorref != 0xFFFFFFFF:
                    r = colorref & 0xFF
                    g = (colorref >> 8) & 0xFF
                    b = (colorref >> 16) & 0xFF
                    hex_col = f'#{r:02X}{g:02X}{b:02X}'
                    return self.set_picked_color(hex_col)
        except Exception:
            pass
        return self._colors_data

    # ========================================================================
    # 3. AGENDA & NEXT MEETING PLUGIN
    # ========================================================================

    def _load_calendar(self) -> List[Dict[str, Any]]:
        if os.path.isfile(self._calendar_file):
            try:
                with open(self._calendar_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                if isinstance(data, list):
                    return data
            except Exception:
                pass
        defaults = [
            {
                'id': 'evt-1',
                'title': 'Product Design Sync',
                'timeText': '15:00',
                'relativeText': 'Today',
                'joinUrl': 'https://meet.google.com',
                'provider': 'Google Meet',
            },
            {
                'id': 'evt-2',
                'title': 'Sprint Architecture Review',
                'timeText': '17:30',
                'relativeText': 'Today',
                'joinUrl': 'https://zoom.us',
                'provider': 'Zoom',
            },
        ]
        self._save_calendar(defaults)
        return defaults

    def _save_calendar(self, events: List[Dict[str, Any]]) -> None:
        try:
            with open(self._calendar_file, 'w', encoding='utf-8') as f:
                json.dump(events, f, indent=2)
        except Exception:
            pass

    def sample_calendar(self) -> Dict[str, Any]:
        now = datetime.datetime.now()
        today_str = now.strftime('%a, %b %d')
        enriched: List[Dict[str, Any]] = []
        next_summary = 'Free'

        for ev in self._calendar_events:
            t_str = (ev.get('timeText') or '').strip()
            rel = ev.get('relativeText') or 'Upcoming'
            # Compute live relative countdown if HH:MM format
            try:
                if ':' in t_str and len(t_str) <= 5:
                    hh, mm = [int(x) for x in t_str.split(':', 1)]
                    target = now.replace(hour=hh, minute=mm, second=0, microsecond=0)
                    diff_min = int(round((target - now).total_seconds() / 60.0))
                    if 0 <= diff_min <= 180:
                        rel = 'Now' if diff_min == 0 else f'in {diff_min}m'
                        if next_summary == 'Free':
                            next_summary = rel
                    elif diff_min > 180:
                        hrs = diff_min // 60
                        rel = f'in {hrs}h'
                        if next_summary == 'Free':
                            next_summary = t_str
                    else:
                        rel = 'Passed'
                elif next_summary == 'Free' and t_str:
                    next_summary = t_str[:6]
            except Exception:
                if next_summary == 'Free' and t_str:
                    next_summary = t_str[:6]

            join_url = (ev.get('joinUrl') or '').strip()
            provider = ev.get('provider') or ''
            if join_url and not provider:
                low = join_url.lower()
                if 'meet.google' in low:
                    provider = 'Meet'
                elif 'zoom.us' in low:
                    provider = 'Zoom'
                elif 'teams.microsoft' in low:
                    provider = 'Teams'
                else:
                    provider = 'Link'

            item = {
                'id': ev.get('id', 'evt'),
                'title': ev.get('title', 'Meeting'),
                'timeText': t_str or 'Today',
                'relativeText': rel,
            }
            if join_url:
                item['joinUrl'] = join_url
                item['provider'] = provider
            enriched.append(item)

        if next_summary == 'Free' and enriched:
            next_summary = enriched[0].get('timeText', 'Today')[:6]

        return {
            'nextSummary': next_summary,
            'todayDateText': today_str,
            'events': enriched,
        }

    def calendar_action(self, action: str, title_or_id: str = '', time_text: str = '', join_url: str = '') -> Dict[str, Any]:
        if action == 'add':
            title = (title_or_id or '').strip()
            if title:
                url = (join_url or '').strip()
                if url and not (url.startswith('http://') or url.startswith('https://')):
                    url = 'https://' + url
                new_ev = {
                    'id': f'evt-{int(time.time() * 1000)}',
                    'title': title,
                    'timeText': (time_text or '').strip() or 'Today',
                    'relativeText': 'Upcoming',
                    'joinUrl': url,
                }
                self._calendar_events.append(new_ev)
                self._save_calendar(self._calendar_events)
        elif action == 'delete':
            self._calendar_events = [e for e in self._calendar_events if e.get('id') != title_or_id]
            self._save_calendar(self._calendar_events)
        return self.sample_calendar()

    # ========================================================================
    # 4. AUDIO & MIC MIXER PLUGIN
    # ========================================================================

    def sample_audio(self) -> Dict[str, Any]:
        live = get_windows_master_volume()
        if live is not None:
            self._audio_vol = live[0]
            self._audio_muted = live[1]
        return {
            'volumePercent': self._audio_vol,
            'muted': self._audio_muted,
            'micMuted': self._audio_mic_muted,
            'outputDevice': self._audio_out_dev,
            'inputDevice': self._audio_in_dev,
        }

    def audio_control(self, action: str, value: int | None = None) -> Dict[str, Any]:
        self.sample_audio()
        try:
            if action == 'toggle-mute':
                new_mute = not self._audio_muted
                if not set_windows_master_volume(mute=new_mute):
                    user32.keybd_event(VK_VOLUME_MUTE, 0, 0, 0)
                    user32.keybd_event(VK_VOLUME_MUTE, 0, KEYEVENTF_KEYUP, 0)
                self._audio_muted = new_mute
            elif action == 'toggle-mic':
                self._audio_mic_muted = not self._audio_mic_muted
            elif action == 'vol-up':
                target = min(100, self._audio_vol + 10)
                if not set_windows_master_volume(level_percent=target, mute=False):
                    for _ in range(5):
                        user32.keybd_event(VK_VOLUME_UP, 0, 0, 0)
                        user32.keybd_event(VK_VOLUME_UP, 0, KEYEVENTF_KEYUP, 0)
                self._audio_vol = target
                self._audio_muted = False
            elif action == 'vol-down':
                target = max(0, self._audio_vol - 10)
                if not set_windows_master_volume(level_percent=target, mute=(target == 0)):
                    for _ in range(5):
                        user32.keybd_event(VK_VOLUME_DOWN, 0, 0, 0)
                        user32.keybd_event(VK_VOLUME_DOWN, 0, KEYEVENTF_KEYUP, 0)
                self._audio_vol = target
                self._audio_muted = (target == 0)
            elif action == 'set' and value is not None:
                target = max(0, min(100, int(value)))
                is_mute = (target == 0)
                if not set_windows_master_volume(level_percent=target, mute=is_mute):
                    diff = target - self._audio_vol
                    steps = min(25, abs(diff) // 2)
                    vk = VK_VOLUME_UP if diff > 0 else VK_VOLUME_DOWN
                    for _ in range(steps):
                        user32.keybd_event(vk, 0, 0, 0)
                        user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, 0)
                self._audio_vol = target
                self._audio_muted = is_mute
        except Exception:
            pass
        return self.sample_audio()

    # ========================================================================
    # 5. NETWORK & DEV PORT INSPECTOR PLUGIN
    # ========================================================================

    def sample_network(self, force: bool = False) -> Dict[str, Any]:
        now = time.time()
        if not force and self._network_cache is not None and (now - self._last_network_scan_ts < 8.0):
            self._network_cache['downMbps'] = round((self._down_bps * 8.0) / 1_000_000.0, 1)
            self._network_cache['upMbps'] = round((self._up_bps * 8.0) / 1_000_000.0, 1)
            return self._network_cache

        self._last_network_scan_ts = now

        # 1. Local IPv4
        local_ip = '127.0.0.1'
        connected = True
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(0.5)
            s.connect(('8.8.8.8', 80))
            local_ip = s.getsockname()[0]
            s.close()
        except Exception:
            try:
                local_ip = socket.gethostbyname(socket.gethostname())
            except Exception:
                connected = False

        # 2. Wi-Fi SSID
        ssid = 'Ethernet / LAN'
        try:
            res = subprocess.run(
                ['netsh', 'wlan', 'show', 'interfaces'],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=1.5,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout:
                for line in res.stdout.splitlines():
                    if 'SSID' in line and 'BSSID' not in line and ':' in line:
                        val = line.split(':', 1)[1].strip()
                        if val:
                            ssid = val
                            break
        except Exception:
            pass

        # 3. Listening dev ports via netstat -ano -p tcp
        dev_ports_set = {
            80, 443, 1420, 3000, 3001, 3002, 4000, 4200, 4321,
            5000, 5001, 5173, 5174, 5432, 6379, 7000, 8000, 8080,
            8081, 8443, 8888, 9000, 9229, 27017,
        }
        ports_list: List[Dict[str, Any]] = []
        seen_ports: set[int] = set()

        try:
            proc_map: Dict[int, str] = {}
            tl = subprocess.run(
                ['tasklist', '/FO', 'CSV', '/NH'],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=1.8,
                creationflags=0x08000000,
            )
            if tl.returncode == 0 and tl.stdout:
                for line in tl.stdout.splitlines():
                    parts = [p.strip('"') for p in line.split('","')]
                    if len(parts) >= 2 and parts[1].isdigit():
                        proc_map[int(parts[1])] = parts[0]

            ns = subprocess.run(
                ['netstat', '-ano', '-p', 'tcp'],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=1.8,
                creationflags=0x08000000,
            )
            if ns.returncode == 0 and ns.stdout:
                for line in ns.stdout.splitlines():
                    if 'LISTENING' not in line:
                        continue
                    cols = line.split()
                    if len(cols) < 5:
                        continue
                    local_addr = cols[1]
                    pid_str = cols[4]
                    if ':' not in local_addr or not pid_str.isdigit():
                        continue
                    port_str = local_addr.rsplit(':', 1)[-1]
                    if not port_str.isdigit():
                        continue
                    port_num = int(port_str)
                    if port_num in seen_ports:
                        continue
                    pid_num = int(pid_str)
                    pname = proc_map.get(pid_num, 'process')
                    low_pname = pname.lower()
                    is_dev_proc = any(
                        k in low_pname
                        for k in ('node', 'python', 'deno', 'bun', 'go', 'ruby', 'java', 'dotnet', 'cargo', 'vite', 'next', 'php', 'docker')
                    )
                    if port_num in dev_ports_set or (is_dev_proc and 1024 <= port_num <= 65535):
                        seen_ports.add(port_num)
                        ports_list.append(
                            {
                                'port': port_num,
                                'pid': pid_num,
                                'processName': pname.replace('.exe', ''),
                                'url': f'http://localhost:{port_num}',
                            }
                        )
        except Exception:
            pass

        ports_list.sort(key=lambda x: x['port'])
        ports_list = ports_list[:6]

        self._network_cache = {
            'connected': connected,
            'ssid': ssid,
            'localIp': local_ip,
            'pingMs': 14 if connected else 0,
            'downMbps': round((self._down_bps * 8.0) / 1_000_000.0, 1),
            'upMbps': round((self._up_bps * 8.0) / 1_000_000.0, 1),
            'ports': ports_list,
        }
        return self._network_cache

    def network_action(self, action: str, pid: int = 0) -> Dict[str, Any]:
        if action == 'kill' and pid > 0:
            try:
                subprocess.run(
                    ['taskkill', '/F', '/PID', str(int(pid))],
                    capture_output=True,
                    timeout=2.0,
                    creationflags=0x08000000,
                )
            except Exception:
                pass
        return self.sample_network(force=True)

    # ========================================================================
    # 6. PROCESS MONITOR & TOP PROCESSES
    # ========================================================================

    def sample_top_processes(self, limit: int = 30) -> List[Dict[str, Any]]:
        hSnapshot = kernel32.CreateToolhelp32Snapshot(0x00000002, 0)
        if not hSnapshot or hSnapshot == -1:
            return []
        pe = PROCESSENTRY32W()
        pe.dwSize = ctypes.sizeof(PROCESSENTRY32W)
        processes: List[Dict[str, Any]] = []
        try:
            if kernel32.Process32FirstW(hSnapshot, ctypes.byref(pe)):
                while True:
                    pid = pe.th32ProcessID
                    name = pe.szExeFile
                    threads = pe.cntThreads
                    mem_mb = 0.0
                    hProcess = kernel32.OpenProcess(0x1000 | 0x0400, False, pid)
                    if hProcess:
                        pmc = PROCESS_MEMORY_COUNTERS_EX()
                        pmc.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS_EX)
                        if psapi.GetProcessMemoryInfo(hProcess, ctypes.byref(pmc), pmc.cb):
                            mem_mb = round(pmc.WorkingSetSize / (1024.0 * 1024.0), 1)
                        kernel32.CloseHandle(hProcess)
                    processes.append({
                        'pid': pid,
                        'name': name,
                        'memMb': mem_mb,
                        'threads': threads,
                    })
                    if not kernel32.Process32NextW(hSnapshot, ctypes.byref(pe)):
                        break
        finally:
            kernel32.CloseHandle(hSnapshot)
        return sorted(processes, key=lambda p: p['memMb'], reverse=True)[:limit]

    # ========================================================================
    # 7. BLUETOOTH & PERIPHERAL QUICK HUB
    # ========================================================================

    def sample_bluetooth(self) -> Dict[str, Any]:
        now = time.time()
        if hasattr(self, '_bluetooth_cache') and self._bluetooth_cache and (now - getattr(self, '_bluetooth_last_scan', 0) < 12.0):
            return self._bluetooth_cache

        devices: List[Dict[str, Any]] = []
        try:
            peri_file = os.path.join(self.app_data_dir, 'peripherals_state.json')
            if os.path.isfile(peri_file):
                with open(peri_file, 'r', encoding='utf-8') as f:
                    pdata = json.load(f)
                if isinstance(pdata, dict):
                    if 'mouse' in pdata and isinstance(pdata['mouse'], dict):
                        m = pdata['mouse']
                        devices.append({
                            'id': m.get('id', 'mouse-1'),
                            'name': m.get('name', 'Dragonfly R1 Pro'),
                            'type': 'mouse',
                            'connected': m.get('connected', True),
                            'batteryLevel': m.get('level', 85),
                        })
                    if 'keyboard' in pdata and isinstance(pdata['keyboard'], dict):
                        k = pdata['keyboard']
                        devices.append({
                            'id': k.get('id', 'keyboard-1'),
                            'name': k.get('name', 'CIDOO URX Core 75'),
                            'type': 'keyboard',
                            'connected': k.get('connected', True),
                            'batteryLevel': k.get('level', 85),
                        })

            ps_cmd = 'Get-PnpDevice -Class Bluetooth -Status OK | Select-Object FriendlyName, InstanceId | ConvertTo-Json'
            res = subprocess.run(['powershell', '-NoProfile', '-Command', ps_cmd], capture_output=True, text=True, creationflags=0x08000000)
            if res.stdout.strip():
                items = json.loads(res.stdout)
                if isinstance(items, dict):
                    items = [items]
                seen_names = {d['name'].lower() for d in devices}

                # Helper to accurately check if Bluetooth device is actively connected via DEVPKEY_Device_IsConnected
                cfgmgr32 = ctypes.windll.cfgmgr32
                class DEVPROPKEY(ctypes.Structure):
                    _fields_ = [('fmtid', ctypes.c_byte * 16), ('pid', wintypes.ULONG)]
                
                # DEVPKEY_Device_IsConnected: {83da6326-97a6-4088-9453-a1923f573b29}, 15
                u_conn = uuid.UUID('{83da6326-97a6-4088-9453-a1923f573b29}')
                key_conn = DEVPROPKEY()
                key_conn.fmtid = (ctypes.c_byte * 16)(*u_conn.bytes_le)
                key_conn.pid = 15

                def is_device_connected(instance_id: str) -> bool:
                    try:
                        devnode = wintypes.DWORD()
                        ret = cfgmgr32.CM_Locate_DevNodeW(ctypes.byref(devnode), instance_id, 0)
                        if ret != 0:
                            return False
                        proptype = wintypes.ULONG()
                        buf = (ctypes.c_byte * 256)()
                        bufsize = wintypes.ULONG(256)
                        ret = cfgmgr32.CM_Get_DevNode_PropertyW(
                            devnode,
                            ctypes.byref(key_conn),
                            ctypes.byref(proptype),
                            buf,
                            ctypes.byref(bufsize),
                            0
                        )
                        if ret == 0 and bufsize.value > 0:
                            return buf[0] != 0
                    except Exception:
                        pass
                    return False

                for it in items:
                    fname = (it.get('FriendlyName') or '').strip()
                    iid = it.get('InstanceId') or ''
                    if not fname or any(skip in fname.lower() for skip in ['transport', 'service', 'enumerator', 'generic', 'protocol', 'adapter', 'le device']):
                        continue
                    if fname.lower() in seen_names:
                        continue
                    seen_names.add(fname.lower())
                    dev_type = 'device'
                    fl = fname.lower()
                    if any(w in fl for w in ['headphones', 'buds', 'airpods', 'soundcore', 'wh-', 'headset', 'audio', 'q10']):
                        dev_type = 'headphones'
                    elif any(w in fl for w in ['mouse', 'orochi']):
                        dev_type = 'mouse'
                    elif any(w in fl for w in ['keyboard']):
                        dev_type = 'keyboard'
                    elif any(w in fl for w in ['controller', 'xbox', 'dualsense']):
                        dev_type = 'controller'
                    
                    is_conn = is_device_connected(iid)
                    devices.append({
                        'id': iid or f'bt-{len(devices)}',
                        'name': fname,
                        'type': dev_type,
                        'connected': is_conn,
                        'batteryLevel': 90 if (is_conn and dev_type == 'headphones') else None,
                    })
        except Exception:
            pass

        if not devices:
            devices = [
                {'id': 'cidoo', 'name': 'CIDOO URX Core 75', 'type': 'keyboard', 'connected': True, 'batteryLevel': 76},
                {'id': 'dragonfly', 'name': 'Dragonfly R1 Pro', 'type': 'mouse', 'connected': True, 'batteryLevel': 85},
            ]

        connected_count = sum(1 for d in devices if d.get('connected'))
        self._bluetooth_cache = {
            'connectedCount': connected_count,
            'devices': devices,
        }
        self._bluetooth_last_scan = now
        return self._bluetooth_cache

    # ========================================================================
    # 8. TASKS & TO-DO
    # ========================================================================

    def sample_tasks(self) -> Dict[str, Any]:
        tasks = []
        if os.path.isfile(self._tasks_file):
            try:
                with open(self._tasks_file, 'r', encoding='utf-8') as f:
                    tasks = json.load(f)
            except Exception:
                pass
        if not tasks:
            tasks = [
                {'id': 'task-1', 'text': 'Review pull request for telemetry pipeline', 'done': False, 'createdAt': '10:30 AM'},
                {'id': 'task-2', 'text': 'Prepare release notes for Flank v1.1', 'done': False, 'createdAt': '11:15 AM'},
                {'id': 'task-3', 'text': 'Sync meeting with design team', 'done': True, 'createdAt': '09:00 AM'},
                {'id': 'task-4', 'text': 'Benchmark liquid glass blur performance', 'done': False, 'createdAt': '01:45 PM'},
            ]
        pending = sum(1 for t in tasks if not t.get('done'))
        return {'items': tasks, 'pendingCount': pending}

    def tasks_action(self, action: str, param: str = '') -> Dict[str, Any]:
        cur = self.sample_tasks()
        items = cur.get('items', [])
        if action == 'add' and param:
            new_item = {
                'id': f'task-{int(time.time() * 1000)}',
                'text': param.strip(),
                'done': False,
                'createdAt': 'Just now',
            }
            items.insert(0, new_item)
        elif action == 'toggle' and param:
            for it in items:
                if it.get('id') == param:
                    it['done'] = not it.get('done', False)
                    break
        elif action == 'delete' and param:
            items = [it for it in items if it.get('id') != param]
        elif action == 'clear_completed':
            items = [it for it in items if not it.get('done')]

        try:
            with open(self._tasks_file, 'w', encoding='utf-8') as f:
                json.dump(items, f, indent=2)
        except Exception:
            pass
        return self.sample_tasks()

    # ========================================================================
    # 9. SMART CALCULATOR
    # ========================================================================

    def sample_calculator(self) -> Dict[str, Any]:
        return {
            'lastExpr': '120 * 1.18',
            'lastResult': '141.6',
            'history': [
                {'expr': '120 * 1.18', 'result': '141.6'},
                {'expr': '16 GB to MB', 'result': '16,384 MB'},
                {'expr': 'sqrt(256) * 4', 'result': '64'},
            ],
        }

    # ========================================================================
    # 10. DAILY HABITS & HYDRATION
    # ========================================================================

    def sample_habits(self) -> Dict[str, Any]:
        data = {'waterGlasses': 5, 'waterGoal': 8, 'lastStretchMin': 22, 'streakDays': 4}
        if os.path.isfile(self._habits_file):
            try:
                with open(self._habits_file, 'r', encoding='utf-8') as f:
                    saved = json.load(f)
                if isinstance(saved, dict):
                    data.update(saved)
            except Exception:
                pass
        return data

    def habits_action(self, action: str, val: int = 1) -> Dict[str, Any]:
        cur = self.sample_habits()
        if action == 'add_water':
            cur['waterGlasses'] = min(20, cur.get('waterGlasses', 0) + val)
        elif action == 'sub_water':
            cur['waterGlasses'] = max(0, cur.get('waterGlasses', 0) - val)
        elif action == 'log_stretch':
            cur['lastStretchMin'] = 0

        try:
            with open(self._habits_file, 'w', encoding='utf-8') as f:
                json.dump(cur, f, indent=2)
        except Exception:
            pass
        return cur

    # ========================================================================
    # 11. STORAGE & DRIVES
    # ========================================================================

    def sample_storage(self) -> Dict[str, Any]:
        now = time.time()
        if self._storage_cache and (now - self._last_storage_scan < 10.0):
            return self._storage_cache

        import shutil
        drives = []
        primary_pct = 68
        try:
            bitmask = kernel32.GetLogicalDrives()
            for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
                if bitmask & 1:
                    path = f'{letter}:\\\\'
                    dtype = kernel32.GetDriveTypeW(path)
                    if dtype in (2, 3):  # Removable or Fixed
                        try:
                            usage = shutil.disk_usage(path)
                            pct = round(((usage.total - usage.free) / usage.total) * 100) if usage.total > 0 else 0
                            if letter == 'C':
                                primary_pct = pct
                            drives.append({
                                'letter': f'{letter}:',
                                'label': 'Windows' if letter == 'C' else 'Volume',
                                'type': 'SSD / NVMe' if dtype == 3 else 'Removable',
                                'usedGb': round((usage.total - usage.free) / (1024 ** 3), 1),
                                'totalGb': round(usage.total / (1024 ** 3), 1),
                                'freeGb': round(usage.free / (1024 ** 3), 1),
                                'percent': pct,
                            })
                        except Exception:
                            pass
                bitmask >>= 1
        except Exception:
            pass

        if not drives:
            drives = [
                {'letter': 'C:', 'label': 'Windows', 'type': 'SSD / NVMe', 'usedGb': 340, 'totalGb': 500, 'freeGb': 160, 'percent': 68}
            ]

        self._storage_cache = {
            'primaryPercent': primary_pct,
            'primaryDrive': 'C:',
            'drives': drives,
        }
        self._last_storage_scan = now
        return self._storage_cache

    def open_drive(self, drive_letter: str) -> bool:
        try:
            letter = (drive_letter or 'C:').strip()
            if not letter.endswith('\\'):
                letter += '\\'
            subprocess.Popen(['explorer.exe', letter])
            return True
        except Exception:
            return False

    def launch_disk_cleanup(self) -> bool:
        try:
            subprocess.Popen(['cleanmgr.exe'])
            return True
        except Exception:
            return False

    # ========================================================================
    # 12. DISPLAY & BRIGHTNESS
    # ========================================================================

    def sample_display(self) -> Dict[str, Any]:
        now = time.time()
        if self._display_cache and (now - self._last_display_scan < 8.0):
            return self._display_cache

        brightness = 85
        try:
            ps = 'Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightness -ErrorAction SilentlyContinue | Select-Object -ExpandProperty CurrentBrightness'
            res = subprocess.run(
                ['powershell', '-NoProfile', '-NonInteractive', '-Command', ps],
                capture_output=True,
                text=True,
                timeout=2.0,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout.strip().isdigit():
                brightness = int(res.stdout.strip())
        except Exception:
            pass

        sw = user32.GetSystemMetrics(0) or 1920
        sh = user32.GetSystemMetrics(1) or 1080

        self._display_cache = {
            'brightness': brightness,
            'nightLight': False,
            'resolution': f'{sw} × {sh}',
            'refreshRate': 144,
            'scaling': 100,
        }
        self._last_display_scan = now
        return self._display_cache

    def set_brightness(self, val: int) -> Dict[str, Any]:
        val = max(10, min(100, int(val)))
        if self._display_cache:
            self._display_cache['brightness'] = val
        try:
            ps = f'(Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightnessMethods).WmiSetBrightness(1, {val})'
            subprocess.Popen(
                ['powershell', '-NoProfile', '-NonInteractive', '-Command', ps],
                creationflags=0x08000000,
            )
        except Exception:
            pass
        return self.sample_display()

    def toggle_night_light(self) -> Dict[str, Any]:
        try:
            subprocess.Popen(['explorer.exe', 'ms-settings:nightlight'])
        except Exception:
            pass
        return self.sample_display()

    # ========================================================================
    # 13. PRIVACY GUARD
    # ========================================================================

    def sample_privacy(self) -> Dict[str, Any]:
        mic_active = False
        camera_active = False
        active_apps = []

        import winreg
        try:
            key_path = r'Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\microphone\NonPackaged'
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, key_path) as k:
                subcount, _, _ = winreg.QueryInfoKey(k)
                for i in range(subcount):
                    sub = winreg.EnumKey(k, i)
                    with winreg.OpenKey(k, sub) as sk:
                        try:
                            stop, _ = winreg.QueryValueEx(sk, 'LastUsedTimeStop')
                            if stop == 0:
                                mic_active = True
                                app_name = sub.split('#')[-1].replace('.exe', '')
                                active_apps.append(app_name)
                        except Exception:
                            pass
        except Exception:
            pass

        return {
            'micActive': mic_active,
            'cameraActive': camera_active,
            'micMuted': self._audio_mic_muted,
            'activeApps': active_apps,
        }

    def toggle_mic_mute(self) -> Dict[str, Any]:
        self._audio_mic_muted = not self._audio_mic_muted
        return self.sample_privacy()

    # ========================================================================
    # 14. FOCUS AMBIANCE
    # ========================================================================

    def sample_ambient(self) -> Dict[str, Any]:
        return {
            'playing': False,
            'sound': 'rain',
            'volume': 65,
        }

    # ========================================================================
    # 15. COMMAND RUNNER
    # ========================================================================

    def sample_runner(self) -> Dict[str, Any]:
        return {
            'running': bool(self._runner_running),
            'lastCmd': self._runner_last_cmd or 'ipconfig /flushdns',
            'lastOutput': self._runner_last_output or 'Ready to execute commands.',
            'commands': [
                {'id': 'flushdns', 'name': 'Flush DNS', 'cmd': 'ipconfig /flushdns', 'desc': 'Clear local DNS cache'},
                {'id': 'killnode', 'name': 'Kill Node.js', 'cmd': 'taskkill /F /IM node.exe', 'desc': 'Stop running dev servers'},
                {'id': 'pinggoogle', 'name': 'Ping 8.8.8.8', 'cmd': 'ping -n 4 8.8.8.8', 'desc': 'Check network gateway latency'},
                {'id': 'gitfetch', 'name': 'Git Fetch All', 'cmd': 'git fetch --all --prune', 'desc': 'Fetch latest remote branches'},
            ],
        }

    def execute_runner_command(self, cmd: str) -> Dict[str, Any]:
        cmd = (cmd or '').strip()
        if not cmd:
            return self.sample_runner()

        # If already running a process, terminate it first
        if self._current_runner_proc and self._current_runner_proc.poll() is None:
            self.terminate_runner_command()

        self._runner_last_cmd = cmd
        self._runner_running = True
        self._runner_last_output = f'Running: {cmd}...\n'

        def _worker():
            try:
                proc = subprocess.Popen(
                    cmd,
                    shell=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    creationflags=0x08000000,
                )
                self._current_runner_proc = proc
                out, _ = proc.communicate(timeout=30.0)
                if not (self._runner_last_output and '[Command terminated' in self._runner_last_output):
                    self._runner_last_output = (out or '').strip() or f'Command completed with exit code {proc.returncode}.'
            except subprocess.TimeoutExpired:
                try:
                    subprocess.run(['taskkill', '/F', '/T', '/PID', str(proc.pid)], check=False, creationflags=0x08000000)
                    proc.kill()
                except Exception:
                    pass
                self._runner_last_output = 'Command timed out after 30 seconds.'
            except Exception as e:
                self._runner_last_output = f'Error executing command: {e}'
            finally:
                self._runner_running = False
                self._current_runner_proc = None

        threading.Thread(target=_worker, daemon=True).start()
        return self.sample_runner()

    def terminate_runner_command(self) -> Dict[str, Any]:
        if self._current_runner_proc and self._current_runner_proc.poll() is None:
            try:
                subprocess.run(['taskkill', '/F', '/T', '/PID', str(self._current_runner_proc.pid)], check=False, creationflags=0x08000000)
                self._current_runner_proc.kill()
            except Exception:
                pass
            self._runner_last_output = (self._runner_last_output + '\n[Command terminated by user]').strip()
        self._runner_running = False
        self._current_runner_proc = None
        return self.sample_runner()

    # ========================================================================
    # 16. GPU & GRAPHICS
    # ========================================================================

    def sample_gpu(self) -> Dict[str, Any]:
        now = time.time()
        if self._gpu_cache and (now - self._last_gpu_scan < 3.0):
            return self._gpu_cache

        name = 'Graphics Processor'
        util = 25
        temp = 52
        vram_used = 2.5
        vram_total = 6.0
        driver = 'DirectX 12'

        try:
            res = subprocess.run(
                ['nvidia-smi', '--query-gpu=name,utilization.gpu,temperature.gpu,memory.used,memory.total,driver_version', '--format=csv,noheader,nounits'],
                capture_output=True,
                text=True,
                timeout=2.0,
                creationflags=0x08000000,
            )
            if res.returncode == 0 and res.stdout.strip():
                parts = [p.strip() for p in res.stdout.strip().split(',')]
                if len(parts) >= 5:
                    name = parts[0]
                    util = int(float(parts[1]))
                    temp = int(float(parts[2]))
                    vram_used = round(float(parts[3]) / 1024.0, 1)
                    vram_total = round(float(parts[4]) / 1024.0, 1)
                    if len(parts) >= 6:
                        driver = f'NVIDIA {parts[5]}'
        except Exception:
            pass

        self._gpu_cache = {
            'name': name,
            'utilizationPercent': util,
            'tempC': temp,
            'vramUsedGb': vram_used,
            'vramTotalGb': vram_total,
            'driverVersion': driver,
        }
        self._last_gpu_scan = now
        return self._gpu_cache

    # ========================================================================
    # 17. GITHUB ACTIVITY
    # ========================================================================

    def set_github_token(self, token: str) -> Dict[str, Any]:
        self._github_token = (token or '').strip()
        self._last_github_fetch = 0.0
        self._github_cache = {}
        return self.sample_github()

    def sample_github(self) -> Dict[str, Any]:
        token = (self._github_token or '').strip()
        if not token:
            return {
                'username': '',
                'connected': False,
                'pendingCount': 0,
                'items': [],
            }

        now = time.time()
        if self._github_cache and (now - self._last_github_fetch < 30.0):
            return self._github_cache

        import urllib.request
        import urllib.parse
        headers = {
            'Authorization': f'Bearer {token}',
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'Flank-Desktop/1.0',
        }

        try:
            req_user = urllib.request.Request('https://api.github.com/user', headers=headers)
            with urllib.request.urlopen(req_user, timeout=5.0) as resp:
                user_data = json.loads(resp.read().decode('utf-8'))
                username = user_data.get('login', 'User')

            items = []
            # 1. Check unread notifications
            try:
                req_notif = urllib.request.Request('https://api.github.com/notifications?per_page=10', headers=headers)
                with urllib.request.urlopen(req_notif, timeout=5.0) as resp:
                    notifs = json.loads(resp.read().decode('utf-8'))
                    for n in notifs[:6]:
                        subject = n.get('subject', {})
                        repo = n.get('repository', {}).get('name', 'Repo')
                        ntype = subject.get('type', 'pr').lower()
                        items.append({
                            'id': str(n.get('id', '')),
                            'title': subject.get('title', 'Notification'),
                            'repo': repo,
                            'type': 'pr' if 'pull' in ntype else 'mention' if 'mention' in n.get('reason', '') else 'issue',
                            'url': subject.get('html_url') or f"https://github.com/{n.get('repository', {}).get('full_name', '')}",
                            'status': n.get('reason', 'Notification').replace('_', ' ').capitalize(),
                        })
            except Exception:
                pass

            # 2. If notifications are empty, query open PRs authored by user
            if not items:
                try:
                    q = urllib.parse.quote(f'is:pr is:open author:{username}')
                    req_prs = urllib.request.Request(f'https://api.github.com/search/issues?q={q}&per_page=5', headers=headers)
                    with urllib.request.urlopen(req_prs, timeout=5.0) as resp:
                        search_res = json.loads(resp.read().decode('utf-8'))
                        for issue in search_res.get('items', [])[:5]:
                            repo_name = issue.get('repository_url', '').split('/')[-1] or 'Repo'
                            items.append({
                                'id': str(issue.get('id', '')),
                                'title': issue.get('title', 'Pull Request'),
                                'repo': repo_name,
                                'type': 'pr',
                                'url': issue.get('html_url', ''),
                                'status': 'Open PR',
                            })
                except Exception:
                    pass

            self._github_cache = {
                'username': username,
                'connected': True,
                'pendingCount': len(items),
                'items': items,
            }
            self._last_github_fetch = now
            return self._github_cache
        except Exception as e:
            if self._github_cache:
                return self._github_cache
            return {
                'username': '',
                'connected': False,
                'pendingCount': 0,
                'items': [],
                'error': str(e),
            }



