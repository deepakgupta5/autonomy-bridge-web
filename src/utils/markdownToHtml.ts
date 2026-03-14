import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

function stripFrontmatter(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  if (lines.length > 0 && lines[0].trim() === "---") {
    for (let i = 1; i < lines.length; i += 1) {
      if (lines[i].trim() === "---") {
        return lines.slice(i + 1).join("\n");
      }
    }
  }
  return markdown;
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const content = stripFrontmatter(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  return String(file);
}
