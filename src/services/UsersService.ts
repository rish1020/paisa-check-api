import { NextFunction, Request, Response } from "express";
import { createNewAccount } from "../dao/AccountsDao";
import { addBankAccountForAccountId } from "../dao/BankAccountsDao";
import { createNewUser, getUserByEmail, getUserById } from "../dao/UsersDao";
import { Account } from "../interfaces/Account";
import { defaultBankAccount } from "../interfaces/BankAccount";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

import { ResponseEntity } from "../interfaces/ResponseEntity";
import { User } from "../interfaces/User";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.query.token as string;
    if (!token) {
      return res.status(404).send("No Token found!");
    }
    verifyToken(token);
    const tokenPayload: TokenPayload = jwt_decode(token);
    const user = (await getUserById(tokenPayload.userId)) as User;
    return res.send({
      _id: user._id,
      accountId: user.accountId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
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

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const account: Partial<Account> = {};
    const oldUser = await getUserByEmail(email);
    if (oldUser) {
      return res.status(403).send("User already exists");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newAccount = await createNewAccount(account);
    await addBankAccountForAccountId(newAccount.insertedId.toString(), {
      ...defaultBankAccount,
      accountId: newAccount.insertedId,
    });

    const user: Partial<User> = {
      accountId: newAccount.insertedId,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };
    const newUser = await createNewUser(user);

    const token = generateNewToken(newUser.insertedId.toString(), email);
    const response: ResponseEntity = {
      ok: newUser.insertedId.toString() ? true : false,
      data: {
        _id: user._id,
        accountId: newAccount.insertedId.toString(),
        token,
        email,
        firstName,
        lastName,
      },
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

interface TokenPayload {
  userId: string;
  email: string;
}

function generateNewToken(userId: string, email: string) {
  const payload: TokenPayload = {
    email,
    userId,
  };
  // Create token
  const token = jwt.sign(payload, process.env.TOKEN_KEY || "", {
    expiresIn: "4m",
  });
  return token;
}

function verifyToken(token: string) {
  return jwt.verify(token, process.env.TOKEN_KEY || "");
}
