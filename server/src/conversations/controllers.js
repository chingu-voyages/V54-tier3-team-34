import makeConversation from "./model.js";
import conversationsDb from "./repository.js";

export default { createConversation };

/**
 * saves a new ai-user conversation chain and responds with it
 * @param {import("express").Request} req express's incoming message
 * @param {import("express").Response} res express's server Response
 * @returns {undefined}
 */
export async function createConversation(req, res) {
  const { ...conversationInfo } = req.body;

  try {
    const conversation = makeConversation(conversationInfo);
    const saved = await conversationsDb.insert({
      content: conversation.getContent(),
      hash: conversation.getHash(), // TODO: index the hash
    });

    res.status(201).json(saved);
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to create a conversation", error);
    res.status(500).send();
    return;
  }
}
