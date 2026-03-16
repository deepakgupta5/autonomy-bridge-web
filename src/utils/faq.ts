import type { FaqSchemaItem } from "./schema";

const FAQ_SECTION_HEADING = /^##\s+(Frequently Asked Questions|FAQ)\s*$/im;
const TOP_LEVEL_HEADING = /^##\s+/m;
const QUESTION_LINE = /^\s*\*\*(.+?)\*\*\s*(.*)$/;

function stripMarkdown(value: string): string {
  return value
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaqSection(markdown: string): string {
  const headingMatch = FAQ_SECTION_HEADING.exec(markdown);
  if (!headingMatch || headingMatch.index < 0) {
    return "";
  }

  const sectionStart = headingMatch.index + headingMatch[0].length;
  const remainder = markdown.slice(sectionStart);
  const nextHeadingMatch = TOP_LEVEL_HEADING.exec(remainder);
  if (!nextHeadingMatch || nextHeadingMatch.index < 0) {
    return remainder;
  }

  return remainder.slice(0, nextHeadingMatch.index);
}

export function extractFaqItemsFromMarkdown(markdown: string): FaqSchemaItem[] {
  const section = extractFaqSection(markdown.replace(/\r\n/g, "\n"));
  if (!section.trim()) {
    return [];
  }

  const lines = section.split("\n");
  const items: FaqSchemaItem[] = [];
  let currentQuestion = "";
  let answerBuffer: string[] = [];

  const flushCurrent = () => {
    const question = stripMarkdown(currentQuestion);
    const answer = stripMarkdown(answerBuffer.join(" ").trim());
    if (question && answer) {
      items.push({ question, answer });
    }
    currentQuestion = "";
    answerBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (currentQuestion) {
        answerBuffer.push(" ");
      }
      continue;
    }

    const questionMatch = QUESTION_LINE.exec(line);
    if (questionMatch) {
      if (currentQuestion) {
        flushCurrent();
      }
      currentQuestion = questionMatch[1].trim();
      if (questionMatch[2]) {
        answerBuffer.push(questionMatch[2].trim());
      }
      continue;
    }

    if (currentQuestion) {
      answerBuffer.push(line);
    }
  }

  if (currentQuestion) {
    flushCurrent();
  }

  return items;
}
