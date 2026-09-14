// llmService.js — Track A (Node.js)
// Provider-agnostic LLM client
// Same concept as LlmService.java in Track B/C
// Supports: Azure OpenAI | OpenAI | Groq
//
// Switch provider in .env:
//   LLM_PROVIDER=azure | openai | groq

const axios = require('axios');

/**
 * Call the configured LLM and return the text response.
 * @param {string} systemPrompt - The system / role instruction
 * @param {string} userPrompt   - The user message / task
 * @returns {Promise<string>}   - The model's text response
 */
async function complete(systemPrompt, userPrompt) {
  const provider = process.env.LLM_PROVIDER || 'azure';

  switch (provider.toLowerCase()) {
    case 'groq':   return callGroq(systemPrompt, userPrompt);
    case 'openai': return callOpenAI(systemPrompt, userPrompt);
    case 'azure':
    default:       return callAzureOpenAI(systemPrompt, userPrompt);
  }
}

// ── Azure OpenAI ───────────────────────────────────────────────────────────
async function callAzureOpenAI(system, user) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey   = process.env.LLM_API_KEY;

  const response = await axios.post(
    `${endpoint}/chat/completions?api-version=2024-02-01`,
    {
      messages: [
        { role: 'system', content: system },
        { role: 'user',   content: user   },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        'api-key':      apiKey,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
}

// ── OpenAI ─────────────────────────────────────────────────────────────────
async function callOpenAI(system, user) {
  const model  = process.env.LLM_MODEL || 'gpt-4o';
  const apiKey = process.env.LLM_API_KEY;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user',   content: user   },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
}

// ── Groq (free tier — OpenAI-compatible) ───────────────────────────────────
async function callGroq(system, user) {
  const model  = process.env.LLM_MODEL || 'llama-3.1-8b-instant';
  const apiKey = process.env.LLM_API_KEY;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user',   content: user   },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
}

module.exports = { complete };
