// contentService.js — Track A (Node.js)
// Lab 4: Product Content Studio
// No pre-filled answers in this lab. Write BRAND_VOICE and buildContentPrompt() yourself.

const llm = require('./llmService');

// TODO Lab 4 Step 1: Write your brand voice.
// Rules: warm + proud, celebrate farmer, banned words list,
// specific over vague, persona (urban Filipino 28-40), farmer by name, JSON only.
const BRAND_VOICE = `TODO: Write your Kape Ko brand voice system prompt here.`;

async function enrichProduct(product) {
  console.log(`📝 ContentService: enriching → ${product.name}`);
  // TODO Lab 4 Step 3: call llm.complete(BRAND_VOICE, buildContentPrompt(product))
  let rawJson = await llm.complete(BRAND_VOICE, buildContentPrompt(product));
  rawJson = rawJson.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const content = JSON.parse(rawJson);
  return { ...product, ...content };
}

// TODO Lab 4 Step 2: Write the content prompt. It is blank — no pre-filled answer.
// Request: seo_title, meta_description, product_description, marketing_hook, feature_bullets, pairing_suggestion
function buildContentPrompt(product) {
  return 'TODO: write your content prompt here';
}

module.exports = { enrichProduct };
