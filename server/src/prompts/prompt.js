import { makeId, isValidId } from "../../db/index.js";
import aiAgent from "./ai-agent.js";

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
   * TODO: generate the answer from the backend.
   * some considerations:
   * - security risks: guard against XSS - cannot trust users
   * - security risks: guard against XSS - cannot trust ai answers
   * ? prompt api: maybe { generated, input: { constraint, context, output, persona, task }}
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
    generateAnswer: async () => {
      answer = await aiAgent.answerWithGemini({
        constraint,
        context,
        format,
        persona,
        task,
      });
    },
  });
}
