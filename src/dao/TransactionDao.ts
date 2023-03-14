import { Transaction } from "../interfaces/Transaction";
import { Collection } from "../utils/Constants";
import { Db, MongoClient, ObjectId } from "mongodb";

const CollectionName = Collection.Transactions;

export async function getTransactionsByAccountId(accountId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      accountId,
    };
    const options = {};
    const cursor = collection.find(query, options);
    const transactions = await cursor.toArray();
    await cursor.close();
    return transactions;
  } catch (error) {
    throw error;
  }
}

export async function getTransactionByTransactionId(transactionId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(transactionId),
    };
    const options = {};
    const transaction = await collection.findOne(query, options);
    return transaction;
  } catch (error) {
    throw error;
  }
}

export async function createNewTransaction(transaction: Partial<Transaction>) {
  try {
    const document = {
      ...transaction,
    };
    if (transaction.toBankAccountId)
      document.toBankAccountId = new ObjectId(transaction.toBankAccountId);
    if (transaction.fromBankAccountId)
      document.fromBankAccountId = new ObjectId(transaction.fromBankAccountId);
    if (transaction.expenseModeId)
      document.expenseModeId = new ObjectId(transaction.expenseModeId);

    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne(document);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateTransactionyById(
  transactionId: string,
  transaction: Partial<Transaction>
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(transactionId),
    };
    const result = await collection.updateOne(query, { $set: transaction });
    if (result.matchedCount === result.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteTransactionById(
  transactionId: string
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(transactionId),
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
