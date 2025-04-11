import { makeId, isValidId } from "../../db/db.js";
import { chatWithGemini } from "./ai-agent.js";

export function makePrompt({
  id = makeId(),
  constraint,
  context,
  format,
  persona,
  task,
  createdOn: createdAt = Date.now(),
  updatedOn: updatedAt = Date.now(),
}) {
  /**
   * some considerations:
   * - security risks: guard against XSS - cannot trust users
   * - security risks: guard against XSS - cannot trust ai answers
   * - conversation chain would take too many tokens like this. How to make it lean?
   */
  if (!isValidId(id)) {
    throw new Error("invalid prompt id");
  }

  if (!constraint) {
    throw new Error("prompt constraint is required");
  }

  if (!context) {
    throw new Error("prompt context is required");
  }

  if (!format) {
    throw new Error("prompt format is required");
  }

  if (!persona) {
    throw new Error("prompt persona is required");
  }

  if (!task) {
    throw new Error("prompt task is required");
  }

  let answer;

  return Object.freeze({
    getId: () => id,
    getConstraint: () => constraint,
    getContext: () => context,
    getFormat: () => format,
    getPersona: () => persona,
    getTask: () => task,
    getAnswer: () => answer,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    async generateAnswerAsync(history = []) {
      if (!Array.isArray(history)) {
        throw new Error(
          `expected history to be an array, but ${typeof history} was received`,
        );
      }

      answer = await chatWithGemini({
        history,
        promptData: { constraint, context, format, persona, task },
      });
    },
  });
}
