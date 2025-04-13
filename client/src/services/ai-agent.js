export default { createConversation, getConversation };
export { createConversation as generateAnswer, getConversation as getChatHistory };

const BASE_URL = "/api/v1";

export async function createConversation({
  constraint,
  context,
  output,
  persona,
  task,
}) {
  return fetch(`${BASE_URL}/conversations`, {
    method: "POST",
    body: JSON.stringify({
      constraint,
      context,
      format: output,
      persona,
      task,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
}

export async function getConversation({ hash }) {
  const response = await fetch(`${BASE_URL}/conversations/${hash}`)

  if (response.status === 404) {
    throw new Error("Conversation not found!", { cause: { responseStatus: response.status }})
  }

  return response.json()
}

export async function addPrompt({ conversationHash, constraint, context, output, persona, task }) {
  const response = await fetch(`${BASE_URL}/conversations/${conversationHash}/prompts`, {
    method: "POST",
    body: JSON.stringify({
      constraint,
      context,
      format: output,
      persona,
      task,
    }),
    headers: { "Content-Type": "application/json" },
  })

  return response.json()
}