export default { generateAnswer, getChatHistory };

const BASE_URL = "/api/v1";

export async function generateAnswer({
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
    .then((conversation) => conversation.history.at(-1).answer);
}

export async function getChatHistory({ hash }) {
  const response = await fetch(`${BASE_URL}/conversations/${hash}`)

  if (response.status === 404) {
    throw new Error("Conversation not found!", { cause: { responseStatus: response.status }})
  }

  return response.json()
}
