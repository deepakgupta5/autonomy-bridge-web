"""Write a deterministic content manifest for the locally built release artifact."""
from pathlib import Path
import hashlib
import json
import os
import subprocess

root = Path(__file__).resolve().parents[1]
dist = Path(os.environ.get('AB_AUDIT_DIST', root / 'dist'))
files = []
for path in sorted(file for file in dist.rglob('*') if file.is_file()):
    data = path.read_bytes()
    files.append({'path': path.relative_to(dist).as_posix(), 'bytes': len(data),
                  'sha256': hashlib.sha256(data).hexdigest()})
manifest = ''.join(f'{item["sha256"]}  {item["path"]}\n' for item in files)
output = root / 'docs/step-6a/release-build'
output.mkdir(parents=True, exist_ok=True)
(output / 'manifest.sha256').write_text(manifest)
source = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
summary = {'source_commit': source, 'artifact_directory': str(dist.resolve()),
           'file_count': len(files), 'total_bytes': sum(item['bytes'] for item in files),
           'manifest_sha256': hashlib.sha256(manifest.encode()).hexdigest(),
           'key_files': {name: next(item['sha256'] for item in files if item['path'] == name)
                         for name in ['index.html', 'research.html', 'methodology.html',
                                      'terms-of-use.html', 'cookie-policy.html',
                                      'robots.txt', 'llms.txt', 'sitemap-0.xml']}}
(output / 'artifact.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary))
