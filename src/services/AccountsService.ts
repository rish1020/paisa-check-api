import { NextFunction, Request, Response } from "express";
import {
  createNewAccount,
  deleteAccountById,
  getAccountsByUserId,
  updateAccountById,
} from "../dao/AccountsDao";
import { ResponseEntity } from "../interfaces/ResponseEntity";

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.query.userId as string;
    const account = await getAccountsByUserId(userId);
    const response: ResponseEntity = {
      ok: true,
      data: account || [],
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const account = await createNewAccount(req.body);
    const body: ResponseEntity = {
      ok: true,
      data: account,
    };
    res.send(body);
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const body = req.body;
    const success = await updateAccountById(accountId, body);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const success = await deleteAccountById(accountId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
