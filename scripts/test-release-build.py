"""Offline release/fallback builds in a disposable copy; never changes source mode."""
from pathlib import Path
import json, os, shutil, subprocess, tempfile
root = Path(__file__).resolve().parents[1]
target = Path(tempfile.mkdtemp(prefix='ab-release-check-'))
for name in ['src','public','config','scripts','netlify']:
    shutil.copytree(root/name, target/name)
for path in root.iterdir():
    if path.is_file() and path.name in ['package.json','package-lock.json','astro.config.mjs','tsconfig.json','netlify.toml']:
        shutil.copy2(path,target/path.name)
(target/'node_modules').symlink_to(root/'node_modules',target_is_directory=True)
site='00000000-0000-4000-8000-000000000001'
patch=subprocess.check_output(['python3',str(root/'scripts/prepare-release-patch.py'),'--origin','https://autonomybridge.com','--site-id',site],cwd=root)
subprocess.run(['git','apply','--unsafe-paths','-'],input=patch,cwd=target,check=True)
env={**os.environ,'SITE_ID':site,'CONTEXT':'production','NETLIFY':'true'}
env.pop('AB_PRIVATE_PREVIEW',None)
checks=[]
for mode in ['production-form','email-only']:
    if mode=='email-only':
        config=target/'config/deployment-policy.mjs'
        config.write_text(config.read_text().replace('formEnabled: true','formEnabled: false'))
    result=subprocess.run(['npm','run','build'],cwd=target,env=env,capture_output=True,text=True)
    assert result.returncode==0,result.stdout+result.stderr
    files=list((target/'dist').rglob('*.html'));assert len(files)==160
    home=(target/'dist/index.html').read_text();contact=(target/'dist/contact.html').read_text();success=(target/'dist/contact-success.html').read_text()
    assert 'content="index,follow"' in home
    assert 'content="noindex,nofollow"' in success
    assert 'preview-notice' not in home.split('<body',1)[1]
    assert 'mailto:deepak@autonomybridge.com' in contact
    assert ('<form name="contact"' in contact)==(mode=='production-form')
    if mode=='email-only':assert 'The enquiry form is temporarily unavailable' in contact
    for file in (target/'dist').rglob('*'):
        if file.suffix in ['.html','.js']:
            text=file.read_text()
            assert 'googletagmanager.com' not in text and 'G-ZX7LHWYBWP' not in text
    checks.append(mode+': 160 pages; expected robots/banner/form/email; no Google loader or tracking ID')
# Production guard rejects private overlay and wrong site, even in an isolated copy.
for extra in [{'AB_PRIVATE_PREVIEW':'1'},{'SITE_ID':'wrong'},{'CONTEXT':'deploy-preview'}]:
    result=subprocess.run(['node','scripts/preview-build-guard.mjs'],cwd=target,env={**env,**extra},capture_output=True)
    assert result.returncode!=0
checks.append('Candidate rejects private overlay, wrong site and preview deployment context')
print(json.dumps({'passed':True,'checks':checks,'limits':'Disposable offline build with fixture UUID only; not a deployable approved release. No network form calls or mailbox checks.'},indent=2))
