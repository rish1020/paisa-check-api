import { NextFunction, Request, Response } from "express";
import {
  createNewExpenseMode,
  deleteExpenseModeById,
  getExpenseModesByUserId,
  updateExpenseModeById,
} from "../dao/ExpenseModeDao";
import { Category } from "../interfaces/Category";
import { ResponseEntity } from "../interfaces/ResponseEntity";
import { ExpenseMode } from "../interfaces/Transaction";

export async function getExpenseModes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.query.userId as string;
    const expenseModes = await getExpenseModesByUserId(userId);
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
    const newExpenseMode = await createNewExpenseMode(req.body);
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
    const expenseModeId = req.query.expenseModeId as string;
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
    const expenseModeId = req.query.expenseModeId as string;
    const success = await deleteExpenseModeById(expenseModeId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
