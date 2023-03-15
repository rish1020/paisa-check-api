import { NextFunction, Request, Response } from "express";
import { getAccountByAccountId, updateAccountById } from "../dao/AccountsDao";
import { getExpenseModeById } from "../dao/ExpenseModeDao";
import {
  createNewTransaction,
  deleteTransactionById,
  getTransactionByTransactionId,
  getTransactionsByUserId,
  updateTransactionyById,
} from "../dao/TransactionDao";
import { Account } from "../interfaces/Account";
import { ResponseEntity } from "../interfaces/ResponseEntity";
import {
  ExpenseMode,
  Transaction,
  TransactionType,
} from "../interfaces/Transaction";

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.query.userId as string;
    const transactions = await getTransactionsByUserId(userId);
    const response: ResponseEntity = {
      ok: true,
      data: transactions,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    let result;
    if (body.type === TransactionType.Credit) {
      const transactionSuccess = await createNewTransaction(req.body);
      const toAccountId = req.body.toAccountId;
      if (toAccountId) {
        const account = (await getAccountByAccountId(toAccountId)) as Account;
        const balance = account.balance + req.body.amount;
        await updateAccountById(toAccountId, { balance });
      }
      result = {
        ok: transactionSuccess.insertedId,
      };
    }
    if (body.type === TransactionType.Debit) {
      const transactionSuccess = await createNewTransaction(req.body);
      const fromAccountId = req.body.fromAccountId;
      if (fromAccountId) {
        const account = (await getAccountByAccountId(fromAccountId)) as Account;
        const balance = account.balance - req.body.amount;
        await updateAccountById(fromAccountId, { balance });
      }
      result = {
        ok: transactionSuccess.insertedId,
      };
    }
    if (body.type === TransactionType.Transfer) {
      await createNewTransaction(req.body);
      const toAccountId = req.body.toAccountId;
      const toAccount = (await getAccountByAccountId(toAccountId)) as Account;

      const fromAccountId = req.body.fromAccountId;
      const fromAccount = (await getAccountByAccountId(
        fromAccountId
      )) as Account;

      const toBalance = toAccount.balance + req.body.amount;
      const fromBalance = fromAccount.balance - req.body.amount;
      const result1 = await updateAccountById(toAccountId, {
        balance: toBalance,
      });
      const result2 = await updateAccountById(fromAccountId, {
        balance: fromBalance,
      });
      result = {
        ok: result1 && result2,
      };
    }
    if (body.type === TransactionType.PayLater) {
      const success = await createNewTransaction(req.body);
      result = {
        ok: success,
      };
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transactionId = req.query.transactionId as string;
    const transaction = (await getTransactionByTransactionId(
      transactionId
    )) as Transaction;
    if (transaction.type === TransactionType.Credit) {
      const toAccountId = transaction.toAccountId.toString();
      if (toAccountId) {
        const account = (await getAccountByAccountId(toAccountId)) as Account;
        const balance = account.balance - transaction.amount;
        await updateAccountById(toAccountId, { balance });
      }
    }
    if (transaction.type === TransactionType.Debit) {
      const fromAccountId = transaction.fromAccountId.toString();
      if (fromAccountId) {
        const account = (await getAccountByAccountId(fromAccountId)) as Account;
        const balance = account.balance + transaction.amount;
        await updateAccountById(fromAccountId, { balance });
      }
    }
    if (transaction.type === TransactionType.Transfer) {
      const toAccountId = transaction.toAccountId.toString();
      const toAccount = (await getAccountByAccountId(toAccountId)) as Account;

      const fromAccountId = transaction.fromAccountId.toString();
      const fromAccount = (await getAccountByAccountId(
        fromAccountId
      )) as Account;

      const toBalance = toAccount.balance - transaction.amount;
      const fromBalance = fromAccount.balance + transaction.amount;
      await updateAccountById(toAccountId, {
        balance: toBalance,
      });
      await updateAccountById(fromAccountId, {
        balance: fromBalance,
      });
    }
    const success = await deleteTransactionById(transactionId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
