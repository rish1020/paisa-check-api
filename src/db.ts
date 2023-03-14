import { MongoClient, Db } from "mongodb";
import { DatabaseName } from "./utils/Constants";

declare global {
  var mongoClient: MongoClient;
  var database: Db;
}

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@expense-management.dcdki0t.mongodb.net/?retryWrites=true&w=majority`;

export function registerDatabase() {
  console.log(URI);
  const client = new MongoClient(URI);

  global.mongoClient = client;
  global.database = client.db(DatabaseName);
}
