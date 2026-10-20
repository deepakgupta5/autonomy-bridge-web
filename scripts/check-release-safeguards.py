from pathlib import Path
import json,os,shutil,subprocess,tempfile,re
root=Path(__file__).resolve().parents[1]
env={**os.environ,'SITE_ID':'3df07dc5-6950-4241-98eb-cf95df3d271d','CONTEXT':'production'}
controls=[]
for override in [{'CONTEXT':'deploy-preview'},{'SITE_ID':'wrong'},{'AB_PRIVATE_PREVIEW':'1'}]:
 r=subprocess.run(['node','scripts/preview-build-guard.mjs'],cwd=root,env={**env,**override},capture_output=True,text=True)
 assert r.returncode!=0;controls.append({'override':override,'rejected':True})
tmp=Path(tempfile.mkdtemp(prefix='ab-release-local-',dir='/private/tmp'))
for name in ['src','public','scripts','config']:shutil.copytree(root/name,tmp/name,ignore=shutil.ignore_patterns('__pycache__'))
for name in ['package.json','package-lock.json','astro.config.mjs','tsconfig.json','tailwind.config.mjs']:shutil.copy2(root/name,tmp/name)
(tmp/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
p=tmp/'config/deployment-policy.mjs';p.write_text(p.read_text().replace("mode: 'production'","mode: 'local'"))
env={k:v for k,v in os.environ.items() if k not in ['CI','NETLIFY','CONTEXT','SITE_ID']};env['AB_PRIVATE_PREVIEW']='1'
(tmp/'.preview-private/pages').mkdir(parents=True);(tmp/'.preview-private/pages/home.html').write_text('STALE_OVERLAY_SENTINEL')
r=subprocess.run(['npm','run','build'],cwd=tmp,env=env,capture_output=True,text=True);(tmp/'build.log').write_text(r.stdout+r.stderr);assert r.returncode==0,str(tmp/'build.log')
html=list((tmp/'dist').rglob('*.html'));assert len(html)==160
for p in html:
 s=p.read_text();assert re.search(r'<meta name="robots" content="noindex,nofollow"',s),str(p);assert 'STALE_OVERLAY_SENTINEL' not in s;assert not re.search(r'mailto:|deepak@autonomybridge.com',s,re.I)
assert 'name="contact"' in (tmp/'dist/contact.html').read_text()
r=subprocess.run(['node','scripts/preview-build-guard.mjs'],cwd=tmp,env={**env,'CI':'true'},capture_output=True);assert r.returncode!=0
report={'passed':True,'production_guard_negative_controls':controls,'local_ci_rejected':True,'local_pages_noindex':160,'stale_overlay_not_restored':True,'local_form_present':True,'local_build':str(tmp/'dist'),'scope':'Isolated source copy with mode local; main branch policy unchanged.'}
(root/'docs/consolidated-release/preview-safeguards.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
