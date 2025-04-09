import { makeId, isValidId } from "../../db/db.js";
import {
  createId as makeHash,
  isCuid as isValidHash,
} from "@paralleldrive/cuid2";

export function makeConversation({
  id = makeId(),
  hash = makeHash(),
  history = [],
  createdAt = Date.now(),
  updatedAt = Date.now(),
} = {}) {
  if (!isValidId(id)) {
    throw new Error("invalid conversation id");
  }

  if (!isValidHash(hash)) {
    throw new Error("invalid conversation hash");
  }

  if (!Array.isArray(history)) {
    throw new Error("expected conversation history to be an array");
  }

  return Object.freeze({
    getId: () => id,
    getHash: () => hash,
    getHistory: () => history,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    addPrompt: (prompt) => history.push(prompt),
  });
}
