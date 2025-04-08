import { makeConversation } from "./conversation.js";
import conversationsRepository from "./repository.js";
import { makePrompt } from "../prompts/prompt.js";
import promptsRepository from "../prompts/repository.js";

export default { createConversation };

/**
 * saves a new ai-user conversation chain and responds with it
 * @param {import("express").Request} req express's incoming message
 * @param {import("express").Response} res express's server Response
 * @returns {undefined}
 */
export async function createConversation(req, res) {
  const { ...promptInfo } = req.body;

  try {
    const conversation = makeConversation();
    const prompt = makePrompt(promptInfo);

    // TODO: Do all of this in a transaction to avoid 1/2 writes failing
    const savedConversation = await conversationsRepository.insert({
      id: conversation.getId(),
      hash: conversation.getHash(),
      createdAt: conversation.getCreatedAt(),
      updatedAt: conversation.getUpdatedAt(),
    });

    const savedPrompt = await promptsRepository.insert({
      conversationId: conversation.getId(),
      id: prompt.getId(),
      constraint: prompt.getConstraint(),
      context: prompt.getContext(),
      format: prompt.getFormat(),
      persona: prompt.getPersona(),
      task: prompt.getTask(),
      generatedAnswer: prompt.getAnswer(),
      createdAt: prompt.getCreatedAt(),
      updatedAt: prompt.getUpdatedAt(),
    });

    res.status(201).json({ ...savedConversation, history: [savedPrompt] });
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to create a new conversation", error);
    res.status(500).send();
    return;
  }
}
