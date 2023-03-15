import { ObjectId } from "mongodb";

export enum TransactionType {
  Credit = "Credit",
  Debit = "Debit",
  Transfer = "Transfer",
  PayLater = "PayLater",
}
export interface Transaction {
  _id: ObjectId;
  type: string;
  date: Date;
  amount: number;
  categoryId: ObjectId;
  toAccountId: ObjectId;
  fromAccountId: ObjectId;
  note: string;
  expenseModeId: ObjectId;
  fees: number;
  userId: ObjectId;
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
  type: string;
  date: Date;
  amount: number;
  categoryId: string;
  toAccountId?: string;
  fromAccountId?: string;
  note: string;
  expenseModeId?: string;
  fees?: number;
  userId: string;
}
