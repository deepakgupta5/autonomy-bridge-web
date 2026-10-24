"""Prove the production verifier rejects tracked and untracked build-input dirt.

Run with AB_BASELINE_DIST pointing to the independent baseline and the exact
approved SITE_ID and CONTEXT=production explicitly supplied by the caller.
"""
from pathlib import Path
import os
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
baseline = os.environ.get('AB_BASELINE_DIST')
if not baseline:
    raise SystemExit('AB_BASELINE_DIST must point to the independent baseline dist/')
if os.environ.get('SITE_ID') != '3df07dc5-6950-4241-98eb-cf95df3d271d' or os.environ.get('CONTEXT') != 'production':
    raise SystemExit('set the exact approved SITE_ID and CONTEXT=production explicitly')
env = os.environ.copy()
command = [sys.executable, 'scripts/verify-production-release.py',
           '--baseline-dist', baseline]


def verify_rejected(relative, expected_reason):
    result = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
    output = result.stdout + result.stderr
    assert result.returncode == 2, (relative, result.returncode, output)
    assert expected_reason in output and relative in output, (relative, output)


changed = ['tailwind.config.mjs', 'tsconfig.json', '.nvmrc',
           'docs/step-5/approved-copy/03-AutonomyBridge-Homepage-Copy-Reviewed.md']
for relative in changed:
    path = root / relative
    original = path.read_bytes()
    try:
        path.write_bytes(original + b'\n# temporary source attribution guard check\n')
        verify_rejected(relative, 'commit all build inputs')
    finally:
        path.write_bytes(original)

added = ['netlify/__codex_source_guard_test__.mjs',
         'docs/step-5/approved-copy/__codex_source_guard_test__.md']
for relative in added:
    untracked = root / relative
    assert not untracked.exists()
    try:
        untracked.write_text('temporary source attribution guard check\n')
        verify_rejected(relative, 'untracked build inputs')
    finally:
        if untracked.exists():
            untracked.unlink()

print('PASS: modified tailwind.config.mjs, tsconfig.json, .nvmrc and approved-copy input, '
      'plus untracked netlify/ and approved-copy inputs were all rejected; temporary changes were restored.')
