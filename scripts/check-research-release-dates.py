"""Build an isolated date fixture; never set a publication date in the real checkout."""
from pathlib import Path
import os,json,re,shutil,tempfile,subprocess,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
tmp=Path(tempfile.mkdtemp(prefix='ab-date-fixture-',dir='/private/tmp'))
for name in ['src','public','scripts','config']:shutil.copytree(root/name,tmp/name,ignore=shutil.ignore_patterns('__pycache__'))
for name in ['package.json','package-lock.json','astro.config.mjs','tsconfig.json','tailwind.config.mjs']:shutil.copy2(root/name,tmp/name)
(tmp/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
# Synthetic historical date, explicitly a test fixture rather than an actual release claim.
date='2000-01-02';p=tmp/'config/deployment-policy.mjs';p.write_text(p.read_text().replace('researchRevisionDate: null',f"researchRevisionDate: '{date}'"))
env={**os.environ,'SITE_ID':'3df07dc5-6950-4241-98eb-cf95df3d271d','CONTEXT':'production'};env.pop('NETLIFY',None)
r=subprocess.run(['npm','run','build'],cwd=tmp,env=env,capture_output=True,text=True);(tmp/'build.log').write_text(r.stdout+r.stderr);assert r.returncode==0,str(tmp/'build.log')
revised=set(json.loads((tmp/'config/material-research-revisions.json').read_text()));stamped=[]
for f in (tmp/'dist').rglob('*.html'):
 route='/'+f.relative_to(tmp/'dist').as_posix().removesuffix('.html');s=f.read_text()
 if route in revised:
  assert f'datetime="{date}"' in s,route
  schemas=[json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s)]
  assert any(x.get('dateModified')==date for x in schemas),route
  assert not any(x.get('datePublished') for x in schemas),route
  stamped.append(route)
 else:assert f'datetime="{date}"' not in s,route+' unrelated date stamp'
for route in ['privacy-policy','terms-of-use','cookie-policy']:assert f'Last updated: {date}' in (tmp/'dist'/f'{route}.html').read_text()
xml=ET.parse(tmp/'dist/sitemap-0.xml');modified={x.find('{*}loc').text.removeprefix('https://autonomybridge.com'):x.find('{*}lastmod').text for x in xml.getroot() if x.find('{*}lastmod') is not None}
assert set(modified)==revised,(set(modified)^revised)
assert all(v.startswith(date) for v in modified.values());assert len(stamped)==len(revised)
assert 'researchRevisionDate: null' in (root/'config/deployment-policy.mjs').read_text()
# The real pending-release source must fail remote production builds until its actual date is supplied.
r=subprocess.run(['node','scripts/preview-build-guard.mjs'],cwd=root,env={**env,'NETLIFY':'true'},capture_output=True,text=True);assert r.returncode!=0 and 'actual release date' in r.stderr
report={'passed':True,'fixture_only_date':date,'material_routes':len(stamped),'visible_schema_xml_date_parity':True,'unrelated_pages_not_fresh_stamped':True,'legal_date_parity':True,'real_checkout_date_still_null':True,'remote_pending_date_build_rejected':True,'fixture_directory':str(tmp)}
(root/'docs/consolidated-release/revision-2/date-fixture.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
