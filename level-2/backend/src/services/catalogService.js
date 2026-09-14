// catalogService.js — Track A (Node.js)
// Lab 3: Product Catalog Builder
//
// Your task: write buildUserPrompt() to instruct the LLM
// to generate the Kape Ko catalog as structured JSON.
// Hint: look at the prompt pattern in the starter code — understand it, then write your own.

const fs   = require('fs');
const path = require('path');
const llm  = require('./llmService');
const CATALOG_PATH = path.join(__dirname, '../../data/catalog.json');

const SYSTEM_PROMPT = `You are a product catalog specialist for a commerce platform.
Generate realistic, commerce-ready product data.
Always respond with valid JSON only — no markdown, no explanation.`;

// TODO Lab 3 Step 2: Write your catalog prompt.
// It must: specify 6 products, include exact JSON schema (13 fields),
// and end with: Return { "products": [...] }
function buildUserPrompt() {
  return 'TODO: write your catalog prompt here';
}

async function generateCatalog() {
  console.log('🤖 CatalogService: calling LLM API...');
  let rawJson = await llm.complete(SYSTEM_PROMPT, buildUserPrompt());
  rawJson = rawJson.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const { products } = JSON.parse(rawJson);
  saveCatalog(products);
  console.log(`✅ Generated ${products.length} products → saved to data/catalog.json`);
  return products;
}

async function getCatalog() {
  if (!fs.existsSync(CATALOG_PATH)) return generateCatalog();
  const { products } = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));
  return products;
}

function saveCatalog(products) {
  const dir = path.dirname(CATALOG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CATALOG_PATH, JSON.stringify({ products }, null, 2));
}

module.exports = { generateCatalog, getCatalog };
