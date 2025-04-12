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
    throw new Error(
      "conversation expected an array of prompts but received something else",
    );
  }

  return Object.freeze({
    getId: () => id,
    getHash: () => hash,
    getHistory: () => history,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
  });
}
