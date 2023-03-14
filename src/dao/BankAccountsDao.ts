import { BankAccount } from "../interfaces/BankAccount";
import { Db, MongoClient, ObjectId } from "mongodb";
import { Collection } from "../utils/Constants";

const CollectionName = Collection.BankAccounts;

export async function getBankAccountsByAccountId(accountId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      accountId: new ObjectId(accountId),
    };
    const options = {};
    const cursor = collection.find(query, options);
    const bankAccounts = await cursor.toArray();
    await cursor.close();
    return bankAccounts;
  } catch (error) {
    throw error;
  }
}

export async function getBankAccountsByBankAccountId(bankAccountId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(bankAccountId),
    };
    const options = {};
    const bankAccount = await collection.findOne(query, options);
    return bankAccount;
  } catch (error) {
    throw error;
  }
}

export async function addBankAccountForAccountId(
  accountId: string,
  bankAccount: Partial<BankAccount>
) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne({
      accountId: new ObjectId(accountId),
      ...bankAccount,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateBankAccountById(
  bankAccountId: string,
  bankAccount: Partial<BankAccount>
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(bankAccountId),
    };
    const result = await collection.updateOne(query, { $set: bankAccount });
    if (result.matchedCount === result.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteBankAccountById(
  bankAccountId: string
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(bankAccountId),
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
