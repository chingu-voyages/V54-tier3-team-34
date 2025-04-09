import { makeConversation } from "./conversation.js";
import repository from "./repository.js";
import { makePrompt } from "../prompts/prompt.js";

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
    const prompt = makePrompt(promptInfo);
    await prompt.generateAnswer();

    const history = [
      {
        id: prompt.getId(),
        constraint: prompt.getConstraint(),
        context: prompt.getContext(),
        format: prompt.getFormat(),
        persona: prompt.getPersona(),
        task: prompt.getTask(),
        answer: prompt.getAnswer(),
        createdAt: prompt.getCreatedAt(),
        updatedAt: prompt.getUpdatedAt(),
      },
    ];

    const conversation = makeConversation({ history });

    const saved = await repository.insert({
      id: conversation.getId(),
      hash: conversation.getHash(),
      history: conversation.getHistory(),
      createdAt: conversation.getCreatedAt(),
      updatedAt: conversation.getUpdatedAt(),
    });

    res.status(201).json(saved);
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to create a new conversation", error);
    res.status(500).send();
    return;
  }
}
