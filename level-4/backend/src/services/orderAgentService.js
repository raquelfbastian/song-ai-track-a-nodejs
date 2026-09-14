// orderAgentService.js — Track A (Node.js) — Lab 9: Order Assistant Agent
// TODO: Write AGENT_SYSTEM prompt and implement process() tool-calling loop.
// See OrderAgentService.java (Track C) for reference implementation pattern.
// Same logic — different language.

const llm = require('./llmService');

const AGENT_SYSTEM = `TODO: Write Order Agent system prompt with 4 tools and JSON tool-call format.`;

async function process(customerId, message) {
  const response = await llm.complete(AGENT_SYSTEM, message);
  if (isToolCall(response)) return executeToolCall(customerId, response);
  return { type: 'message', response, toolCalled: false };
}

function isToolCall(response) {
  return false; // TODO: check if response starts with { and contains "tool"
}

function executeToolCall(customerId, toolJson) {
  return { type: 'error', response: 'TODO: implement executeToolCall', toolCalled: false };
}

module.exports = { process };
