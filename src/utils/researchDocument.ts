export interface ResearchHeading {
  level: number;
  text: string;
  id?: string;
  raw: string;
}

export interface ResearchSection {
  heading: ResearchHeading;
  blocks: string[];
}

export interface ResearchDocument {
  title: ResearchHeading;
  headerBlocks: string[];
  sections: ResearchSection[];
}

export interface TierLine {
  tierNumber: string;
  heading: string;
  body: string;
  raw: string;
}

export interface FrameworkLine {
  title: string;
  href: string;
  citation: string;
  body: string;
  raw: string;
}

export interface StageLine {
  stageNumber: string;
  heading: string;
  body: string;
  raw: string;
}

export interface IntegrationSequence {
  lead: string;
  steps: string[];
  raw: string;
}

export interface CitationRow {
  raw: string;
  leadingText: string;
  url?: string;
}

export interface CodeFenceBlock {
  language: string;
  content: string;
  raw: string;
}

export interface NamedAnalyticalItem {
  label: string;
  body: string;
  raw: string;
}

const HEADING_PATTERN = /^(#{1,6})\s+(.+?)(?:\s+\{#([^}]+)\})?$/;
const PROVENANCE_PATTERN = /(\(Autonomy Bridge proprietary analysis, \d{4}\))\s*$/;
const TIER_PATTERN = /^\*\*Tier\s+(\d+)\s+—\s+([^:]+):\*\*\s+([\s\S]+)$/;
const FRAMEWORK_PATTERN = /^\*\*\[(.+?)\]\(([^)]+)\)\s+\[(C\d+)\]\*\*\s+—\s+([\s\S]+)$/;
const STAGE_PATTERN = /^\*\*Stage\s+(\d+)\s+—\s+(.+?)\.\*\*\s+([\s\S]+)$/;
const FAQ_QUESTION_PATTERN = /^\*\*(.+?)\*\*$/;
const FAQ_INLINE_PATTERN = /^\*\*(.+?)\*\*\s*\n([\s\S]+)$/;
const SEQUENCE_PATTERN = /^(The standard integration sequence[^:]*:)\s+([\s\S]+)$/;
const NAMED_ITEM_PATTERN = /^\*\*([^*]+?)\.\*\*\s+([\s\S]+)$/;

function normalizeNewlines(markdown: string): string {
  return markdown.replace(/\r\n/g, "\n").trim();
}

export function parseHeadingLine(block: string): ResearchHeading | null {
  const match = HEADING_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, hashes, text, id] = match;
  return {
    level: hashes.length,
    text: text.trim(),
    id: id?.trim(),
    raw: block,
  };
}

export function splitMarkdownBlocks(markdown: string): string[] {
  const normalized = normalizeNewlines(markdown);
  if (!normalized) {
    return [];
  }

  const blocks: string[] = [];
  const lines = normalized.split("\n");
  let current: string[] = [];
  let inCodeFence = false;

  const flush = () => {
    if (current.length === 0) {
      return;
    }

    const block = current.join("\n").trim();
    if (block) {
      blocks.push(block);
    }
    current = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inCodeFence && trimmed === "") {
      flush();
      continue;
    }

    current.push(line);

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
    }
  }

  flush();

  return blocks;
}

export function parseResearchDocument(markdown: string): ResearchDocument {
  const blocks = splitMarkdownBlocks(markdown);

  const headingBlocks = blocks.filter((block) => parseHeadingLine(block)?.level === 1);
  if (headingBlocks.length === 0) {
    throw new Error("Research document is missing an H1 heading block.");
  }

  const titleHeading = parseHeadingLine(headingBlocks[0]);
  if (!titleHeading) {
    throw new Error("Failed to parse research document H1 heading.");
  }

  const titleIndex = blocks.findIndex((block) => block === headingBlocks[0]);
  const afterTitle = blocks.slice(titleIndex + 1);

  const sections: ResearchSection[] = [];
  const headerBlocks: string[] = [];
  let currentSection: ResearchSection | null = null;

  for (const block of afterTitle) {
    const heading = parseHeadingLine(block);
    if (heading && heading.level === 2) {
      currentSection = {
        heading,
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.blocks.push(block);
      continue;
    }

    headerBlocks.push(block);
  }

  return {
    title: titleHeading,
    headerBlocks,
    sections,
  };
}

export function splitTrailingProvenance(text: string): {
  content: string;
  provenance?: string;
} {
  const trimmed = text.trim();
  const match = PROVENANCE_PATTERN.exec(trimmed);
  if (!match) {
    return { content: trimmed };
  }

  const provenance = match[1];
  const content = trimmed.slice(0, match.index).trim();

  return {
    content,
    provenance,
  };
}

export function isPotentialProvenance(text: string): boolean {
  return PROVENANCE_PATTERN.test(text.trim());
}

export function isAnalyticalQuestionChain(text: string): boolean {
  const questionCount = (text.match(/\?/g) ?? []).length;
  return questionCount >= 3 && text.includes(":");
}

export function isHorizontalRuleBlock(block: string): boolean {
  return block.trim() === "---";
}

export function isUtilityLinkRow(block: string): boolean {
  const trimmed = block.trim();
  return trimmed.startsWith("**[") && trimmed.includes("](") && trimmed.includes("→");
}

export function isPotentialTierLine(block: string): boolean {
  return /^\*\*Tier\s+\d+\s+—\s+/.test(block.trim()) || /^Tier\s+\d+\s+—\s+/.test(block.trim());
}

export function parseTierLine(block: string): TierLine | null {
  const match = TIER_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, tierNumber, heading, body] = match;
  return {
    tierNumber,
    heading: heading.trim(),
    body: body.trim(),
    raw: block,
  };
}

export function isPotentialFrameworkLine(block: string): boolean {
  const trimmed = block.trim();
  return trimmed.startsWith("**[") && trimmed.includes(" [C") && trimmed.includes("]**") && trimmed.includes(" — ");
}

export function parseFrameworkLine(block: string): FrameworkLine | null {
  const match = FRAMEWORK_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, title, href, citation, body] = match;
  return {
    title: title.trim(),
    href: href.trim(),
    citation: citation.trim(),
    body: body.trim(),
    raw: block,
  };
}

export function isPotentialIntegrationSequence(block: string): boolean {
  const trimmed = block.trim();
  return trimmed.startsWith("The standard integration sequence") && trimmed.includes(":") && trimmed.includes("→");
}

export function parseIntegrationSequence(block: string): IntegrationSequence | null {
  const match = SEQUENCE_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, lead, sequenceText] = match;
  const steps = sequenceText
    .split(/\s+→\s+/)
    .map((step) => step.trim())
    .filter(Boolean);

  if (steps.length === 0) {
    return null;
  }

  return {
    lead: lead.trim(),
    steps,
    raw: block,
  };
}

export function isPotentialStageLine(block: string): boolean {
  return /^\*\*Stage\s+\d+\s+—\s+/.test(block.trim()) || /^Stage\s+\d+\s+—\s+/.test(block.trim());
}

export function parseStageLine(block: string): StageLine | null {
  const match = STAGE_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, stageNumber, heading, body] = match;
  return {
    stageNumber,
    heading: heading.trim(),
    body: body.trim(),
    raw: block,
  };
}

export function isPotentialFaqQuestion(block: string): boolean {
  return /^\*\*.+\*\*$/.test(block.trim());
}

export function parseFaqQuestion(block: string): string | null {
  const match = FAQ_QUESTION_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  return match[1].trim();
}

export function parseFaqInlineBlock(block: string): { question: string; answer: string } | null {
  const match = FAQ_INLINE_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, question, answer] = match;
  return {
    question: question.trim(),
    answer: answer.trim(),
  };
}

export function isPotentialNamedAnalyticalItem(block: string): boolean {
  return /^\*\*[^*]+\.\*\*\s+/.test(block.trim());
}

export function parseNamedAnalyticalItem(block: string): NamedAnalyticalItem | null {
  const match = NAMED_ITEM_PATTERN.exec(block.trim());
  if (!match) {
    return null;
  }

  const [, label, body] = match;
  return {
    label: label.trim(),
    body: body.trim(),
    raw: block,
  };
}

export function isPotentialCitationRow(block: string): boolean {
  return /^C\d+\s+—\s+/.test(block.trim());
}

export function parseCitationRow(block: string): CitationRow | null {
  const trimmed = block.trim();
  if (!isPotentialCitationRow(trimmed)) {
    return null;
  }

  const urlMatch = trimmed.match(/https?:\/\/\S+$/);
  const url = urlMatch?.[0];

  if (!url) {
    return {
      raw: trimmed,
      leadingText: trimmed,
    };
  }

  const leadingText = trimmed.slice(0, trimmed.length - url.length).trimEnd();
  return {
    raw: trimmed,
    leadingText,
    url,
  };
}

export function parseCodeFenceBlock(block: string): CodeFenceBlock | null {
  const trimmed = block.trim();
  if (!trimmed.startsWith("```")) {
    return null;
  }

  const lines = trimmed.split("\n");
  if (lines.length < 2) {
    return null;
  }

  const firstLine = lines[0] ?? "";
  const lastLine = lines[lines.length - 1] ?? "";

  if (!firstLine.startsWith("```") || !lastLine.startsWith("```")) {
    return null;
  }

  return {
    language: firstLine.slice(3).trim(),
    content: lines.slice(1, -1).join("\n"),
    raw: block,
  };
}
