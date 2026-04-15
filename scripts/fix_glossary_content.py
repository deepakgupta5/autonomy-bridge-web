#!/usr/bin/env python3
"""
One-shot content sweep for src/content/glossary/*.md:

1. Replace em-dash and en-dash with regular punctuation (Rule 38)
   - em-dash  -> ' - '   (space hyphen space)
   - en-dash  -> '-'     (hyphen, tight; handles 35-50% ranges)

2. Fix "Related terms:" markdown link labels from raw slugs
   to human-readable titles pulled from each sibling file's
   frontmatter `title`.
   e.g. [removable-labor-share](/glossary/removable-labor-share)
        becomes [Removable Labor Share](/glossary/removable-labor-share)

Safe to re-run. Prints a diff summary.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GLOSS = ROOT / "src" / "content" / "glossary"

EM = "\u2014"  # em-dash
EN = "\u2013"  # en-dash


def read_frontmatter_title(path: Path) -> str:
    """Pull `title` from YAML frontmatter without a full YAML parser."""
    text = path.read_text(encoding="utf-8")
    in_fm = False
    for line in text.splitlines():
        if line.strip() == "---":
            if not in_fm:
                in_fm = True
                continue
            else:
                break
        if in_fm and line.lstrip().startswith("title:"):
            val = line.split(":", 1)[1].strip()
            if (val.startswith('"') and val.endswith('"')) or (
                val.startswith("'") and val.endswith("'")
            ):
                val = val[1:-1]
            return val
    # Fallback: title-case the slug
    return path.stem.replace("-", " ").title()


def build_slug_map() -> dict:
    m = {}
    for p in sorted(GLOSS.glob("*.md")):
        m[p.stem] = read_frontmatter_title(p)
    return m


LINK_RE = re.compile(r"\[([a-z0-9][a-z0-9\-]*)\]\((/glossary/[a-z0-9\-]+)\)")


def rewrite_related_terms(text: str, slug_map: dict) -> tuple[str, int]:
    """Replace any [slug](/glossary/slug) where label is a slug with
    [Human Title](/glossary/slug). Returns new text + count."""
    count = 0

    def repl(m):
        nonlocal count
        label = m.group(1)
        href = m.group(2)
        # Only rewrite if label looks like a slug (contains hyphen OR matches
        # a known glossary slug exactly)
        if "-" in label or label in slug_map:
            # Resolve title from slug map; href slug is authoritative
            href_slug = href.rsplit("/", 1)[-1]
            title = slug_map.get(href_slug) or slug_map.get(label)
            if title and title.strip():
                count += 1
                return f"[{title}]({href})"
        return m.group(0)

    new = LINK_RE.sub(repl, text)
    return new, count


def sweep_one(path: Path, slug_map: dict) -> dict:
    before = path.read_text(encoding="utf-8")

    # 1. dash replacements (char-only; do NOT collapse whitespace,
    # YAML list items use leading "  - " indentation that must survive)
    after = before.replace(EM, " - ").replace(EN, "-")

    # 2. related-terms label rewrite
    after, rel_rewrites = rewrite_related_terms(after, slug_map)

    changed = after != before
    if changed:
        path.write_text(after, encoding="utf-8")

    return {
        "path": str(path.relative_to(ROOT)),
        "changed": changed,
        "em_count": before.count(EM),
        "en_count": before.count(EN),
        "rel_rewrites": rel_rewrites,
    }


def main():
    apply = "--apply" in sys.argv
    if not apply:
        print("(dry run; pass --apply to write)")
    slug_map = build_slug_map()
    print(f"Loaded {len(slug_map)} glossary slugs.")

    total_changed = 0
    total_em = 0
    total_en = 0
    total_rel = 0

    for p in sorted(GLOSS.glob("*.md")):
        before = p.read_text(encoding="utf-8")
        # Simulate
        after = before.replace(EM, " - ").replace(EN, "-")
        after, rel = rewrite_related_terms(after, slug_map)

        changed = after != before
        em = before.count(EM)
        en = before.count(EN)
        if changed:
            total_changed += 1
            total_em += em
            total_en += en
            total_rel += rel

        if apply and changed:
            p.write_text(after, encoding="utf-8")

    print(f"Files changed:        {total_changed}")
    print(f"Em-dashes replaced:   {total_em}")
    print(f"En-dashes replaced:   {total_en}")
    print(f"Related-terms links:  {total_rel}")


if __name__ == "__main__":
    main()
