import { MongoClient, ServerApiVersion } from "mongodb";
import { createId, isCuid } from "@paralleldrive/cuid2";

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

export function makeId() {
  return createId();
}

export function isValidId(id) {
  return isCuid(id);
}
