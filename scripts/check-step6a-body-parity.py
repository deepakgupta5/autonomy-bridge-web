"""Compare visible main text with the independently built accepted Step 6 source."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys


class MainText(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.parts = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        if tag == 'main':
            self.in_main = True

    def handle_endtag(self, tag):
        if tag == 'main':
            self.in_main = False

    def handle_data(self, data):
        if self.in_main:
            self.parts.append(data)

    def text(self):
        return ' '.join(' '.join(self.parts).split())


current = Path(__file__).resolve().parents[1] / 'dist'
baseline = Path(sys.argv[1])
now = {p.relative_to(current): MainText(p.read_text()).text() for p in current.rglob('*.html')}
before = {p.relative_to(baseline): MainText(p.read_text()).text() for p in baseline.rglob('*.html')}
assert now.keys() == before.keys(), {'added': sorted(now.keys() - before.keys()),
                                    'removed': sorted(before.keys() - now.keys())}
changed = [str(route) for route in now if now[route] != before[route]]
assert changed == ['research.html'], changed

old_block = (
    '<p>For help applying analysis to a decision or carrying out a project, explore Commercial Leadership or AI Consulting &amp; Implementation.</p>\n'
    '<p class="service-links"><a href="/commercial-leadership">Commercial Leadership</a> <a href="/ai-consulting">AI Consulting &amp; Implementation</a></p>\n'
    '<p><a class="copy-button" href="/contact">Discuss your business challenge</a></p>'
)
new_block = (
    '<p>For help with a commercial priority, fundraising operations or sales leadership, explore the page that fits your situation.</p>\n'
    '<p class="service-links"><a href="/startups">Startups</a> <a href="/nonprofits">Nonprofits</a> <a href="/sales-leadership">Sales Leadership</a></p>\n'
    '<p><a class="copy-button" href="/contact">Discuss your challenge</a></p>'
)
main_pattern = re.compile(r'<main\b[^>]*>.*?</main>', re.S)
baseline_html = (baseline / 'research.html').read_text()
current_html = (current / 'research.html').read_text()
baseline_main = main_pattern.findall(baseline_html)
current_main = main_pattern.findall(current_html)
assert len(baseline_main) == len(current_main) == 1
assert baseline_main[0].count(old_block) == 1
assert current_main[0].count(new_block) == 1
assert current_main[0].replace(new_block, old_block) == baseline_main[0]
print(json.dumps({'passed': True, 'body_text_equal_pages': len(now) - 1,
                  'research_exact_block_only': True,
                  'baseline': str(baseline), 'changed_main_text': changed}))
