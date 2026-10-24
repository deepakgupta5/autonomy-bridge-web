"""Rebuild and verify this production candidate against an independent baseline.

Run with explicit SITE_ID and CONTEXT=production in the environment. This command
does not set or relax the production build guard and does not deploy anything.
"""
from pathlib import Path
import argparse
import json
import os
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--baseline-dist', required=True, type=Path,
                    help='dist/ from independent baseline commit 0285946a6a500f9207a9c466c7de11a4cffb22a8')
args = parser.parse_args()
baseline = args.baseline_dist.resolve()
dist = root / 'dist'
if baseline == dist.resolve() or not (baseline / 'index.html').is_file():
    parser.error('baseline must exist and be independent of this checkout/dist')
if len(list(baseline.rglob('*.html'))) != 157:
    parser.error('baseline must contain exactly 157 HTML pages')
baseline_commit = subprocess.run(['git', '-C', str(baseline.parent), 'rev-parse', 'HEAD'],
                                 capture_output=True, text=True)
if baseline_commit.returncode or baseline_commit.stdout.strip() != '0285946a6a500f9207a9c466c7de11a4cffb22a8':
    parser.error('baseline parent must be a checkout of commit 0285946a6a500f9207a9c466c7de11a4cffb22a8')
policy = (root / 'config/deployment-policy.mjs').read_text()
if "mode: 'production'" not in policy:
    parser.error('source must be the production-artifact candidate; use the isolated local-preview fixture for pending checks')
if os.environ.get('SITE_ID') != '3df07dc5-6950-4241-98eb-cf95df3d271d' or os.environ.get('CONTEXT') != 'production':
    parser.error('set the exact approved SITE_ID and CONTEXT=production explicitly; this command does not inject them')
build_inputs = ['src', 'config', 'public', 'scripts', 'netlify', 'astro.config.mjs',
                'tailwind.config.mjs', 'tsconfig.json', '.nvmrc', 'package.json',
                'package-lock.json', 'netlify.toml']
if subprocess.run(['git', 'diff', '--quiet', 'HEAD', '--', *build_inputs], cwd=root).returncode:
    parser.error('commit all build inputs before verification so the reported source commit is exact')
untracked_inputs = subprocess.check_output(
    ['git', 'ls-files', '--others', '--', *build_inputs], cwd=root, text=True)
if untracked_inputs.strip():
    parser.error('untracked build inputs prevent exact source attribution')
node = subprocess.check_output(['node', '--version'], text=True).strip()
if not node.startswith('v20.'):
    parser.error(f'Node 20 required; found {node}')
source = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
evidence = root / 'docs/independent-review/verification'
evidence.mkdir(parents=True, exist_ok=True)
env = {**os.environ, 'AB_AUDIT_DIST': str(dist), 'AB_STEP6A_DIST': str(dist)}
checks = [
    ('source_guard_negative_controls', [sys.executable, 'scripts/test-production-source-guard.py']),
    ('build', ['npm', 'run', 'build']),
    ('route_verifier', [sys.executable, 'scripts/verify-preview.py', str(baseline),
                        '--canonical-apex', '--research-review', '--release-candidate']),
    ('step6a_audit', [sys.executable, 'scripts/audit-step6a.py']),
    ('audit_negative_controls', [sys.executable, 'scripts/test-step6a-audit.py']),
    ('actual_release_dates', [sys.executable, 'scripts/check-actual-release-dates.py']),
    ('owner_date_diff', [sys.executable, 'scripts/verify-owner-date-diff.py']),
    ('date_gate', ['node', 'scripts/test-date-gate.mjs']),
    ('release_gates', ['node', 'scripts/test-release-gates.mjs']),
    ('offline_contact', ['node', 'scripts/test-release-contact.mjs']),
    ('artifact_hash', [sys.executable, 'scripts/hash-release-artifact.py']),
]
results = []
with (evidence / 'production-checks.log').open('w') as log:
    for label, command in checks:
        print(f'Running {label}: {" ".join(command)}', flush=True)
        run = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
        output = run.stdout + run.stderr
        log.write(f'## {label}: {" ".join(command)}\n{output}\n')
        log.flush()
        if label == 'build':
            (root / 'docs/step-6a/release-build/build.log').write_text(
                '\n'.join(line.rstrip() for line in output.splitlines()) + '\n')
        results.append({'name': label, 'command': command, 'exit_code': run.returncode})
        if run.returncode:
            raise SystemExit(f'{label} failed (exit {run.returncode}); see {evidence / "production-checks.log"}')

route = json.loads((root / 'docs/release/candidate-route-audit.json').read_text())
audit = json.loads((root / 'docs/step-6a/STEP6A_AUDIT.json').read_text())
dates = json.loads((root / 'docs/consolidated-release/final-release/dates.json').read_text())
artifact = json.loads((root / 'docs/step-6a/release-build/artifact.json').read_text())
assert (route['built_pages'], route['research_pages'], route['html_sitemap_expected'],
        route['xml_sitemap_entries']) == (163, 147, 158, 156)
assert not route['failures'] and not route['changed_existing_canonicals']
assert audit['source_mode'] == 'production' and audit['local_noindex_pages'] == 0
assert audit['production_indexable_pages'] == 159
assert dates['passed'] and dates['visible_schema_xml_parity']
assert artifact['source_commit'] == source and artifact['file_count'] == 241
summary = {
    'passed': True, 'source_commit': source, 'node': node,
    'baseline_commit': baseline_commit.stdout.strip(), 'baseline_dist': str(baseline),
    'explicit_target': {'SITE_ID': os.environ['SITE_ID'], 'CONTEXT': os.environ['CONTEXT']},
    'counts': {'html_pages': 163, 'research_routes': 147, 'html_sitemap_destinations': 158,
               'xml_entries': 156},
    'indexing': {'index_follow': 159, 'bridge_noindex_follow': 3,
                 'contact_success_noindex_nofollow': 1, 'local_noindex_pages': 0},
    'canonical_parity': True, 'research_date_parity': True,
    'artifact': {'files': artifact['file_count'], 'bytes': artifact['total_bytes'],
                 'manifest_sha256': artifact['manifest_sha256']},
    'checks': results,
}
(evidence / 'production.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary, indent=2))
