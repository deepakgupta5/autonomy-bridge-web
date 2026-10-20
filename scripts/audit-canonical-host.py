"""Audit all emitted URL signals; optionally check every XML destination live."""
import sys,json,re,hashlib,concurrent.futures,subprocess,xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
class Head(HTMLParser):
 def __init__(self,s):
  super().__init__();self.canonical=[];self.og=[];self.ld=[];self.script=None;self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='meta' and a.get('property')=='og:url':self.og.append(a.get('content'))
  if t=='script' and a.get('type')=='application/ld+json':self.script=''
 def handle_data(self,s):
  if self.script is not None:self.script+=s
 def handle_endtag(self,t):
  if t=='script' and self.script is not None:self.ld.append(json.loads(self.script));self.script=None
origin='https://autonomybridge.com';dist=Path(sys.argv[1]);out=Path(sys.argv[2]);errors=[];pages={}
for p in dist.rglob('*.html'):
 route='/'+p.relative_to(dist).as_posix().removesuffix('.html');route='/' if route=='/index' else route
 h=Head(p.read_text());expected=origin+('' if route=='/' else route)
 if h.canonical!=[expected] or h.og!=[expected]:errors.append([route,'canonical/og',h.canonical,h.og])
 if 'https://www.autonomybridge.com' in json.dumps(h.ld):errors.append([route,'www JSON-LD'])
 pages[route]=h.canonical[0]
locs=[]
for p in dist.glob('sitemap-*.xml'):
 values=[e.text for e in ET.parse(p).iter() if e.tag.endswith('loc')]
 if any(urlsplit(v).netloc!='autonomybridge.com' for v in values):errors.append([p.name,'host'])
 if p.name!='sitemap-index.xml':locs+=values
assert len(locs)==156
assert 'Sitemap: '+origin+'/sitemap-index.xml' in (dist/'robots.txt').read_text()
assert (dist/'llms.txt').read_bytes()==Path('public/llms.txt').read_bytes()
assert not re.search(r'18-month|60%|82%|120.day|ATP =', (dist/'llms.txt').read_text())
result={'html_pages':len(pages),'xml_destinations':len(locs),'errors':errors,'llms_exact_source_match':True}
if '--live' in sys.argv:
 def check(url):
  try:
   response=subprocess.check_output(['curl','-LsS','--max-time','45','-w','\n%{http_code} %{url_effective}',url],text=True)
   text,summary=response.rsplit('\n',1);status,final=summary.split(' ',1);h=Head(text) if '<html' in text else None
   return {'requested':url,'status':int(status),'final':final,'live_canonical':h.canonical if h else [],'direct_200':status=='200' and final.rstrip('/')==url.rstrip('/')}
  except Exception as e:return {'requested':url,'error':str(e),'direct_200':False}
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:result['live_urls']=list(pool.map(check, sorted(set(locs+[origin+'/sitemap-index.xml',origin+'/llms.txt',origin+'/robots.txt']))))
 result['live_www_redirect']=check('https://www.autonomybridge.com/')
 if any(not x['direct_200'] for x in result['live_urls']):errors.append('Live URL did not return direct 200')
result['passed']=not errors;out.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='live_urls'},indent=2))
assert not errors,errors
