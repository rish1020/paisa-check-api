import { ExpenseMode } from "../interfaces/Transaction";
import { Collection } from "../utils/Constants";
import { Db, MongoClient, ObjectId } from "mongodb";

const CollectionName = Collection.ExpenseModes;

export async function getExpenseModesByAccountId(accountId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      accountId: new ObjectId(accountId),
    };
    const options = {};
    const cursor = collection.find(query, options);
    const expenseModes = await cursor.toArray();
    await cursor.close();
    return expenseModes;
  } catch (error) {
    throw error;
  }
}

export async function getExpenseModeById(expenseModeId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(expenseModeId),
    };
    const options = {};
    const expenseMode = await collection.findOne(query, options);
    return expenseMode;
  } catch (error) {
    throw error;
  }
}

export async function createNewExpenseMode(
  accountId: string,
  bankAccountId: string,
  expenseMode: Partial<ExpenseMode>
) {
  try {
    const body = {
      accountId: new ObjectId(accountId),
      bankAccountId: new ObjectId(bankAccountId),
      ...expenseMode,
    };
    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne(body);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateExpenseModeById(
  expenseModeId: string,
  expenseMode: Partial<ExpenseMode>
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(expenseModeId),
    };
    const result = await collection.updateOne(query, { $set: expenseMode });
    if (result.matchedCount === result.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteExpenseModeById(
  expenseModeId: string
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(expenseModeId),
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
