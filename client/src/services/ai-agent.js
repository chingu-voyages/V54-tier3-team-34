export default { generateAnswer };

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
    .then((data) => data.history.at(-1).generatedAnswer);
}
