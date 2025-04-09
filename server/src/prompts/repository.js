import { makeDb } from "../../db/db.js";

export default { insert };

async function insert({ id, ...promptInfo }) {
  const db = await makeDb();

  try {
    const { acknowledged } = await db
      .collection("prompts")
      .insertOne({ _id: id, ...promptInfo });

    if (!acknowledged) {
      throw new Error("write non acknowledged by the db!", {
        cause: { acknowledged },
      });
    }

    return { id, ...promptInfo };
  } catch (error) {
    console.error("failed to insert a new prompt", error);
  }
}
