import makeDb from "../../db/index.js";

// TODO: update functions after switching to a real db instance
export default { insert };

async function insert({ ...conversationInfo }) {
  const db = await makeDb();

  if (!db["conversations"]) {
    db["conversations"] = [];
  }

  db["conversations"].push({ ...conversationInfo });
  return db["conversations"].at(-1);
}
