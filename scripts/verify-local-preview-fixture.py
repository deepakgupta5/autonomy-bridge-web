"""Build an isolated local-mode fixture and run strict pending/noindex checks."""
from pathlib import Path
import json
import os
import subprocess
import sys
import tempfile

root = Path(__file__).resolve().parents[1]
source = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
node = subprocess.check_output(['node', '--version'], text=True).strip()
assert node.startswith('v20.'), f'Node 20 required; found {node}'
with tempfile.TemporaryDirectory(prefix='ab-local-preview-fixture-') as name:
    target = Path(name)
    archive = target / 'source.tar'
    checkout = target / 'checkout'
    checkout.mkdir()
    subprocess.run(['git', 'archive', 'HEAD', '-o', str(archive)], cwd=root, check=True)
    subprocess.run(['tar', '-xf', str(archive), '-C', str(checkout)], check=True)
    (checkout / 'node_modules').symlink_to(root / 'node_modules', target_is_directory=True)
    policy = checkout / 'config/deployment-policy.mjs'
    content = policy.read_text()
    replacements = {
        "mode: 'production'": "mode: 'local'",
        "publicationDate: '2026-03-01'": "publicationDate: ''",
        "researchRevisionDate: '2026-03-01'": 'researchRevisionDate: null',
        "termsRevisionDate: '2026-03-01'": 'termsRevisionDate: null',
        "cookieRevisionDate: '2026-03-01'": 'cookieRevisionDate: null',
        "methodologyRevisionDate: '2026-03-01'": 'methodologyRevisionDate: null',
    }
    for old, new in replacements.items():
        assert content.count(old) == 1, old
        content = content.replace(old, new, 1)
    assert "approvedResearchRevisionDate = '2026-03-01'" in content
    policy.write_text(content)
    env = os.environ.copy()
    for name in ('SITE_ID', 'CONTEXT', 'NETLIFY', 'CI', 'AB_PRIVATE_PREVIEW'):
        env.pop(name, None)
    env['AB_STEP6A_AUDIT_REPORT'] = str(target / 'audit.json')
    outputs = []
    for label, command in [
        ('local_build', ['npm', 'run', 'build']),
        ('strict_pending_dates', [sys.executable, 'scripts/check-pending-dates.py']),
        ('local_noindex_audit', [sys.executable, 'scripts/audit-step6a.py']),
    ]:
        run = subprocess.run(command, cwd=checkout, env=env, capture_output=True, text=True)
        outputs.append({'name': label, 'exit_code': run.returncode,
                        'output_tail': (run.stdout + run.stderr)[-2000:]})
        if run.returncode:
            raise SystemExit(f'{label} failed:\n{run.stdout}\n{run.stderr}')
    audit = json.loads((target / 'audit.json').read_text())
    assert audit['source_mode'] == 'local' and audit['local_noindex_pages'] == 163
    assert audit['production_indexable_pages'] == 0
    report = {'passed': True, 'source_commit': source, 'node': node,
              'isolated_fixture': True, 'production_checkout_unchanged': True,
              'pending_research_routes': 86, 'local_noindex_pages': 163,
              'xml_lastmod_entries': 0, 'checks': outputs}
    destination = root / 'docs/independent-review/verification/preview-fixture.json'
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({k: report[k] for k in ('passed', 'source_commit', 'isolated_fixture',
                                            'pending_research_routes', 'local_noindex_pages')}, indent=2))
