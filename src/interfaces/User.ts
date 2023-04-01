import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  password: string;
  email: string;
  token: string;
  image: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
}
