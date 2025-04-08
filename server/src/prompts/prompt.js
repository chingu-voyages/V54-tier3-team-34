import { makeId, isValidId } from "../../db/index.js";

export function makePrompt({
  id = makeId(),
  constraint,
  context,
  format,
  persona,
  task,
  response: generatedAnswer,
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

  if (!generatedAnswer) {
    throw new Error("prompt's generated response is missing");
  }

  return Object.freeze({
    getId: () => id,
    getConstraint: () => constraint,
    getContext: () => context,
    getFormat: () => format,
    getPersona: () => persona,
    getTask: () => task,
    getAnswer: () => generatedAnswer,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
  });
}
