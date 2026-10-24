"""Print a review-only activation diff; never edit files or deploy."""
import argparse
import difflib
import re
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--origin', required=True, choices=['https://autonomybridge.com', 'https://www.autonomybridge.com'])
parser.add_argument('--site-id', required=True)
parser.add_argument('--publication-date', required=True, help='Actual approved release date, YYYY-MM-DD')
parser.add_argument('--research-revision-date', required=True, help='Actual approved Research revision date, YYYY-MM-DD')
parser.add_argument('--email-only', action='store_true', help='Email-only is the required/default scope of this candidate')
args = parser.parse_args()
if not re.fullmatch(r'[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}', args.site_id):
    parser.error('Use the independently verified Netlify site UUID, never a guessed value')
import datetime
for label, value in [('Publication date', args.publication_date), ('Research revision date', args.research_revision_date)]:
    try:
        assert datetime.date.fromisoformat(value).isoformat() == value
    except (ValueError, AssertionError):
        parser.error(f'{label} must be a valid YYYY-MM-DD calendar date')
root = Path(__file__).resolve().parents[1]
for name in ['config/deployment-policy.mjs', 'netlify.toml']:
    old = (root / name).read_text()
    if name.endswith('.mjs'):
        if "mode: 'local'" not in old and "mode: 'candidate'" not in old:
            parser.error('Generate only from the locked local configuration')
        if "publicationDate: ''" not in old or 'researchRevisionDate: null' not in old:
            parser.error('Release date fields must be unset in the locked local configuration')
        new = old.replace("mode: 'local'", "mode: 'production'").replace("mode: 'candidate'", "mode: 'production'").replace("publicationDate: ''", f"publicationDate: '{args.publication_date}'").replace('researchRevisionDate: null', f"researchRevisionDate: '{args.research_revision_date}'").replace("origin: ''", f"origin: '{args.origin}'").replace("siteId: ''", f"siteId: '{args.site_id}'")
        # This candidate's notices cover email-only enquiries. Form enablement
        # requires a separate reviewed configuration and notice update.
    else:
        new = '\n'.join(line for line in old.split('\n') if 'ignore = "exit 0"' not in line).replace('skip_processing = true', 'skip_processing = false')
    print(''.join(difflib.unified_diff(old.splitlines(True), new.splitlines(True), fromfile='a/'+name, tofile='b/'+name)), end='')
