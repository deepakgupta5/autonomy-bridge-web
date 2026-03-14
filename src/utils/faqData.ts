export function buildFaqData(decisionBoundaries: { question: string; answer: string }[]) {
  return decisionBoundaries.map(({ question, answer }) => ({ question, answer }));
}
