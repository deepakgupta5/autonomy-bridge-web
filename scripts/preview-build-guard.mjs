if (process.env.NETLIFY || process.env.CI) {
  console.error('Preview-only branch: remote builds disabled pending publication approval. Build locally.');
  process.exit(1);
}
