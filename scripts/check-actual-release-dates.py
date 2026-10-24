"""Check the actual production-mode artifact against approved independent date fields."""
from pathlib import Path
import hashlib
import json
import os
import re
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
dist = Path(os.environ['AB_AUDIT_DIST'])
policy = (root / 'config/deployment-policy.mjs').read_text()
assert "mode: 'production'" in policy, 'Final date check requires production source mode'
dates = {}
for field in ['publicationDate', 'researchRevisionDate', 'termsRevisionDate',
              'cookieRevisionDate', 'methodologyRevisionDate']:
    match = re.search(rf"{field}: '(\d{{4}}-\d{{2}}-\d{{2}})'", policy)
    assert match, f'Missing approved {field}'
    dates[field] = match[1]
assert dates == dict.fromkeys(dates, '2026-03-01'), dates
revised = set(json.loads((root / 'config/material-research-revisions.json').read_text()))
assert len(revised) == 86
count = 0
for file in dist.rglob('*.html'):
    route = '/' + file.relative_to(dist).as_posix().removesuffix('.html')
    html = file.read_text()
    if route in revised:
        assert 'datetime="2026-03-01"' in html, route
        schemas = [json.loads(item) for item in re.findall(
            r'<script type="application/ld\+json">(.*?)</script>', html)]
        assert any(item.get('dateModified') == '2026-03-01' for item in schemas), route
        assert not any(item.get('datePublished') for item in schemas), route
        count += 1
    else:
        assert 'class="research-revision"' not in html or \
               'datetime="2026-03-01"' not in html, route
assert count == len(revised)
for route, field in [('terms-of-use', 'termsRevisionDate'),
                     ('cookie-policy', 'cookieRevisionDate')]:
    assert f'Last updated: {dates[field]}' in (dist / f'{route}.html').read_text(), route
methodology = (dist / 'methodology.html').read_text()
assert 'Published: March 1, 2026' in methodology
assert f'Last updated: {dates["methodologyRevisionDate"]}' in methodology
methodology_schemas = [json.loads(item) for item in re.findall(
    r'<script type="application/ld\+json">(.*?)</script>', methodology)]
assert any(item.get('datePublished') == '2026-03-01' and
           item.get('dateModified') == dates['methodologyRevisionDate']
           for item in methodology_schemas)
privacy = (dist / 'privacy-policy.html').read_text()
assert 'revision-date' not in privacy and 'Last updated:' not in privacy
xml = ET.parse(dist / 'sitemap-0.xml')
modified = {item.find('{*}loc').text.removeprefix('https://autonomybridge.com'):
            item.find('{*}lastmod').text for item in xml.getroot()
            if item.find('{*}lastmod') is not None}
assert set(modified) == revised and all(value.startswith('2026-03-01') for value in modified.values())
corrections = json.loads((root / 'docs/step-6a/DATE_SOURCE_CORRECTIONS.json').read_text())
assert corrections['research_routes'] == 86 and corrections['source_files'] == 87
for row in corrections['files']:
    source = (root / row['source']).read_bytes()
    assert hashlib.sha256(source).hexdigest() == row['after_sha256'], row['route']
report = {'passed': True, 'production_mode': True, 'dates': dates,
          'material_research_routes': count, 'visible_schema_xml_parity': True,
          'legal_and_methodology_dates_checked_separately': True,
          'owner_corrected_source_files': 87,
          'privacy_notice_has_no_revision_date': True}
output = root / 'docs/consolidated-release/final-release/dates.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report))
