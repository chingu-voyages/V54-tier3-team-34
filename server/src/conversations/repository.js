import { makeDb } from "../../db/db.js";

export default { insert, get };

async function insert({ id, ...conversationInfo }) {
  const db = await makeDb();

  try {
    const { acknowledged } = await db
      .collection("conversations")
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

async function get({ hash }) {
  const db = await makeDb();

  try {
    const cursor = db.collection("conversations").find({ hash }).limit(1);
    const found = (await cursor.toArray())[0];

    if (found == undefined) {
      return null;
    }

    const { _id: id, ...rest } = found;
    return { id, ...rest };
  } catch (error) {
    console.error("failed to fetch a conversation by hash", error);
  }
}
