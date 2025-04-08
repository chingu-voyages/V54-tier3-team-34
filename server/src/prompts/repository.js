import makeDb from "../../db/index.js";

// TODO: update functions after switching to a real db instance
export default { insert };

async function insert({ ...conversationInfo }) {
  const db = await makeDb();

  if (!db["prompts"]) {
    db["prompts"] = [];
  }

  db["prompts"].push({ ...conversationInfo });
  return db["prompts"].at(-1);
}
