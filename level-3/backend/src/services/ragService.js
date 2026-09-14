// ragService.js — Track A (Node.js)
// Lab 7: Commerce RAG — Embed → Retrieve → Generate

const llm = require('./llmService');

const vectorStore = new Map(); // productId → float[]
const productStore = new Map(); // productId → product
let indexed = false;

// TODO Lab 7 Step 4: Write the RAG answer generation system prompt.
const RAG_SYSTEM = `TODO: Write RAG system prompt. Answer using ONLY retrieved products.`;

// TODO Lab 7 Step 1: INDEX — embed all products at startup.
async function indexCatalog(products) {
  console.log(`🔍 RagService: indexing ${products.length} products...`);
  // For each product: build text, call llm.embed(text), store in vectorStore
  indexed = true;
  console.log(`✅ RagService: indexed ${vectorStore.size} products`);
}

// TODO Lab 7 Step 2: RETRIEVE — cosine similarity search.
async function retrieve(query, topK) {
  if (!indexed) throw new Error('Not indexed. Run POST /api/catalog/generate first.');
  const queryVec = await llm.embed(query);
  // Compute cosineSimilarity(queryVec, stored vector) for all products
  // Return top-K products sorted by similarity descending
  return [];
}

// TODO Lab 7 Step 3: GENERATE — full RAG pipeline.
async function search(query) {
  const retrieved = await retrieve(query, 3);
  // Build context from retrieved products, call LLM, return { query, answer, sources, products }
  return { query, answer: 'TODO: implement search()', sources: [], products: [] };
}

// TODO Lab 7 Step 2b: Cosine similarity. dot(a,b) / (|a| * |b|)
function cosineSimilarity(a, b) {
  return 0; // TODO
}

function buildProductText(p) {
  return `${p.name}. ${p.roast} roast. Origin: ${p.origin}. Farmer: ${p.farmer}. `+
    `Altitude: ${p.altitude}. Flavors: ${(p.flavor_notes||[]).join(', ')}. Best for: ${p.best_for}.`;
}

async function reindex(products) { vectorStore.clear(); productStore.clear(); indexed = false; await indexCatalog(products); }

module.exports = { indexCatalog, retrieve, search, reindex };
