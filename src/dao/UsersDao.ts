import { User } from "../interfaces/User";
import { Collection } from "../utils/Constants";
import { Db, MongoClient, ObjectId } from "mongodb";

const CollectionName = Collection.Users;

export async function createNewUser(user: Partial<User>) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne(user);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(userId),
    };
    const result = await collection.findOne(query);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      email,
    };
    const result = await collection.findOne(query);
    return result;
  } catch (error) {
    throw error;
  }
}
