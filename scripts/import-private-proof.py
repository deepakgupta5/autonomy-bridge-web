"""Restore only selected V2 excerpts to ignored local overlay. Never commit its output."""
import json,re,html,sys,zipfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
with zipfile.ZipFile(sys.argv[1]) as package:
 data=json.loads(package.read('website_copy.json'))
assert data['version']=='2','Requires controlling V2 package'
public=json.loads((root/'src/data/preview-copy.json').read_text())
positions=json.loads((root/'scripts/private-proof-lines.json').read_text());overlay={}
for route,indices in positions.items():
 lines=next(p['copy_text'].splitlines() for p in data['pages'] if p['route']==route)
 replacements=iter('<p>'+html.escape(lines[i])+'</p>' for i in indices)
 overlay[route]=re.sub(r'<p class="proof-pending">.*?</p>',lambda _:next(replacements),public[route]['html'],flags=re.S)
path=root/'.preview-private/copy.json';path.parent.mkdir(exist_ok=True);path.write_text(json.dumps(overlay,ensure_ascii=False,indent=2)+'\n')
print('Private overlay restored locally. Use AB_PRIVATE_PREVIEW=1 with the localhost dev server.')
