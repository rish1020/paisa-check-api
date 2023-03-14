import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  accountId: ObjectId;
  password: string;
  email: string;
  token: string;
}
