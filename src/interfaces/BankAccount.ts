import { ObjectId } from "mongodb";

export interface BankAccount {
  _id: ObjectId;
  name: string;
  balance: number;
  accountId: ObjectId;
}

export const defaultBankAccount: Partial<BankAccount> = {
  balance: 0,
  name: "Bank Account",
};
