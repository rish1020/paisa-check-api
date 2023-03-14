import { NextFunction, Request, Response } from "express";
import {
  createNewExpenseMode,
  deleteExpenseModeById,
  getExpenseModesByAccountId,
  updateExpenseModeById,
} from "../dao/ExpenseMode";
import { Category } from "../interfaces/Category";
import { ResponseEntity } from "../interfaces/ResponseEntity";
import { ExpenseMode } from "../interfaces/Transaction";

export async function getExpenseModes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const expenseModes = await getExpenseModesByAccountId(accountId);
    const response: ResponseEntity = {
      ok: true,
      data: expenseModes,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createExpenseMode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.body.accountId;
    const bankAccountId = req.body.bankAccountId;
    const name = req.body.name;
    const newExpenseMode = await createNewExpenseMode(
      accountId,
      bankAccountId,
      { name }
    );
    const body: ResponseEntity = {
      ok: true,
      data: newExpenseMode,
    };
    res.send(body);
  } catch (error) {
    next(error);
  }
}

export async function updateExpenseMode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const expenseModeId = req.query.id as string;
    const expenseMode = req.body;
    const success = await updateExpenseModeById(expenseModeId, expenseMode);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteExpenseMode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const expenseModeId = req.body._id;
    const success = await deleteExpenseModeById(expenseModeId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
