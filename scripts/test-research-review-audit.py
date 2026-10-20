from pathlib import Path
import os,shutil,tempfile,subprocess,json
root=Path(__file__).resolve().parents[1];tmp=Path(tempfile.mkdtemp(prefix='ab-review-negative-',dir='/private/tmp'));shutil.copytree('/private/tmp/ab-review2-final',tmp/'dist');dist=tmp/'dist'
controls=[
 ('contrary ROI answer','frameworks/robotics-roi-model.html',lambda s:s.replace('</main>','<p>It is calculated by dividing annualized capital cost by per-unit savings.</p></main>'),'review'),
 ('unsupported metadata figure','case-studies/parcel-sortation-volume-sensitivity-analysis.html',lambda s:s.replace('name="description" content="','name="description" content="35% verified improvement. '),'review'),
 ('public email','contact.html',lambda s:s.replace('</main>','<a href="mailto:deepak@autonomybridge.com">email</a></main>'),'review'),
 ('crawler changed','robots.txt',lambda s:s.replace('User-agent: GPTBot\nAllow: /','User-agent: GPTBot\nDisallow: /'),'review'),
 ('form absent','contact.html',lambda s:s.replace('data-netlify="true"','data-netlify="false"'),'review'),
 ('new broken link','index.html',lambda s:s.replace('</main>','<a href="/unreviewed-missing-target">missing</a></main>'),'routes'),
 ('unsubstantiated research date','frameworks/robotics-roi-model.html',lambda s:s.replace('"@type":"Article"','"@type":"Article","datePublished":"2026-03-15"'),'routes'),
]
results=[]
for name,file,mutate,kind in controls:
 p=dist/file;original=p.read_text();changed=mutate(original);assert changed!=original,name;p.write_text(changed)
 cmd=['node','scripts/audit-research-review.mjs',str(dist),str(tmp/'report.json')] if kind=='review' else ['python3','scripts/verify-preview.py','/private/tmp/ab-baseline/dist','--release-candidate','--canonical-apex','--research-review']
 r=subprocess.run(cmd,cwd=root,env={**os.environ,'AB_AUDIT_DIST':str(dist),'AB_AUDIT_REPORT':str(tmp/'report.json')},capture_output=True,text=True);p.write_text(original);assert r.returncode!=0,name;results.append({'mutation':name,'rejected':True})
report={'passed':True,'negative_controls':results,'scope':'Isolated artifact mutations; real candidate not modified.'};(root/'docs/consolidated-release/revision-2/negative-controls.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
