"""Prove the production verifier rejects dirt in each newly covered build input."""
from pathlib import Path
import os
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
baseline = '/private/tmp/autonomy-step6-0285946-baseline/dist'
env = {**os.environ, 'SITE_ID': '3df07dc5-6950-4241-98eb-cf95df3d271d',
       'CONTEXT': 'production'}
command = [sys.executable, 'scripts/verify-production-release.py',
           '--baseline-dist', baseline]


def verify_rejected(label):
    result = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
    output = result.stdout + result.stderr
    assert result.returncode == 2, (label, result.returncode, output)
    assert 'commit all build inputs' in output or 'untracked build inputs' in output, (label, output)


changed = ['tailwind.config.mjs', 'tsconfig.json', '.nvmrc']
for relative in changed:
    path = root / relative
    original = path.read_bytes()
    try:
        path.write_bytes(original + b'\n# temporary source attribution guard check\n')
        verify_rejected(relative)
    finally:
        path.write_bytes(original)

untracked = root / 'netlify/__codex_source_guard_test__.mjs'
assert not untracked.exists()
try:
    untracked.write_text('// temporary source attribution guard check\n')
    verify_rejected('netlify/')
finally:
    if untracked.exists():
        untracked.unlink()

print('PASS: modified tailwind.config.mjs, tsconfig.json, .nvmrc and untracked netlify/ input were all rejected; temporary changes were restored.')
