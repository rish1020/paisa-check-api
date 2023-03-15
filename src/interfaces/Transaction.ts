import { ObjectId } from "mongodb";

export enum TransactionType {
  Credit = "Credit",
  Debit = "Debit",
  Transfer = "Transfer",
  PayLater = "PayLater",
}

export interface Transaction {
  _id: ObjectId;
  type: TransactionType;
  date: Date;
  amount: number;
  category: string;
  toBankAccountId: ObjectId;
  fromBankAccountId: ObjectId;
  note: string;
  expenseModeId: ObjectId;
  fees: number;
}

export interface ExpenseMode {
  _id: ObjectId;
  name: string;
  accountId: ObjectId;
  subMode: string;
  type: string;
  userId: string;
}

export interface TransactionDTO {
  _id: string;
  type: TransactionType;
  date: Date;
  amount: number;
  category: string;
  toBankAccountId: string;
  fromBankAccountId: string;
  note: string;
  expenseModeId: string;
  fees: number;
}
