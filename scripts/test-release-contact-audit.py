"""Verify Contact is checked in AB_AUDIT_DIST, using disposable mutated artifacts."""
from pathlib import Path
import json,os,shutil,subprocess,sys,tempfile
root=Path(__file__).resolve().parents[1]
artifact=Path(sys.argv[1]);source=Path(sys.argv[2])
target=Path(tempfile.mkdtemp(prefix='ab-contact-audit-control-'))/'artifact'
shutil.copytree(artifact,target)
contact=target/'contact.html';clean=contact.read_text();results=[]
for label,modified in [('form inserted',clean+'<FORM name="negative-control"></FORM>'),('email removed',clean.replace('mailto:deepak@autonomybridge.com','mailto:fixture@example.invalid'))]:
 contact.write_text(modified)
 run=subprocess.run([sys.executable,str(root/'scripts/verify-release-content.py'),str(source)],cwd=root,env={**os.environ,'AB_AUDIT_DIST':str(target)},capture_output=True,text=True)
 assert run.returncode!=0,label+' incorrectly passed'
 assert 'Audited Contact' in run.stderr,run.stderr
 results.append({'control':label,'rejected':True})
contact.write_text(clean)
run=subprocess.run([sys.executable,str(root/'scripts/verify-release-content.py'),str(source)],cwd=root,env={**os.environ,'AB_AUDIT_DIST':str(artifact)},capture_output=True,text=True)
assert run.returncode==0,run.stderr
result={'passed':True,'negative_controls':results,'clean_artifact_passed':True,'workspace_dist_untouched':True}
(root/'docs/release/contact-audit-negative-controls.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
