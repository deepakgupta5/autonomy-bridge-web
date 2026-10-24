"""Audit the local Step 6A build's discovery and entity output."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json
import os
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = Path(os.environ.get('AB_STEP6A_DIST', ROOT / 'dist'))
ORIGIN = 'https://autonomybridge.com'
ORG = ORIGIN + '#organization'
WEBSITE = ORIGIN + '#website'
PERSON = ORIGIN + '/about#deepak-gupta'
PENDING = 'Revision prepared for release; publication pending.'
CORE_WEBSITE = {'/', '/startups', '/nonprofits', '/sales-leadership', '/about',
                '/contact', '/research', '/commercial-leadership', '/ai-consulting', '/advisory'}
SERVICES = {'/startups', '/nonprofits', '/sales-leadership'}
BRIDGES = {'/commercial-leadership', '/ai-consulting', '/advisory'}
RESERVED = ['/wp-admin/', '/admin/', '/temp/', '/drafts/', '/search?query', '/checkout/']
AGENTS = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User',
          'Claude-SearchBot', 'PerplexityBot', 'GPTBot', 'Google-Extended',
          'ClaudeBot', 'UnknownCrawler']


class Page(HTMLParser):
    def __init__(self, source: str):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.lang = ''
        self.meta = {}
        self.canonical = []
        self.scripts = []
        self.headings = []
        self.main_text = []
        self.main_links = []
        self.in_title = False
        self.in_script = False
        self.in_main = False
        self.script_data = ''
        self.heading = None
        self.heading_text = ''
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang', '')
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            self.meta[a.get('name') or a.get('property')] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a.get('href', ''))
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_script = True
            self.script_data = ''
        if tag == 'main':
            self.in_main = True
        if self.in_main and tag == 'a' and a.get('href'):
            self.main_links.append(a['href'])
        if self.in_main and tag in ('h1', 'h2', 'h3'):
            self.heading = tag
            self.heading_text = ''

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.in_script:
            self.scripts.append(json.loads(self.script_data))
            self.in_script = False
        if self.heading == tag:
            self.headings.append((tag, ' '.join(self.heading_text.split())))
            self.heading = None
        if tag == 'main':
            self.in_main = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_script:
            self.script_data += data
        if self.in_main:
            self.main_text.append(data)
        if self.heading:
            self.heading_text += data

    @property
    def visible(self):
        return ' '.join(' '.join(self.main_text).split())


def route_for(path: Path) -> str:
    relative = path.relative_to(DIST).as_posix()
    return '/' if relative == 'index.html' else '/' + relative.removesuffix('.html')


def robots_groups(text: str):
    groups = []
    agents = []
    rules = []

    def save():
        if agents:
            groups.append((agents.copy(), rules.copy()))

    for raw in text.splitlines() + ['']:
        line = raw.split('#', 1)[0].strip()
        if not line:
            save()
            agents, rules = [], []
            continue
        key, _, value = line.partition(':')
        key, value = key.lower().strip(), value.strip()
        if key == 'user-agent':
            if rules:
                save()
                agents, rules = [], []
            agents.append(value.lower())
        elif key in ('allow', 'disallow'):
            assert agents, f'orphan robots rule: {line}'
            rules.append((key, value))
    return groups


def crawl_allowed(groups, agent: str, path: str) -> bool:
    named = [rules for names, rules in groups if agent.lower() in names]
    selected = named if named else [rules for names, rules in groups if '*' in names]
    assert selected, agent
    matches = [(len(pattern), kind == 'allow') for rules in selected
               for kind, pattern in rules if pattern and path.startswith(pattern)]
    return max(matches, default=(0, True))[1]


pages = {route_for(path): Page(path.read_text()) for path in DIST.rglob('*.html')}
assert len(pages) == 163, len(pages)
for route, page in pages.items():
    assert page.lang == 'en', route
    assert page.title.strip() and page.meta.get('description', '').strip(), route
    assert page.canonical == [ORIGIN + ('' if route == '/' else route)], route
    assert page.meta.get('robots') == 'noindex,nofollow', route
    assert page.meta.get('og:url') == page.canonical[0], route
    assert page.meta.get('og:title') and page.meta.get('og:description'), route
    assert page.meta.get('og:type') in {'website', 'article'}, route
    assert page.meta['og:type'] == ('website' if route in CORE_WEBSITE else 'article'), route
    ids = [node['@id'] for node in page.scripts if '@id' in node]
    assert len(ids) == len(set(ids)), route
    assert sum(node.get('@type') == 'Organization' for node in page.scripts) == 1, route
    assert sum(node.get('@type') == 'WebSite' for node in page.scripts) == 1, route
    organization = next(node for node in page.scripts if node.get('@type') == 'Organization')
    assert organization['@id'] == ORG and organization['sameAs'] == ['https://www.linkedin.com/company/autonomy-bridge/'], route
    assert any(node.get('@id') == WEBSITE for node in page.scripts), route

for route in SERVICES:
    page = pages[route]
    web = next(node for node in page.scripts if node.get('@type') == 'WebPage')
    service = next(node for node in page.scripts if node.get('@type') == 'Service')
    url = ORIGIN + route
    assert web['@id'] == url and web['url'] == url
    assert service['@id'] == url + '#service' and service['url'] == url
    assert web['mainEntity'] == {'@id': service['@id']}
    assert service['mainEntityOfPage'] == {'@id': web['@id']}
    assert web['isPartOf'] == {'@id': WEBSITE}
    assert service['provider'] == {'@id': ORG}
    assert web['description'] == service['description']
    assert service['description'] in page.visible, route
    assert web['name'] in [text for kind, text in page.headings if kind == 'h1'], route
    for forbidden in ('aggregateRating', 'review', 'offers', 'price', 'areaServed'):
        assert forbidden not in service, (route, forbidden)

about = pages['/about']
person = next(node for node in about.scripts if node.get('@type') == 'Person')
about_page = next(node for node in about.scripts if node.get('@type') == 'AboutPage')
assert person['@id'] == PERSON and person['name'] == 'Deepak Gupta'
assert person['sameAs'] == ['https://www.linkedin.com/in/deepakgupta5/']
assert person['worksFor'] == {'@id': ORG}
assert about_page['@id'] == ORIGIN + '/about' and about_page['mainEntity'] == {'@id': PERSON}
assert about_page['description'] in about.visible
assert about_page['name'] in [text for kind, text in about.headings if kind == 'h1']
contact = pages['/contact']
contact_page = next(node for node in contact.scripts if node.get('@type') == 'ContactPage')
assert contact_page['@id'] == ORIGIN + '/contact'
assert contact_page['description'] in contact.visible
assert contact_page['name'] in [text for kind, text in contact.headings if kind == 'h1']
for route in BRIDGES:
    assert not any(node.get('@type') == 'Service' for node in pages[route].scripts), route

# Extractability checks use only static main HTML; no client script is run.
answer_sections = {
    '/startups': ['The pilot worked. Why haven’t they bought?',
                  'Every prospect wants something different. Which market are we building for?',
                  'Start with the work in front of you'],
    '/nonprofits': ['Who should we give attention to before the next appeal?',
                    'The donor update is due. Who is bringing it together?',
                    'You keep the donor relationship. I lead the agreed work around it.'],
    '/sales-leadership': ['We have salespeople. Why am I still the sales manager?',
                          'The forecast says it will close. What has the customer actually committed to?',
                          'Start with a Fractional Sales Leadership Mandate and 90-Day Commercial Plan'],
    '/about': ['I’m Deepak Gupta. I lead the work we agree needs an owner.',
               'My work through Autonomy Bridge', 'You work directly with me'],
    '/contact': ['What needs your attention?', 'Tell me what you’re dealing with',
                 'What happens next'],
    '/research': ['Research & Resources', 'Read the evidence alongside the conclusion'],
}
for route, names in answer_sections.items():
    headings = {text for _, text in pages[route].headings}
    assert all(name in headings for name in names), route
for route in SERVICES:
    assert 'Illustrative buyer questions throughout this page.' in pages[route].visible, route
assert 'Fictional scenario demonstrating an approach. This is not a client engagement or an achieved fundraising result.' in pages['/nonprofits'].visible
for route in ('/startups', '/sales-leadership', '/about'):
    assert 'distinct from Autonomy Bridge engagements' in pages[route].visible, route
assert 'USD $75 million in annual gross merchandise value (GMV) by year four' in about.visible
assert '/about' in contact.main_links and '/privacy-policy' in contact.main_links
assert 'The first conversation is free. I’ll respond within 48 hours.' in contact.visible
assert {'/insights', '/market-overview', '/frameworks', '/use-cases',
        '/case-studies', '/glossary', '/methodology'} <= set(pages['/research'].main_links)

llms = (DIST / 'llms.txt').read_text()
assert re.search(r'(?m)^# Autonomy Bridge$', llms)
assert not re.search(r'/commercial-leadership|/ai-consulting|/advisory|AI Consulting', llms, re.I)
llms_paths = [urlparse(url).path for url in re.findall(r'https://autonomybridge\.com/[^\s]+', llms)]
assert len(llms_paths) == len(set(llms_paths)) and all(path in pages for path in llms_paths)
assert SERVICES | {'/about', '/contact', '/research', '/bespoke-research'} <= set(llms_paths)
for phrase in ('donor relationships and solicitation decisions', 'Published Research is separate from paid engagements'):
    assert phrase in llms

robots = (DIST / 'robots.txt').read_text()
groups = robots_groups(robots)
assert robots.count('Sitemap: https://autonomybridge.com/sitemap-index.xml') == 1
public_routes = ['/startups', '/nonprofits', '/sales-leadership', '/research',
                 '/case-studies', '/insights/why-robotics-pilots-fail-to-scale',
                 '/commercial-leadership', '/ai-consulting', '/advisory',
                 '/_astro/index.css']
for agent in AGENTS:
    for path in public_routes:
        assert crawl_allowed(groups, agent, path), (agent, path)
    for path in RESERVED:
        assert not crawl_allowed(groups, agent, path), (agent, path)

report = {
    'passed': True,
    'pages': len(pages),
    'metadata_complete': len(pages),
    'local_noindex_pages': len(pages),
    'website_og_routes': sorted(CORE_WEBSITE),
    'service_pages': sorted(SERVICES),
    'person_id': PERSON,
    'llms_destinations': sorted(llms_paths),
    'robots_agents_tested': AGENTS,
    'robots_public_paths_tested': public_routes,
    'robots_reserved_paths_tested': RESERVED,
    'static_answer_sections': answer_sections,
}
output = Path(os.environ.get('AB_STEP6A_AUDIT_REPORT', ROOT / 'docs/step-6a/STEP6A_AUDIT.json'))
output.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({k: report[k] for k in ('passed', 'pages', 'metadata_complete',
                                          'local_noindex_pages', 'service_pages', 'person_id')}))
