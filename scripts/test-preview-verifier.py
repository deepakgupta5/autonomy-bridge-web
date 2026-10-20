"""Negative controls against local build artifacts; every mutation is restored."""
from pathlib import Path
import json,re,subprocess,sys
root=Path(__file__).resolve().parents[1]
baseline=sys.argv[1]
command=[sys.executable,str(root/'scripts/verify-preview.py'),baseline]
results=[]
def run(): return subprocess.run(command,cwd=root,capture_output=True,text=True)
def expect_failure(label,expected):
 result=run()
 if result.returncode == 0 or expected not in result.stdout+result.stderr:
  raise RuntimeError(f'{label}: verifier did not reject expected defect: {result.stdout[-1500:]} {result.stderr}')
 results.append(label)
def mutate(label,file,transform,expected):
 path=root/'dist'/file;original=path.read_text()
 changed=transform(original)
 if changed==original:raise RuntimeError(f'{label}: mutation did not change fixture')
 try:
  path.write_text(changed);expect_failure(label,expected)
 finally:path.write_text(original)
if run().returncode:raise RuntimeError('Clean preview must pass before negative controls')
try:
 mutate('Missing description fails','index.html',lambda s:re.sub(r'<meta name="description"[^>]*>','',s),'missing_metadata')
 mutate('Changed canonical fails','about.html',lambda s:re.sub(r'(<link rel="canonical" href=")[^"]+',r'\1https://example.invalid/about',s),'changed_existing_canonicals')
 mutate('Changed research date fails','insights/why-robotics-pilots-fail-to-scale.html',lambda s:re.sub(r'("datePublished":")[^"]+',r'\g<1>2000-01-01',s),'changed_research_dates_except_methodology')
 mutate('Indexable preview fails','index.html',lambda s:s.replace('content="noindex,nofollow"','content="index,follow"'),'preview_robots_errors')
 mutate('Unknown broken destination fails','index.html',lambda s:s.replace('</main>','<a href="/unexpected-missing-page">Negative control</a></main>'),'unexpected_broken_destinations')
 mutate('New referrer to historical broken destination fails','index.html',lambda s:s.replace('</main>','<a href="/glossary/commercial-viability">Negative control</a></main>'),'new_broken_link_referrers')
 path=root/'dist/about.html';held=path.with_suffix('.held')
 try:
  path.rename(held);expect_failure('Lost baseline route fails','lost_baseline_routes')
 finally:held.rename(path)
 for arg,label in [(None,'Missing baseline fails'),('/nonexistent/baseline','Unavailable baseline fails')]:
  cmd=command[:2]+([arg] if arg else [])
  if subprocess.run(cmd,cwd=root,capture_output=True).returncode==0:raise RuntimeError(label)
  results.append(label)
finally:
 result=run()
 if result.returncode:raise RuntimeError('Restored build did not pass: '+result.stderr)
(root/'docs/preview/verifier-negative-controls.json').write_text(json.dumps({'passed':True,'checks':results,'restored_build_passed':True},indent=2)+'\n')
print(json.dumps(results,indent=2))
