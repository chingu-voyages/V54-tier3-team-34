import { makeDb } from "../../db/db.js";

export default { insert, remove };

async function insert({ conversationHash, ...promptInfo }) {
  const db = await makeDb();

  try {
    const { acknowledged, matchedCount } = await db
      .collection("conversations")
      .updateOne(
        { hash: conversationHash },
        {
          $set: { updatedAt: promptInfo.createdAt },
          $push: { history: promptInfo },
        },
      );

    if (!acknowledged) {
      throw new Error("update non acknowledged by the db!", {
        cause: { acknowledged },
      });
    }

    if (matchedCount === 0) {
      return null;
    }

    return promptInfo;
  } catch (error) {
    console.error("failed to add a new prompt", error);
  }
}

async function remove({ conversationHash, id }) {
  const db = await makeDb();
  try {
    const { acknowledged, matchedCount } = await db
      .collection("conversations")
      .updateOne(
        { hash: conversationHash },
        { $set: { updatedAt: Date.now() }, $pull: { history: { id } } },
      );
    if (!acknowledged) {
      throw new Error("update non acknowledged by the db!", {
        cause: { acknowledged },
      });
    }
    if (!matchedCount) {
      return null;
    }
    return { id };
  } catch (error) {
    console.error("failed to delete a prompt", error);
  }
}
