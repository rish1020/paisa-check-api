import { Db, MongoClient, ObjectId } from "mongodb";
import { Account } from "../interfaces/Account";
import { Collection } from "../utils/Constants";

const CollectionName = Collection.Accounts;

export async function getAccountsByUserId(userId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      userId,
    };
    const options = {};
    const cursor = collection.find(query, options);
    const accounts = await cursor.toArray();
    return accounts;
  } catch (error) {
    throw error;
  }
}

export async function createNewAccount(account: Partial<Account>) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne(account);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateAccountById(
  accountId: string,
  account: Partial<Account>
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(accountId),
    };
    const result = await collection.updateOne(query, { $set: account });
    if (result.matchedCount === result.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteAccountById(accountId: string): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(accountId),
    };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
