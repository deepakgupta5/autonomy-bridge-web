"""Prove the built-output audit rejects representative SEO/GEO regressions."""
from pathlib import Path
import json
import os
import shutil
import subprocess
import sys
import tempfile

root = Path(__file__).resolve().parents[1]
fixture = Path(tempfile.mkdtemp(prefix='ab-step6a-negative-'))
dist = fixture / 'dist'
shutil.copytree(root / 'dist', dist)
env = {**os.environ, 'AB_STEP6A_DIST': str(dist),
       'AB_STEP6A_AUDIT_REPORT': str(fixture / 'audit.json')}
audit = root / 'scripts/audit-step6a.py'


def run():
    return subprocess.run([sys.executable, str(audit)], env=env,
                          capture_output=True, text=True)


assert run().returncode == 0
cases = [
    ('stale legacy offer in llms', 'llms.txt',
     lambda s: s + '\n- Old offer: https://autonomybridge.com/ai-consulting\n'),
    ('wrong personal LinkedIn', 'about.html',
     lambda s: s.replace('https://www.linkedin.com/in/deepakgupta5/',
                         'https://www.linkedin.com/in/wrong-person/', 1)),
    ('contradictory service claim', 'startups.html',
     lambda s: s.replace('I work directly with B2B startups to choose where to focus, shape an offer customers can buy and lead the agreed commercial work through to a decision.',
                         'Guaranteed revenue growth from every pilot.', 1)),
    ('missing canonical', 'startups.html',
     lambda s: s.replace('<link rel="canonical"', '<link rel="not-canonical"', 1)),
    ('conflicting canonical', 'startups.html',
     lambda s: s.replace('rel="canonical" href="https://autonomybridge.com/startups"',
                         'rel="canonical" href="https://autonomybridge.com/nonprofits"', 1)),
    ('local noindex removed', 'index.html',
     lambda s: s.replace('content="noindex,nofollow"', 'content="index,follow"', 1)),
    ('audience blocked in robots', 'robots.txt',
     lambda s: s.replace('Allow: /\n', 'Allow: /\nDisallow: /startups\n', 1)),
    ('Research blocked in robots', 'robots.txt',
     lambda s: s.replace('Allow: /\n', 'Allow: /\nDisallow: /research\n', 1)),
    ('legacy offers restored in Research service block', 'research.html',
     lambda s: s.replace(
         '<p>For help with a commercial priority, fundraising operations or sales leadership, explore the page that fits your situation.</p>\n'
         '<p class="service-links"><a href="/startups">Startups</a> <a href="/nonprofits">Nonprofits</a> <a href="/sales-leadership">Sales Leadership</a></p>\n'
         '<p><a class="copy-button" href="/contact">Discuss your challenge</a></p>',
         '<p>For help applying analysis to a decision or carrying out a project, explore Commercial Leadership or AI Consulting &amp; Implementation.</p>\n'
         '<p class="service-links"><a href="/commercial-leadership">Commercial Leadership</a> <a href="/ai-consulting">AI Consulting &amp; Implementation</a></p>\n'
         '<p><a class="copy-button" href="/contact">Discuss your business challenge</a></p>', 1)),
]
for label, name, mutate in cases:
    path = dist / name
    original = path.read_text()
    changed = mutate(original)
    assert changed != original, label
    path.write_text(changed)
    result = run()
    path.write_text(original)
    assert result.returncode != 0, label

print(json.dumps({'passed': True, 'rejected_negative_controls': [label for label, _, _ in cases],
                  'fixture': str(fixture)}))
