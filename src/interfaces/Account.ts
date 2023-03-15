import { ObjectId } from "mongodb";

export interface Account {
  _id: ObjectId;
  name: string;
  balance: number;
  type: string;
  group: string;
  image?: string;
  userId: string;
}
