"""Compare approved proof against controlling ZIP without copying private evidence."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import hashlib,html,json,re,subprocess,sys,zipfile,os
root=Path(__file__).resolve().parents[1]
dist=Path(os.environ.get('AB_AUDIT_DIST', root/'dist'))
class Paragraphs(HTMLParser):
 def __init__(self,text):
  super().__init__();self.items=[];self.current=None;self.feed(text)
 def handle_starttag(self,tag,attrs):
  if tag=='p':self.current=''
 def handle_data(self,s):
  if self.current is not None:self.current+=s
 def handle_endtag(self,tag):
  if tag=='p' and self.current is not None:self.items.append(self.current);self.current=None
with zipfile.ZipFile(sys.argv[1]) as z:source=json.loads(z.read('website_copy.json'))
assert source['version']=='2'
positions=json.loads((root/'scripts/private-proof-lines.json').read_text());pages=json.loads((root/'src/data/preview-copy.json').read_text());checks=[]
for route,indices in positions.items():
 lines=next(p['copy_text'].splitlines() for p in source['pages'] if p['route']==route)
 expected=Counter(lines[i] for i in indices)
 artifact=dist/('index.html' if route=='/' else route[1:]+'.html')
 for label,text in [('source',pages[route]['html']),('built',artifact.read_text())]:
  actual=Counter(Paragraphs(text).items)
  for claim,count in expected.items():assert actual[claim]==count,(route,label,'proof mismatch')
 checks.append({'route':route,'approved_paragraphs':len(indices),'source_and_build_match':True})
for p in dist.rglob('*'):
 if p.suffix not in ['.html','.js']:continue
 text=p.read_text()
 assert not re.search(r'\[Confirm:|\[Publication date\]|\[date of publication|proof-pending|Selected proof withheld',text,re.I),str(p)
 assert not re.search(r'googletagmanager\.com|google-analytics\.com|G-ZX7LHWYBWP',text),str(p)
contact=(root/'dist/contact.html').read_text();assert '<form' not in contact and 'mailto:deepak@autonomybridge.com' in contact
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard'],cwd=root,text=True).splitlines()
for f in files:
 assert not f.startswith(('.preview-private/','.netlify/','.env')) and not f.endswith('.zip'),f
 p=root/f
 if not p.is_file():continue
 assert not re.search(r'gh[pousr]_[A-Za-z0-9]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',p.read_text(errors='ignore')),f
result={'passed':True,'proof_total':sum(x['approved_paragraphs'] for x in checks),'proof':checks,'placeholder_and_google_scan':'passed','contact':'email-only, no form','private_source_paths_and_common_secret_patterns':'passed; not a universal secret detector','owner_approval':'https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281916360','scope':'Only approved website excerpts; underlying private evidence excluded; owner attestation not independent records audit'}
(root/'docs/release/candidate-content-checks.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
