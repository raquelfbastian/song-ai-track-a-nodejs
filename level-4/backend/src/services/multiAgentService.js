// multiAgentService.js — Track A (Node.js) — Lab 10: Multi-Agent Catalog
// TODO: Write 3 specialist agent prompts and implement the runner functions.
// Use Promise.all() for parallel execution (Node.js equivalent of CompletableFuture).

const llm = require('./llmService');

const CATALOG_AGENT = `TODO: CatalogAgent — validates product data. JSON only.`;
const CONTENT_AGENT = `TODO: ContentAgent — brand-voice content (description + hook). JSON only.`;
const SEO_AGENT     = `TODO: SeoAgent — seo_title + meta_description. JSON only.`;

async function runPipeline(products) {
  console.log('🤖 Orchestrator: starting multi-agent catalog pipeline...');
  const start = Date.now();
  // TODO: Use Promise.all() to process all products in parallel
  // Each product goes through all 3 agents
  const results = []; // TODO: implement
  console.log(`✅ Orchestrator: complete in ${Date.now()-start}ms`);
  return { status: 'complete', productsProcessed: results.length, results };
}

module.exports = { runPipeline };
