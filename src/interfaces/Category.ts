import { ObjectId } from "mongodb";

export enum CategoryType {
  Expense = "Expense",
  Income = "Income",
}

export interface Category {
  _id: ObjectId;
  type: CategoryType;
  name: string;
  accountId: ObjectId;
}
