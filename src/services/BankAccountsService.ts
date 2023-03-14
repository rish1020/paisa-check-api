import { NextFunction, Request, Response } from "express";
import {
  addBankAccountForAccountId,
  getBankAccountsByAccountId,
  updateBankAccountById,
  deleteBankAccountById,
} from "../dao/BankAccountsDao";
import { ResponseEntity } from "../interfaces/ResponseEntity";

export async function getBankAccounts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const bankAccounts = await getBankAccountsByAccountId(accountId);
    const body: ResponseEntity = {
      ok: true,
      data: bankAccounts,
    };
    res.send(body);
  } catch (error) {
    next(error);
  }
}

export async function addBankAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const bankAccount = req.body;
    const result = await addBankAccountForAccountId(accountId, bankAccount);
    const body: ResponseEntity = {
      ok: true,
      data: result,
    };
    res.send(body);
  } catch (error) {
    next(error);
  }
}

export async function updateBankAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bankAccountId = req.query.id as string;
    const body = req.body;
    const success = await updateBankAccountById(bankAccountId, body);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteBankAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bankAccountId = req.body._id;
    const success = await deleteBankAccountById(bankAccountId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
