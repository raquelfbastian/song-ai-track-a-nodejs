// chatService.js — Track A (Node.js)
// Lab 6: Shopping Copilot
// Write SYSTEM_PROMPT_TEMPLATE and implement chat().

const llm = require('./llmService');

const sessions = new Map(); // sessionId → message history

// TODO Lab 6 Step 1: Write the Shopping Copilot system prompt.
// Rules: ONE coffee, specific reason, subscription upsell, under 80 words,
// catalog-only. Use %s for catalog context injection.
const SYSTEM_PROMPT_TEMPLATE = `TODO: Write Shopping Copilot system prompt. Catalog: %s`;

// TODO Lab 6 Step 2: Implement chat().
async function chat(sessionId, userMessage, getCatalog) {
  // 1. Get/create session history
  // 2. Build system prompt with catalog context
  // 3. Add user message to history
  // 4. Call llm.completeWithHistory(systemPrompt, history)
  // 5. Add assistant response to history, trim to 10 msgs
  // 6. Return response string
  return 'TODO: implement chat()';
}

function clearSession(sessionId) { sessions.delete(sessionId); }

module.exports = { chat, clearSession };
