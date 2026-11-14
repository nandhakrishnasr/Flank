import hashlib
import json
import os
import sys

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PKG_PATH = os.path.join(ROOT_DIR, 'package.json')
SETUP_EXE = os.path.join(ROOT_DIR, 'dist', 'Flank-Setup.exe')


def get_version() -> str:
    with open(PKG_PATH, 'r', encoding='utf-8') as f:
        return str(json.load(f)['version']).lstrip('v')


def sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest().upper()


def main() -> None:
    version = sys.argv[1].lstrip('v') if len(sys.argv) > 1 else get_version()
    if os.path.isfile(SETUP_EXE):
        sha256 = sha256_file(SETUP_EXE)
    else:
        sha256 = '<REPLACE_WITH_FLANK_SETUP_EXE_SHA256>'

    pkg_id = 'NandhaKrishna.Flank'
    out_dir = os.path.join(ROOT_DIR, 'dist', 'winget', 'manifests', 'n', 'NandhaKrishna', 'Flank', version)
    os.makedirs(out_dir, exist_ok=True)

    url = f'https://github.com/nandhakrishnasr/Flank/releases/download/v{version}/Flank-Setup.exe'

    version_yaml = (
        f"# yaml-language-server: $schema=https://aka.ms/winget-manifest.version.1.6.0.schema.json\n"
        f"PackageIdentifier: {pkg_id}\n"
        f"PackageVersion: {version}\n"
        f"DefaultLocale: en-US\n"
        f"ManifestType: version\n"
        f"ManifestVersion: 1.6.0\n"
    )

    installer_yaml = (
        f"# yaml-language-server: $schema=https://aka.ms/winget-manifest.installer.1.6.0.schema.json\n"
        f"PackageIdentifier: {pkg_id}\n"
        f"PackageVersion: {version}\n"
        f"InstallerType: exe\n"
        f"Scope: user\n"
        f"InstallerSwitches:\n"
        f"  Silent: --silent --no-launch\n"
        f"  SilentWithProgress: --silent --no-launch\n"
        f"Installers:\n"
        f"  - Architecture: x64\n"
        f"    InstallerUrl: {url}\n"
        f"    InstallerSha256: {sha256}\n"
        f"ManifestType: installer\n"
        f"ManifestVersion: 1.6.0\n"
    )

    locale_yaml = (
        f"# yaml-language-server: $schema=https://aka.ms/winget-manifest.defaultLocale.1.6.0.schema.json\n"
        f"PackageIdentifier: {pkg_id}\n"
        f"PackageVersion: {version}\n"
        f"PackageLocale: en-US\n"
        f"Publisher: Nandha Krishna\n"
        f"PublisherUrl: https://github.com/nandhakrishnasr\n"
        f"PublisherSupportUrl: https://github.com/nandhakrishnasr/Flank/issues\n"
        f"PackageName: Flank\n"
        f"PackageUrl: https://github.com/nandhakrishnasr/Flank\n"
        f"License: MIT\n"
        f"ShortDescription: A second dock for Windows with pinned apps, clipboard history, and 22 live interactive widgets.\n"
        f"Tags:\n"
        f"  - dock\n"
        f"  - launcher\n"
        f"  - productivity\n"
        f"  - widgets\n"
        f"  - windows-11\n"
        f"ManifestType: defaultLocale\n"
        f"ManifestVersion: 1.6.0\n"
    )

    with open(os.path.join(out_dir, f'{pkg_id}.yaml'), 'w', encoding='utf-8') as f:
        f.write(version_yaml)
    with open(os.path.join(out_dir, f'{pkg_id}.installer.yaml'), 'w', encoding='utf-8') as f:
        f.write(installer_yaml)
    with open(os.path.join(out_dir, f'{pkg_id}.locale.en-US.yaml'), 'w', encoding='utf-8') as f:
        f.write(locale_yaml)

    print(f'Generated Winget manifests in: {out_dir}')
    print(f'InstallerSha256: {sha256}')


if __name__ == '__main__':
    main()
