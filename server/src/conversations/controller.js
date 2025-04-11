import { makeConversation } from "./conversation.js";
import repository from "./repository.js";
import { makePrompt } from "../prompts/prompt.js";

export default { createConversation, getConversation };

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
    await prompt.generateAnswerAsync();

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
    console.error("Error while trying to create a new conversatiexn", error);
    res.status(500).send();
    return;
  }
}

/**
 * fetches an ai-user conversation chain using its hash
 * @param {import("express").Request} req express's incoming message
 * @param {import("express").Response} res express's server Response
 * @returns {undefined}
 */
export async function getConversation(req, res) {
  const { hash } = req.params;

  if (!hash) {
    res.status(400).json({ message: "no valid hash provided" });
    return;
  }

  try {
    const exists = await repository.get({ hash });

    if (!exists) {
      res.status(404).send();
      return;
    }

    res.status(200).json(exists);
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to fetch a conversation", error);
    res.status(500).send();
    return;
  }
}
