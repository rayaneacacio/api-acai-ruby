import { Database as DatabaseSQ3 } from "sqlite3";
import { open } from "sqlite";
import type { Database } from "sqlite";
import * as path from "path";

export async function sqliteConnection(): Promise<Database> {
  const database = await open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: DatabaseSQ3
  });

  return database;
}