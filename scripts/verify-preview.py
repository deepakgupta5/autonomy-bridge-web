"""Audit built HTML without network requests. Required baseline build path as argv[1]. Fail closed on unexpected differences."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json,sys,collections,subprocess,os
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.links=[];self.mainlinks=[];self.ids=set();self.meta={};self.canonical='';self.scripts=[];self.script=None;self.inmain=False;self.title='';self.intitle=False;self.breadcrumb=[];self.incrumb=False;self.crumbdepth=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='main':self.inmain=True
  if 'id' in a:self.ids.add(a['id'])
  if tag=='a' and 'href' in a:
   self.links.append(a['href'])
   if self.inmain:self.mainlinks.append(a['href'])
  if tag=='meta':self.meta[a.get('name',a.get('property'))]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a['href']
  if tag=='script' and a.get('type')=='application/ld+json':self.script=''
  if tag=='title':self.intitle=True
 def handle_endtag(self,tag):
  if tag=='main':self.inmain=False
  if tag=='title':self.intitle=False
  if tag=='script' and self.script is not None:
   self.scripts.append(json.loads(self.script));self.script=None
 def handle_data(self,data):
  if self.intitle:self.title+=data
  if self.script is not None:self.script+=data
root=Path(__file__).resolve().parents[1]; dist=Path(os.environ.get('AB_AUDIT_DIST', root/'dist'))
candidate = '--release-candidate' in sys.argv[2:]
apex = '--canonical-apex' in sys.argv[2:]
if len(sys.argv) < 2 or set(sys.argv[2:]) - {'--release-candidate','--canonical-apex'}:
 raise SystemExit('Usage: python3 scripts/verify-preview.py /path/to/0285946-baseline/dist (required)')
base=Path(sys.argv[1])
if not (base/'index.html').is_file() or len(list(base.rglob('*.html'))) != 157:
 raise SystemExit('Baseline must contain the 157-page build from commit 0285946; missing/incomplete baseline')
if base.resolve() == dist.resolve():
 raise SystemExit('Baseline must be independent of the preview build')
def route(p,base):
 name='/'+p.relative_to(base).as_posix().removesuffix('.html');return '/' if name=='/index' else name
pages={route(p,dist):Page(p.read_text()) for p in dist.rglob('*.html')}
research={p for p in pages if p=='/methodology' or p.split('/')[1] in ['insights','frameworks','use-cases','case-studies','market-overview','glossary']}
redirects={}
for line in (dist/'_redirects').read_text().splitlines():
 if line.strip() and not line.startswith('#'):
  fields=line.split();redirects[fields[0]]=fields[1]
def internal(href,source):
 u=urlsplit(href)
 if u.scheme in ['mailto','tel','javascript'] or u.netloc and u.hostname not in ['www.autonomybridge.com','autonomybridge.com']:return None
 return (u.path.rstrip('/') or (source if not u.path else '/'),unquote(u.fragment))
broken=collections.defaultdict(set);fragments=[];graph={}
for path,page in pages.items():
 graph[path]=set()
 for href in page.links:
  target=internal(href,path)
  if target is None:continue
  target,frag=target;target=redirects.get(target,target)
  if target in pages:
   if href in page.mainlinks:graph[path].add(target)
   if frag and frag not in pages[target].ids:fragments.append({'source':path,'target':target+'#'+frag})
  elif not (dist/target.lstrip('/')).exists():broken[target].add(path)
visited=set();todo=['/research']
while todo:
 x=todo.pop()
 if x in visited:continue
 visited.add(x);todo.extend(graph.get(x,set())-visited)
inventory=set(json.loads((root/'docs/preview/research-inventory.json').read_text()))
if research != inventory: raise SystemExit('Research differs from controlling 147-route inventory')
expected={urlsplit(x['proposed_release_url']).path for x in json.loads((root/'src/data/preview-sitemap.json').read_text())}
sitemap_main={internal(h,'/sitemap')[0] for h in pages['/sitemap'].mainlinks if internal(h,'/sitemap') and not h.startswith('#')}
xmlpaths=set()
import xml.etree.ElementTree as ET
for p in dist.glob('sitemap-*.xml'):
 if p.name=='sitemap-index.xml':continue
 xmlpaths.update(urlsplit(e.text).path.rstrip('/') or '/' for e in ET.parse(p).iter() if e.tag.endswith('loc'))
crumb_errors=[]
for path in research:
 crumbs=[s for s in pages[path].scripts if s.get('@type')=='BreadcrumbList']
 if len(crumbs)!=1 or not any(x['name']=='Research' and x['item'].endswith('/research') for x in crumbs[0]['itemListElement']):crumb_errors.append(path)
hub_missing={}
for hub in ['/insights','/frameworks','/use-cases','/case-studies','/market-overview','/glossary']:
 targets={internal(h,hub)[0] for h in pages[hub].mainlinks if internal(h,hub)}
 missing={r for r in research if r.startswith(hub+'/')}-targets
 if missing:hub_missing[hub]=sorted(missing)
result={'hub_listing_missing':hub_missing,'built_pages':len(pages),'research_pages':len(research),'unreachable_research':sorted(research-visited),'html_sitemap_expected':len(expected),'html_sitemap_missing':sorted(expected-sitemap_main),'html_sitemap_extra':sorted(sitemap_main-expected-{'/sitemap'}),'xml_sitemap_entries':len(xmlpaths),'xml_missing_research':sorted(research-xmlpaths),'xml_forbidden':sorted(xmlpaths & {'/contact-success','/privacy-policy','/terms-of-use','/cookie-policy'}),'broken_destinations':{k:sorted(v) for k,v in sorted(broken.items())},'fragment_failures':fragments,'breadcrumb_errors':crumb_errors,'missing_metadata':[p for p,x in pages.items() if not x.title.strip() or not x.meta.get('description','').strip() or not x.canonical],'redirects_unchanged':subprocess.check_output(['git','show','0285946:public/_redirects'],cwd=root)==(root/'public/_redirects').read_bytes()}
base=Path(sys.argv[1]); old={route(p,base):Page(p.read_text()) for p in base.rglob('*.html')}
result['lost_baseline_routes']=sorted(set(old)-set(pages));result['changed_existing_canonicals']=[p for p in old if p in pages and (old[p].canonical.replace('https://www.autonomybridge.com','https://autonomybridge.com') if apex else old[p].canonical)!=pages[p].canonical]
def dates(page):return [(s.get('@type'),s.get('datePublished'),s.get('dateModified')) for s in page.scripts if s.get('datePublished') or s.get('dateModified')]
result['changed_research_dates_except_methodology']=[p for p in research-{'/methodology'} if p not in old or dates(pages[p])!=dates(old[p])]
result['changed_research_titles_except_framework']=[p for p in research-{'/methodology','/frameworks/pilot-to-scale-failure-framework'} if p not in old or pages[p].title!=old[p].title]
allowed=json.loads((root/'docs/preview/historical-broken-links.json').read_text())
if len(allowed) != 8: raise SystemExit('Historical broken-link exception register must contain exactly eight destinations')
result['unexpected_broken_destinations']=sorted(set(broken)-set(allowed))
result['new_broken_link_referrers']={target:sorted(sources-set(allowed.get(target,[]))) for target,sources in broken.items() if sources-set(allowed.get(target,[]))}
result['preview_robots_errors']=sorted(path for path,page in pages.items() if page.meta.get('robots') != ('noindex,nofollow' if not candidate or path == '/contact-success' else 'index,follow'))
result['xml_missing_expected']=sorted((expected-{'/privacy-policy','/terms-of-use','/cookie-policy'}|{'/sitemap'})-xmlpaths)
result['xml_unexpected']=sorted(xmlpaths-(expected-{'/privacy-policy','/terms-of-use','/cookie-policy'}|{'/sitemap'}))
empty_checks=[
 'hub_listing_missing','unreachable_research','html_sitemap_missing','html_sitemap_extra',
 'xml_missing_research','xml_forbidden','xml_missing_expected','xml_unexpected',
 'fragment_failures','breadcrumb_errors','missing_metadata','lost_baseline_routes',
 'changed_existing_canonicals','changed_research_dates_except_methodology',
 'changed_research_titles_except_framework','unexpected_broken_destinations',
 'new_broken_link_referrers','preview_robots_errors',
]
failures=[key for key in empty_checks if result[key]]
for key,count in [('built_pages',160),('research_pages',147),('html_sitemap_expected',158),('xml_sitemap_entries',156)]:
 if result[key] != count: failures.append(key)
if not result['redirects_unchanged']: failures.append('redirects_unchanged')
result['failures']=failures
result['passed']=not failures
Path(os.environ.get('AB_AUDIT_REPORT', root/('docs/release/candidate-route-audit.json' if candidate else 'docs/preview/verification.json'))).write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
if failures: raise SystemExit('Preview verification failed: '+', '.join(failures))
