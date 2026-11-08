import os
import shutil
import subprocess
import sys
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
BUILD_DIR = os.path.join(ROOT_DIR, 'build')
ASSETS_DIR = os.path.join(ROOT_DIR, 'assets')
ICON_PATH = os.path.join(ASSETS_DIR, 'brand', 'flank.ico')

INSTALLER_STUB = r'''import ctypes
import os
import shutil
import subprocess
import sys
import winreg
import zipfile

MB_OK = 0x00000000
MB_YESNO = 0x00000004
MB_ICONINFORMATION = 0x00000040
IDYES = 6


def get_payload_zip() -> str:
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, 'Flank-payload.zip')
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Flank-payload.zip')


def create_shortcut(target_exe: str, shortcut_path: str, work_dir: str, description: str) -> None:
    ps_cmd = (
        f"$ws = New-Object -ComObject WScript.Shell; "
        f"$s = $ws.CreateShortcut('{shortcut_path}'); "
        f"$s.TargetPath = '{target_exe}'; "
        f"$s.WorkingDirectory = '{work_dir}'; "
        f"$s.Description = '{description}'; "
        f"$s.Save()"
    )
    subprocess.run(
        ['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', ps_cmd],
        creationflags=0x08000000,
        check=False,
    )


def register_uninstaller(install_dir: str, exe_path: str) -> None:
    try:
        key_path = r'Software\Microsoft\Windows\CurrentVersion\Uninstall\Flank'
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path) as key:
            winreg.SetValueEx(key, 'DisplayName', 0, winreg.REG_SZ, 'Flank — A Second Dock for Windows')
            winreg.SetValueEx(key, 'DisplayVersion', 0, winreg.REG_SZ, '1.0.0')
            winreg.SetValueEx(key, 'Publisher', 0, winreg.REG_SZ, 'Flank Desktop')
            winreg.SetValueEx(key, 'DisplayIcon', 0, winreg.REG_SZ, exe_path)
            winreg.SetValueEx(key, 'InstallLocation', 0, winreg.REG_SZ, install_dir)
            uninst_cmd = f'"{ os.path.join(install_dir, "Flank-Setup.exe") }" --uninstall'
            winreg.SetValueEx(key, 'UninstallString', 0, winreg.REG_SZ, uninst_cmd)
            winreg.SetValueEx(key, 'NoModify', 0, winreg.REG_DWORD, 1)
            winreg.SetValueEx(key, 'NoRepair', 0, winreg.REG_DWORD, 1)
    except Exception:
        pass


def uninstall_flank(silent: bool) -> None:
    install_dir = os.path.join(os.environ.get('LOCALAPPDATA', os.path.expanduser('~')), 'Programs', 'Flank')
    subprocess.run(['taskkill', '/F', '/IM', 'Flank.exe'], creationflags=0x08000000, check=False)

    start_menu_lnk = os.path.join(
        os.environ.get('APPDATA', ''),
        r'Microsoft\Windows\Start Menu\Programs\Flank.lnk',
    )
    desktop_lnk = os.path.join(os.path.expanduser('~'), 'Desktop', 'Flank.lnk')
    for lnk in (start_menu_lnk, desktop_lnk):
        if os.path.isfile(lnk):
            try:
                os.remove(lnk)
            except Exception:
                pass

    try:
        winreg.DeleteKey(winreg.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\CurrentVersion\Uninstall\Flank')
    except Exception:
        pass

    try:
        with winreg.OpenKey(
            winreg.HKEY_CURRENT_USER,
            r'Software\Microsoft\Windows\CurrentVersion\Run',
            0,
            winreg.KEY_SET_VALUE,
        ) as rk:
            winreg.DeleteValue(rk, 'Flank')
    except Exception:
        pass

    if not silent:
        ctypes.windll.user32.MessageBoxW(
            0,
            'Flank has been uninstalled from your system.',
            'Flank Uninstaller',
            MB_OK | MB_ICONINFORMATION,
        )


def install_flank(silent: bool, no_launch: bool) -> None:
    install_dir = os.path.join(os.environ.get('LOCALAPPDATA', os.path.expanduser('~')), 'Programs', 'Flank')
    subprocess.run(['taskkill', '/F', '/IM', 'Flank.exe'], creationflags=0x08000000, check=False)
    import time
    time.sleep(0.5)

    if os.path.isdir(install_dir):
        shutil.rmtree(install_dir, ignore_errors=True)
    os.makedirs(install_dir, exist_ok=True)

    payload_zip = get_payload_zip()
    with zipfile.ZipFile(payload_zip, 'r') as zf:
        zf.extractall(install_dir)

    # Copy installer binary for future uninstall support
    if getattr(sys, 'frozen', False):
        try:
            shutil.copy2(sys.executable, os.path.join(install_dir, 'Flank-Setup.exe'))
        except Exception:
            pass

    exe_path = os.path.join(install_dir, 'Flank.exe')
    start_menu_lnk = os.path.join(
        os.environ.get('APPDATA', ''),
        r'Microsoft\Windows\Start Menu\Programs\Flank.lnk',
    )
    desktop_lnk = os.path.join(os.path.expanduser('~'), 'Desktop', 'Flank.lnk')

    create_shortcut(exe_path, start_menu_lnk, install_dir, 'Flank — A Second Dock for Windows')
    create_shortcut(exe_path, desktop_lnk, install_dir, 'Flank — A Second Dock for Windows')
    register_uninstaller(install_dir, exe_path)

    clean_env = os.environ.copy()
    clean_env.pop('_MEIPASS2', None)

    if silent:
        if not no_launch and os.path.isfile(exe_path):
            subprocess.Popen([exe_path], cwd=install_dir, env=clean_env)
        return

    ans = ctypes.windll.user32.MessageBoxW(
        0,
        f'Flank has been installed to:\n{install_dir}\n\nShortcuts were added to your Desktop and Start Menu.\n\nWould you like to launch Flank now?',
        'Flank Setup Complete',
        MB_YESNO | MB_ICONINFORMATION,
    )
    if ans == IDYES and os.path.isfile(exe_path):
        subprocess.Popen([exe_path], cwd=install_dir, env=clean_env)


if __name__ == '__main__':
    args = [a.lower() for a in sys.argv[1:]]
    is_silent = '--silent' in args or '/s' in args
    no_launch = '--no-launch' in args
    if '--uninstall' in args:
        uninstall_flank(is_silent)
    else:
        install_flank(is_silent, no_launch)
'''


def build() -> None:
    # 1. Ensure UI bundle and icon exist
    print('=== Step 1: Building UI bundle ===')
    subprocess.run(['npm', 'run', 'build:ui'], cwd=ROOT_DIR, shell=True, check=True)
    subprocess.run([sys.executable, os.path.join(ROOT_DIR, 'scripts', 'generate_icon.py')], check=True)

    # 2. Build standalone Flank.exe directory bundle via PyInstaller
    print('=== Step 2: Building standalone Flank.exe ===')
    public_src = os.path.join(ROOT_DIR, 'public')
    themes_src = os.path.join(ROOT_DIR, 'themes')
    host_dir = os.path.join(ROOT_DIR, 'host')
    main_py = os.path.join(host_dir, 'main.py')

    pyi_cmd = [
        sys.executable,
        '-m',
        'PyInstaller',
        '--noconfirm',
        '--clean',
        '--onedir',
        '--noconsole',
        '--name',
        'Flank',
        '--icon',
        ICON_PATH,
        '--paths',
        host_dir,
        '--add-data',
        f'{public_src};public',
        '--add-data',
        f'{ASSETS_DIR};assets',
        '--add-data',
        f'{themes_src};themes',
        '--hidden-import',
        'clipboard_service',
        '--hidden-import',
        'providers',
        '--hidden-import',
        'wallpaper',
        '--exclude-module',
        'PyQt5',
        '--exclude-module',
        'PyQt6',
        '--exclude-module',
        'PySide2',
        '--exclude-module',
        'PySide6',
        '--exclude-module',
        'qtpy',
        '--exclude-module',
        'tkinter',
        main_py,
    ]
    subprocess.run(pyi_cmd, cwd=ROOT_DIR, check=True)

    flank_dist_dir = os.path.join(DIST_DIR, 'Flank')
    flank_exe = os.path.join(flank_dist_dir, 'Flank.exe')
    if not os.path.isfile(flank_exe):
        raise RuntimeError(f'Expected {flank_exe} was not created.')

    # 3. Zip dist/Flank into build/Flank-payload.zip for self-extracting installer
    print('=== Step 3: Creating Flank-Setup.exe Windows Installer ===')
    os.makedirs(BUILD_DIR, exist_ok=True)
    payload_zip = os.path.join(BUILD_DIR, 'Flank-payload.zip')
    with zipfile.ZipFile(payload_zip, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for root, _, files in os.walk(flank_dist_dir):
            for file in files:
                abs_p = os.path.join(root, file)
                rel_p = os.path.relpath(abs_p, flank_dist_dir)
                zf.write(abs_p, rel_p)

    installer_py = os.path.join(BUILD_DIR, 'flank_installer_stub.py')
    with open(installer_py, 'w', encoding='utf-8') as f:
        f.write(INSTALLER_STUB)

    setup_cmd = [
        sys.executable,
        '-m',
        'PyInstaller',
        '--noconfirm',
        '--clean',
        '--onefile',
        '--noconsole',
        '--name',
        'Flank-Setup',
        '--icon',
        ICON_PATH,
        '--add-data',
        f'{payload_zip};.',
        installer_py,
    ]
    subprocess.run(setup_cmd, cwd=ROOT_DIR, check=True)

    setup_exe = os.path.join(DIST_DIR, 'Flank-Setup.exe')
    if not os.path.isfile(setup_exe):
        raise RuntimeError(f'Expected {setup_exe} was not created.')

    print('=== Packaging Complete ===')
    print(f'Standalone App : {flank_exe}')
    print(f'Windows Setup  : {setup_exe}')


if __name__ == '__main__':
    build()

