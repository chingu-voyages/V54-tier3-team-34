import { MongoClient, ServerApiVersion } from "mongodb";

const { DB_NAME, DB_URI } = process.env;
let client;

export async function makeDb() {
  if (!(client instanceof MongoClient)) {
    try {
      client = new MongoClient(DB_URI, {
        monitorCommands: true,
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await client.db(DB_NAME).command({ ping: 1 });
      console.info("successfully connected to the database");
    } catch (error) {
      throw new Error("failed to connect to mongodb", { cause: error });
    }
  }

  return client.db(DB_NAME);
}

// TODO: replace by a robust id generation utility
// when switching to a real db, maybe use its id generation mechanism
let nextAutoIncrementId = 1;
export function makeId() {
  return nextAutoIncrementId++;
}

export function isValidId(id) {
  return typeof id == "number" && id > 0 && id < nextAutoIncrementId;
}
