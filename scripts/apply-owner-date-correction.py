"""Apply the owner's 2026-03-01 correction to the 86 revised Research sources and Methodology.

Only source-date metadata and explicit Created/Updated/Published provenance lines are
changed. Dates inside analysis, citations and other Research sources are untouched.
"""
from __future__ import annotations

from pathlib import Path
import argparse
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-03-01'
COLLECTIONS = {
    'case-studies': 'caseStudies', 'insights': 'insights',
    'market-overview': 'marketOverview', 'frameworks': 'frameworks',
    'use-cases': 'useCases', 'glossary': 'glossary',
}
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--apply', action='store_true', help='write the narrow source corrections')
args = parser.parse_args()
routes = json.loads((ROOT / 'config/material-research-revisions.json').read_text())
assert len(routes) == 86 and len(set(routes)) == 86
targets = []
for route in routes:
    parts = route.strip('/').split('/')
    targets.append((route, ROOT / 'src/content' / COLLECTIONS[parts[0]] /
                    f'{parts[1] if len(parts) > 1 else "hub"}.md'))
targets.append(('/methodology', ROOT / 'src/content/pages/methodology.md'))
assert len({path for _, path in targets}) == len(targets)

date_value = re.compile(r'^(\s*(?:created|updated|published|datePublished|dateModified):\s*["\x27]?)(\d{4}-\d{2}-\d{2})(["\x27]?\s*)$')
body_record = re.compile(r'^(Created|Updated|Published):\s*(\d{4}-\d{2}-\d{2})(\s*)$')
report = []
for route, path in targets:
    original = path.read_text()
    pieces = original.split('---', 2)
    assert len(pieces) == 3 and pieces[0] == '', path
    front_lines = pieces[1].splitlines(keepends=True)
    in_dates = False
    changes = []
    for index, line in enumerate(front_lines):
        bare = line.rstrip('\r\n')
        if bare == 'dates:':
            in_dates = True
        elif bare and not bare[0].isspace():
            in_dates = False
        match = date_value.match(bare)
        if match and ((in_dates and match[1].startswith('  ')) or
                      (not bare[0].isspace() and bare.startswith(('datePublished:', 'dateModified:')))):
            old_date = match[2]
            if old_date != DATE:
                front_lines[index] = line.replace(old_date, DATE, 1)
                changes.append({'field': match[1].split(':')[0].strip(), 'from': old_date, 'to': DATE})
    body_lines = pieces[2].splitlines(keepends=True)
    for index, line in enumerate(body_lines):
        match = body_record.match(line.rstrip('\r\n'))
        if match and match[2] != DATE:
            body_lines[index] = line.replace(match[2], DATE, 1)
            changes.append({'field': f'visible {match[1]}', 'from': match[2], 'to': DATE})
    revised = '---' + ''.join(front_lines) + '---' + ''.join(body_lines)
    assert changes, route
    assert revised != original
    if args.apply:
        path.write_text(revised)
    report.append({
        'route': route, 'source': str(path.relative_to(ROOT)), 'changes': changes,
        'before_sha256': hashlib.sha256(original.encode()).hexdigest(),
        'after_sha256': hashlib.sha256(revised.encode()).hexdigest(),
    })

result = {'approved_date': DATE, 'basis': 'owner correction in this task',
          'source_before': 'bbb1a97e52510879ad5bfd83fa9f432adad03f84',
          'research_routes': len(routes), 'methodology_routes': 1,
          'source_files': len(report), 'files': report}
if args.apply:
    output = ROOT / 'docs/step-6a/DATE_SOURCE_CORRECTIONS.json'
    output.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'applied': args.apply, 'research_routes': len(routes),
                  'source_files': len(report),
                  'metadata_and_visible_fields': sum(len(row['changes']) for row in report)}))
