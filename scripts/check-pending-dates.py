"""Check the local candidate's rendered publication-pending state."""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
policy = (root / 'config/deployment-policy.mjs').read_text()
assert "mode: 'local'" in policy
assert "publicationDate: ''" in policy
assert 'researchRevisionDate: null' in policy
assert 'termsRevisionDate: null' in policy
assert 'cookieRevisionDate: null' in policy
assert 'methodologyRevisionDate: null' in policy
revised = json.loads((root / 'config/material-research-revisions.json').read_text())
pending = 'Revision prepared for release; publication pending.'

for route in revised:
    html = (dist / f'{route.lstrip("/")}.html').read_text()
    assert pending in html, route
    schemas = [json.loads(item) for item in re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html)]
    assert all('dateModified' not in item and 'datePublished' not in item
               for item in schemas), route

for route in ['methodology', 'terms-of-use', 'cookie-policy']:
    assert pending in (dist / f'{route}.html').read_text(), route
methodology = (dist / 'methodology.html').read_text()
methodology_schemas = [json.loads(item) for item in re.findall(
    r'<script type="application/ld\+json">(.*?)</script>', methodology)]
assert any(item.get('datePublished') == '2026-03-01' and 'dateModified' not in item
           for item in methodology_schemas)
privacy = (dist / 'privacy-policy.html').read_text()
assert 'revision-date' not in privacy and 'Last updated:' not in privacy
historical = (dist / 'case-studies/automation-deployment-risk-assessment.html').read_text()
assert 'Source date record:' in historical and 'Historical source revision:' in historical

xml = ET.parse(dist / 'sitemap-0.xml')
assert not any(node.find('{*}lastmod') is not None for node in xml.getroot())
for file in dist.rglob('*.html'):
    html = file.read_text()
    assert '2026-10-19' not in html and '2026-10-20' not in html, file
    assert 'Revision prepared: October 19, 2026' not in html, file

print(json.dumps({'passed': True, 'pending_research_routes': len(revised),
                  'pending_methodology_terms_cookie': True,
                  'privacy_notice_has_no_revision_date': True,
                  'methodology_owner_corrected_publication_date': '2026-03-01',
                  'source_date_record_labels_present': True,
                  'xml_lastmod_entries': 0}))
