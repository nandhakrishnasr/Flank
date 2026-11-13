import json
import os
import shutil
import subprocess
import sys
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
BUILD_DIR = os.path.join(ROOT_DIR, 'build')
ASSETS_DIR = os.path.join(ASSETS_DIR_BASE := os.path.join(ROOT_DIR, 'assets'))
ICON_PATH = os.path.join(ASSETS_DIR, 'brand', 'flank.ico')


def get_app_version() -> str:
    pkg_path = os.path.join(ROOT_DIR, 'package.json')
    try:
        with open(pkg_path, 'r', encoding='utf-8') as f:
            return str(json.load(f).get('version') or '1.0.0').lstrip('v')
    except Exception:
        return '1.0.0'


def write_version_info(out_path: str, version: str, description: str, original_name: str, internal_name: str) -> str:
    parts = [int(p) if p.isdigit() else 0 for p in version.split('.')[:4]]
    while len(parts) < 4:
        parts.append(0)
    ver_tuple = tuple(parts)
    content = f'''VSVersionInfo(
  ffi=FixedFileInfo(
    filevers={ver_tuple},
    prodvers={ver_tuple},
    mask=0x3f,
    flags=0x0,
    OS=0x40004,
    fileType=0x1,
    subtype=0x0,
    date=(0, 0)
  ),
  kids=[
    StringFileInfo([
      StringTable(
        '040904B0',
        [
          StringStruct('CompanyName', 'Flank Desktop'),
          StringStruct('FileDescription', {description!r}),
          StringStruct('FileVersion', {version!r}),
          StringStruct('InternalName', {internal_name!r}),
          StringStruct('LegalCopyright', 'MIT License'),
          StringStruct('OriginalFilename', {original_name!r}),
          StringStruct('ProductName', 'Flank'),
          StringStruct('ProductVersion', {version!r}),
        ]
      )
    ]),
    VarFileInfo([VarStruct('Translation', [1033, 1200])])
  ]
)
'''
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return out_path

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
            winreg.SetValueEx(key, 'DisplayVersion', 0, winreg.REG_SZ, '__FLANK_VERSION__')
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
    clean_env.pop('_MEIPASS', None)

    detach_flags = 0x00000008 | 0x00000200  # DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP

    if silent:
        if not no_launch and os.path.isfile(exe_path):
            subprocess.Popen([exe_path], cwd=install_dir, env=clean_env, creationflags=detach_flags)
        return

    ans = ctypes.windll.user32.MessageBoxW(
        0,
        f'Flank has been installed to:\n{install_dir}\n\nShortcuts were added to your Desktop and Start Menu.\n\nWould you like to launch Flank now?',
        'Flank Setup Complete',
        MB_YESNO | MB_ICONINFORMATION,
    )
    if ans == IDYES and os.path.isfile(exe_path):
        subprocess.Popen([exe_path], cwd=install_dir, env=clean_env, creationflags=detach_flags)


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
    app_version = get_app_version()
    os.makedirs(BUILD_DIR, exist_ok=True)
    app_ver_file = write_version_info(
        os.path.join(BUILD_DIR, 'flank_version_info.txt'),
        app_version,
        'Flank — A Second Dock for Windows',
        'Flank.exe',
        'Flank',
    )
    setup_ver_file = write_version_info(
        os.path.join(BUILD_DIR, 'flank_setup_version_info.txt'),
        app_version,
        'Flank Windows Installer',
        'Flank-Setup.exe',
        'Flank-Setup',
    )

    # 1. Ensure UI bundle and icon exist
    print(f'=== Step 1: Building UI bundle (v{app_version}) ===')
    subprocess.run(['npm', 'run', 'build:ui'], cwd=ROOT_DIR, shell=True, check=True)
    subprocess.run([sys.executable, os.path.join(ROOT_DIR, 'scripts', 'generate_icon.py')], check=True)

    # 2. Build standalone Flank.exe directory bundle via PyInstaller
    print('=== Step 2: Building standalone Flank.exe ===')
    stage_dir = os.path.join(BUILD_DIR, '_stage')
    if os.path.isdir(stage_dir):
        shutil.rmtree(stage_dir)
    os.makedirs(stage_dir, exist_ok=True)

    public_src = os.path.join(stage_dir, 'public')
    shutil.copytree(
        os.path.join(ROOT_DIR, 'public'),
        public_src,
        ignore=shutil.ignore_patterns('_screenshot_harness.html', '*.map'),
    )

    assets_src = os.path.join(stage_dir, 'assets')
    shutil.copytree(
        ASSETS_DIR,
        assets_src,
        ignore=shutil.ignore_patterns('*.md', 'legacy'),
    )

    themes_src = os.path.join(stage_dir, 'themes')
    shutil.copytree(os.path.join(ROOT_DIR, 'themes'), themes_src)

    host_dir = os.path.join(ROOT_DIR, 'host')
    main_py = os.path.join(host_dir, 'main.py')

    flank_dist_dir = os.path.join(DIST_DIR, 'Flank')
    if os.path.isdir(flank_dist_dir):
        shutil.rmtree(flank_dist_dir)

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
        '--version-file',
        app_ver_file,
        '--paths',
        host_dir,
        '--add-data',
        f'{public_src};public',
        '--add-data',
        f'{assets_src};assets',
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
        f.write(INSTALLER_STUB.replace('__FLANK_VERSION__', app_version))

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
        '--version-file',
        setup_ver_file,
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

