function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderInlineMarkdown(input: string): string {
  const source = input ?? "";
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  let output = "";
  let cursor = 0;

  for (const match of source.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    const [full, label, href] = match;

    output += escapeHtml(source.slice(cursor, index));
    output += `<a href="${escapeAttribute(href)}">${escapeHtml(label)}</a>`;
    cursor = index + full.length;
  }

  output += escapeHtml(source.slice(cursor));

  output = output
    .replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");

  return output;
}
