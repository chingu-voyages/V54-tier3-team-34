import { makeDb } from "../../db/db.js";

export default { insert };

async function insert({ id, ...conversationInfo }) {
  const db = await makeDb();

  try {
    const { acknowledged, insertedId } = await db
      .collection("conersations")
      .insertOne({ ...conversationInfo });

    if (!acknowledged) {
      throw new Error("write non acknowledged by the db!", {
        cause: { acknowledged },
      });
    }

    return { id: insertedId, ...conversationInfo };
  } catch (error) {
    console.error("failed to insert a new conversation", error);
  }
}
