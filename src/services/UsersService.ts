import { NextFunction, Request, Response } from "express";
import { createNewAccount } from "../dao/AccountsDao";
import { createNewUser, getUserByEmail, getUserById } from "../dao/UsersDao";
import { Account } from "../interfaces/Account";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

import { ResponseEntity } from "../interfaces/ResponseEntity";
import { TokenPayload, User } from "../interfaces/User";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(404).send("No Token found!");
    }
    const tokenPayload: TokenPayload = jwt_decode(token);
    const user = (await getUserById(tokenPayload.userId)) as User;
    const response: ResponseEntity = {
      ok: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        token: user.token,
        image: user.image,
      },
    };
    return res.send(response);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).send("Token expired!");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send("Invalid Token!");
    }
    next(error);
  }
}
