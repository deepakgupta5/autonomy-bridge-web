"""Build a disposable fixture proving Research, legal and Methodology dates are separate."""
from pathlib import Path
import json
import os
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
tmp = Path(tempfile.mkdtemp(prefix='ab-date-fixture-', dir='/private/tmp'))
for name in ['src', 'public', 'scripts', 'config']:
    shutil.copytree(root / name, tmp / name, ignore=shutil.ignore_patterns('__pycache__'))
shutil.copytree(root / 'docs/step-5/approved-copy', tmp / 'docs/step-5/approved-copy')
for name in ['package.json', 'package-lock.json', 'astro.config.mjs', 'tsconfig.json', 'tailwind.config.mjs']:
    shutil.copy2(root / name, tmp / name)
(tmp / 'node_modules').symlink_to(root / 'node_modules', target_is_directory=True)
original_policy = (root / 'config/deployment-policy.mjs').read_text()
policy = original_policy.replace("mode: 'local'", "mode: 'production'")
dates = {
    "publicationDate: ''": "publicationDate: '2026-04-01'",
    'researchRevisionDate: null': "researchRevisionDate: '2026-03-01'",
    'termsRevisionDate: null': "termsRevisionDate: '2026-04-02'",
    'cookieRevisionDate: null': "cookieRevisionDate: '2026-04-03'",
    'methodologyRevisionDate: null': "methodologyRevisionDate: '2026-04-04'",
}
for old, new in dates.items():
    assert old in policy
    policy = policy.replace(old, new)
(tmp / 'config/deployment-policy.mjs').write_text(policy)
env = {**os.environ, 'SITE_ID': '3df07dc5-6950-4241-98eb-cf95df3d271d', 'CONTEXT': 'production'}
env.pop('NETLIFY', None)
env.pop('AB_PRIVATE_PREVIEW', None)
build = subprocess.run(['npm', 'run', 'build'], cwd=tmp, env=env, capture_output=True, text=True)
(tmp / 'build.log').write_text(build.stdout + build.stderr)
assert build.returncode == 0, str(tmp / 'build.log')
dist = tmp / 'dist'
revised = set(json.loads((tmp / 'config/material-research-revisions.json').read_text()))
assert len(revised) == 86
for route in revised:
    html = (dist / f'{route.lstrip("/")}.html').read_text()
    assert 'datetime="2026-03-01"' in html, route
    schemas = [json.loads(item) for item in re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html)]
    assert any(item.get('dateModified') == '2026-03-01' for item in schemas), route
    assert not any(item.get('datePublished') for item in schemas), route
assert 'Last updated: 2026-04-02' in (dist / 'terms-of-use.html').read_text()
assert 'Last updated: 2026-04-03' in (dist / 'cookie-policy.html').read_text()
methodology = (dist / 'methodology.html').read_text()
assert 'Published: March 1, 2026' in methodology
assert 'Last updated: 2026-04-04' in methodology
assert 'Last updated:' not in (dist / 'privacy-policy.html').read_text()
xml = ET.parse(dist / 'sitemap-0.xml')
modified = {item.find('{*}loc').text.removeprefix('https://autonomybridge.com'):
            item.find('{*}lastmod').text for item in xml.getroot()
            if item.find('{*}lastmod') is not None}
assert set(modified) == revised
assert all(value.startswith('2026-03-01') for value in modified.values())
assert (root / 'config/deployment-policy.mjs').read_text() == original_policy
local = policy.replace("mode: 'production'", "mode: 'local'")
for old, new in dates.items():
    local = local.replace(new, old)
(tmp / 'config/deployment-policy.mjs').write_text(local)
rejected = subprocess.run(['node', 'scripts/preview-build-guard.mjs'], cwd=tmp,
                          env={**env, 'NETLIFY': 'true'}, capture_output=True, text=True)
assert rejected.returncode != 0 and 'remote builds disabled' in rejected.stderr
report = {'passed': True, 'fixture_only_dates': {
    'site': '2026-04-01', 'research': '2026-03-01', 'terms': '2026-04-02',
    'cookie': '2026-04-03', 'methodology': '2026-04-04'},
    'material_routes': len(revised), 'visible_schema_xml_date_parity': True,
    'legal_and_methodology_dates_separate': True,
    'privacy_notice_has_no_revision_date': True,
    'real_checkout_policy_unchanged': True, 'local_mode_remote_build_rejected': True,
    'fixture_directory': str(tmp)}
Path(os.environ.get('AB_DATE_FIXTURE_REPORT', root / 'docs/consolidated-release/revision-2/date-fixture.json')).write_text(
    json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
