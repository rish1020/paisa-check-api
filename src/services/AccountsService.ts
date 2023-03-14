import { NextFunction, Request, Response } from "express";
import {
  createNewAccount,
  getAccountByUserId,
  updateAccountById,
} from "../dao/AccountsDao";
import { ResponseEntity } from "../interfaces/ResponseEntity";

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = "";
    const account = await getAccountByUserId(userId);
    const response: ResponseEntity = {
      ok: true,
      data: account,
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
    const accountId = req.body._id;
    const account = await createNewAccount(accountId);
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
    const accountId = req.body._id;
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
