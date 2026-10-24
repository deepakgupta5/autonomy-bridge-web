"""Prove the owner date correction changed only explicit date records in Research sources."""
from pathlib import Path
import json
import re
import subprocess

root = Path(__file__).resolve().parents[1]
base = 'bbb1a97e52510879ad5bfd83fa9f432adad03f84'
report = json.loads((root / 'docs/step-6a/DATE_SOURCE_CORRECTIONS.json').read_text())
expected = {row['source'] for row in report['files']}
changed = set(subprocess.check_output(
    ['git', 'diff', '--name-only', base, '--', 'src/content'], cwd=root, text=True).splitlines())
assert changed == expected, {'missing': sorted(expected - changed), 'extra': sorted(changed - expected)}
diff = subprocess.check_output(
    ['git', 'diff', '--unified=0', base, '--', 'src/content'], cwd=root, text=True)
allowed = re.compile(r'^(?:  (?:created|updated|published):|(?:datePublished|dateModified):|(?:Created|Updated|Published):)')
lines = 0
for line in diff.splitlines():
    if line.startswith(('+++', '---')) or not line.startswith(('+', '-')):
        continue
    assert allowed.match(line[1:]), line[:180]
    lines += 1
assert lines > 0
old_preview = json.loads(subprocess.check_output(
    ['git', 'show', f'{base}:src/data/preview-copy.json'], cwd=root, text=True))
new_preview = json.loads((root / 'src/data/preview-copy.json').read_text())
old_method = old_preview['/methodology']['html']
assert old_method.count('Published: March 15, 2026') == 1
old_preview['/methodology']['html'] = old_method.replace(
    'Published: March 15, 2026', 'Published: March 1, 2026')
old_terms = ('AutonomyBridge provides commercial leadership for organizations with sales, earned revenue, partnership or business development needs, including fractional sales leadership for startups and small and medium-sized businesses. It also provides AI consulting and implementation for businesses and nonprofits, and publishes research.')
new_terms = ('Autonomy Bridge provides commercialization and revenue leadership for B2B startups, defined fundraising operations work for nonprofits, and fractional sales leadership for established businesses. It also publishes research.')
assert old_preview['/terms-of-use']['html'].count(old_terms) == 1
old_preview['/terms-of-use']['html'] = old_preview['/terms-of-use']['html'].replace(old_terms, new_terms, 1)
assert old_preview == new_preview
print(json.dumps({'passed': True, 'source_files': len(changed),
                  'changed_date_lines': lines, 'methodology_visible_date_only': True,
                  'terms_offer_only': True}))
