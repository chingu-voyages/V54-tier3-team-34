import { makeDb } from "../../db/db.js";

export default { insert };

async function insert({ id, ...conversationInfo }) {
  const db = await makeDb();

  try {
    const { acknowledged } = await db
      .collection("conersations")
      .insertOne({ _id: id, ...conversationInfo });

    if (!acknowledged) {
      throw new Error("write non acknowledged by the db!", {
        cause: { acknowledged },
      });
    }

    return { id, ...conversationInfo };
  } catch (error) {
    console.error("failed to insert a new conversation", error);
  }
}
