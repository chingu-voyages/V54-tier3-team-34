// fake in-memory database for now
// TODO: initialize to a real db
let db;
export default async function makeDb() {
  // replace by a real initialization of the db
  if (!db) {
    db = {};
  }

  return Promise.resolve(db);
}

// TODO: replace by a robust id generation utility
// when switching to a real db, maybe use its id generation mechanism
let nextAutoIncrementId = 1;
export function makeId() {
  return nextAutoIncrementId++;
}
