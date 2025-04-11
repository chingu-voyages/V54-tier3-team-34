import { makePrompt } from "../prompts/prompt.js";
import repository from "./repository.js";
import conversationRepository from "../conversations/repository.js";

export default { createPrompt };

/**
 * adds a new prompt to an existing conversation
 * @param {import("express").Request} req express's incoming message
 * @param {import("express").Response} res express's server Response
 * @returns {undefined}
 */
export async function createPrompt(req, res) {
  const { ...promptInfo } = req.body;
  const { hash } = req.params;

  try {
    const prompt = makePrompt(promptInfo);

    const conversation = await conversationRepository.get({ hash });
    if (!conversation) {
      res.status(404).send();
      return;
    }

    await prompt.generateAnswerAsync(conversation.history);

    const saved = await repository.insert({
      conversationHash: hash,
      id: prompt.getId(),
      constraint: prompt.getConstraint(),
      context: prompt.getContext(),
      format: prompt.getFormat(),
      persona: prompt.getPersona(),
      task: prompt.getTask(),
      answer: prompt.getAnswer(),
      createdAt: prompt.getCreatedAt(),
      updatedAt: prompt.getUpdatedAt(),
    });

    if (!saved) {
      res.status(404).send();
      return;
    }

    res.status(200).json(saved);
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to create a new conversatiexn", error);
    res.status(500).send();
    return;
  }
}

/**
 * adds a new prompt to an existing conversation
 * @param {import("express").Request} req express's incoming message
 * @param {import("express").Response} res express's server Response
 * @returns {undefined}
 */
export async function deletePrompt(req, res) {
  const { hash, id } = req.params;

  if (!hash) {
    res.status(400).json({ message: "no valid conversation hash provided" });
  }

  if (!id) {
    res.status(400).json({ message: "no valid prompt id provided" });
  }

  try {
    const deleted = repository.remove({ conversationHash: hash, id });

    if (!deleted) {
      res.status(404).send();
    }

    res.status(204).send();
  } catch (error) {
    // TODO: handle each error case separately
    console.error("Error while trying to delete a prompt", error);
    res.status(500).send();
    return;
  }
}
