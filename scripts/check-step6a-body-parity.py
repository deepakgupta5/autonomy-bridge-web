"""Compare visible main text with the independently built accepted Step 6 source."""
from html.parser import HTMLParser
from pathlib import Path
import json
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
assert not changed, changed
print(json.dumps({'passed': True, 'body_text_equal_pages': len(now),
                  'baseline': str(baseline), 'changed_main_text': changed}))
