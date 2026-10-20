"""Check the approved release artifact without inventing historical publication dates."""
from pathlib import Path
import re,json,os,xml.etree.ElementTree as ET
from datetime import datetime
from zoneinfo import ZoneInfo
root=Path(__file__).resolve().parents[1];dist=Path(os.environ['AB_AUDIT_DIST'])
policy=(root/'config/deployment-policy.mjs').read_text();date=re.search(r"researchRevisionDate: '(\d{4}-\d{2}-\d{2})'",policy)[1]
assert date==datetime.now(ZoneInfo('America/Vancouver')).date().isoformat(),'Release date no longer equals Vancouver today'
revised=set(json.loads((root/'config/material-research-revisions.json').read_text()));assert len(revised)==86
count=0
for f in dist.rglob('*.html'):
 route='/'+f.relative_to(dist).as_posix().removesuffix('.html');s=f.read_text()
 if route in revised:
  assert f'datetime="{date}"' in s,route
  schemas=[json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s)]
  assert any(x.get('dateModified')==date for x in schemas),route
  assert not any(x.get('datePublished') for x in schemas),route
  count+=1
 else:assert f'datetime="{date}"' not in s,route+' unrelated fresh date'
for route in ['privacy-policy','terms-of-use','cookie-policy']:assert f'Last updated: {date}' in (dist/f'{route}.html').read_text()
xml=ET.parse(dist/'sitemap-0.xml');modified={x.find('{*}loc').text.removeprefix('https://autonomybridge.com'):x.find('{*}lastmod').text for x in xml.getroot() if x.find('{*}lastmod') is not None}
assert set(modified)==revised and all(x.startswith(date) for x in modified.values())
report={'passed':True,'release_date':date,'timezone':'America/Vancouver','material_routes':count,'visible_schema_xml_parity':True,'unrelated_routes_not_stamped':True,'legal_dates_match':True,'historical_publication_dates_not_invented':True}
(root/'docs/consolidated-release/final-release/dates.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
