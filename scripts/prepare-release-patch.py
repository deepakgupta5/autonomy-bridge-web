"""Print a review-only activation diff; never edit files or deploy."""
import argparse
import difflib
import re
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--origin', required=True, choices=['https://autonomybridge.com', 'https://www.autonomybridge.com'])
parser.add_argument('--site-id', required=True)
parser.add_argument('--email-only', action='store_true', help='Prepare release with form unavailable and email alternative visible')
args = parser.parse_args()
if not re.fullmatch(r'[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}', args.site_id):
    parser.error('Use the independently verified Netlify site UUID, never a guessed value')
root = Path(__file__).resolve().parents[1]
for name in ['config/deployment-policy.mjs', 'netlify.toml']:
    old = (root / name).read_text()
    if name.endswith('.mjs'):
        if "mode: 'local'" not in old:
            parser.error('Generate only from the locked local configuration')
        new = old.replace("mode: 'local'", "mode: 'production'").replace("origin: ''", f"origin: '{args.origin}'").replace("siteId: ''", f"siteId: '{args.site_id}'")
        if not args.email_only:
            new = new.replace('formEnabled: false', 'formEnabled: true')
    else:
        new = '\n'.join(line for line in old.split('\n') if 'ignore = "exit 0"' not in line).replace('skip_processing = true', 'skip_processing = false')
    print(''.join(difflib.unified_diff(old.splitlines(True), new.splitlines(True), fromfile='a/'+name, tofile='b/'+name)), end='')
