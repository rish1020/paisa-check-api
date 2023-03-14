import { NextFunction, Request, Response } from "express";
import {
  getBankAccountsByBankAccountId,
  updateBankAccountById,
} from "../dao/BankAccountsDao";
import { getExpenseModeById } from "../dao/ExpenseMode";
import {
  createNewTransaction,
  deleteTransactionById,
  getTransactionByTransactionId,
  getTransactionsByAccountId,
  updateTransactionyById,
} from "../dao/TransactionDao";
import { BankAccount } from "../interfaces/BankAccount";
import { ResponseEntity } from "../interfaces/ResponseEntity";
import {
  ExpenseMode,
  Transaction,
  TransactionDTO,
  TransactionType,
} from "../interfaces/Transaction";

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const transactions = await getTransactionsByAccountId(accountId);
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
    let document = {};
    let result;
    if (body.type === TransactionType.Credit) {
      const toBankAccountId = req.body.toBankAccountId;
      await createNewTransaction(req.body);
      const bankAccount = (await getBankAccountsByBankAccountId(
        toBankAccountId
      )) as BankAccount;
      const balance = bankAccount.balance + req.body.amount;
      const success = await updateBankAccountById(toBankAccountId, { balance });
      result = {
        ok: success,
      };
    }
    if (body.type === TransactionType.Debit) {
      const expenseMode = (await getExpenseModeById(
        req.body.expenseModeId
      )) as ExpenseMode;
      await createNewTransaction(req.body);
      const bankAccount = (await getBankAccountsByBankAccountId(
        expenseMode.bankAccountId.toString()
      )) as BankAccount;
      const balance = bankAccount.balance - req.body.amount;
      const success = await updateBankAccountById(
        expenseMode.bankAccountId.toString(),
        { balance }
      );
      result = {
        ok: success,
      };
    }
    if (body.type === TransactionType.Transfer) {
      await createNewTransaction(req.body);
      const toBankAccountId = req.body.toBankAccountId;
      const toBankAccount = (await getBankAccountsByBankAccountId(
        toBankAccountId
      )) as BankAccount;
      const fromBankAccountId = req.body.fromBankAccountId;
      const fromBankAccount = (await getBankAccountsByBankAccountId(
        fromBankAccountId
      )) as BankAccount;
      const toBalance = toBankAccount.balance + req.body.amount;
      const fromBalance = fromBankAccount.balance - req.body.amount;
      const result1 = await updateBankAccountById(toBankAccountId, {
        balance: toBalance,
      });
      const result2 = await updateBankAccountById(fromBankAccountId, {
        balance: fromBalance,
      });
      result = {
        ok: result1 && result2,
      };
    }
    if (body.type === TransactionType.PayLater) {
      const expenseMode = (await getExpenseModeById(
        req.body.expenseModeId
      )) as ExpenseMode;
      await createNewTransaction(req.body);
      const bankAccount = (await getBankAccountsByBankAccountId(
        expenseMode.bankAccountId.toString()
      )) as BankAccount;
      const balance = bankAccount.balance - req.body.amount;
      const success = await updateBankAccountById(
        expenseMode.bankAccountId.toString(),
        { balance }
      );
      result = {
        ok: success,
      };
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function updateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transactionId = req.query._id as string;
    const newAmount = req.body.amount;
    const transaction = (await getTransactionByTransactionId(
      transactionId
    )) as Transaction;
    const previousAmount = transaction.amount;
    const success = await updateTransactionyById(transactionId, req.body);
    if (transaction.type === TransactionType.Credit) {
      const diffAmount = newAmount - previousAmount;
      const bankAccount = (await getBankAccountsByBankAccountId(
        transaction.toBankAccountId.toString()
      )) as BankAccount;
      const balance = bankAccount.balance + diffAmount;
      const success = await updateBankAccountById(
        transaction.toBankAccountId.toString(),
        { balance }
      );
    }
    if (transaction.type === TransactionType.Debit) {
      const expenseMode = (await getExpenseModeById(
        transaction.expenseModeId.toString()
      )) as ExpenseMode;
      const bankAccount = (await getBankAccountsByBankAccountId(
        expenseMode.bankAccountId.toString()
      )) as BankAccount;
      const diffAmount = newAmount - previousAmount;
      const balance = bankAccount.balance - diffAmount;
      const success = await updateBankAccountById(
        expenseMode.bankAccountId.toString(),
        { balance }
      );
    }
    if (transaction.type === TransactionType.Transfer) {
      const diffAmount = newAmount - previousAmount;
      const toBankAccountId = transaction.toBankAccountId;
      const toBankAccount = (await getBankAccountsByBankAccountId(
        toBankAccountId.toString()
      )) as BankAccount;
      const fromBankAccountId = transaction.fromBankAccountId;
      const fromBankAccount = (await getBankAccountsByBankAccountId(
        fromBankAccountId.toString()
      )) as BankAccount;
      const toBalance = toBankAccount.balance + diffAmount;
      const fromBalance = fromBankAccount.balance - diffAmount;
      const result1 = await updateBankAccountById(toBankAccountId.toString(), {
        balance: toBalance,
      });
      const result2 = await updateBankAccountById(
        fromBankAccountId.toString(),
        {
          balance: fromBalance,
        }
      );
    }
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
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
    const transactionId = req.body._id;
    const success = await deleteTransactionById(transactionId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
