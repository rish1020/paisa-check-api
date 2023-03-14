import { Db, MongoClient, ObjectId } from "mongodb";
import { Account } from "../interfaces/Account";
import { User } from "../interfaces/User";
import { getBankAccounts } from "../services/BankAccountsService";
import { Collection } from "../utils/Constants";
import { getBankAccountsByAccountId } from "./BankAccountsDao";
import { getUserById } from "./UsersDao";

const CollectionName = Collection.Accounts;

export async function getAccountByUserId(userId: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      userId,
    };
    const options = {};
    const user = (await getUserById(userId)) as User;
    const bankAccounts = await getBankAccountsByAccountId(
      user.accountId.toString()
    );
    return bankAccounts;
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
