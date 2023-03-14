import { Express } from "express";
import { accountsController } from "./AccountsController";
import { bankAccountsController } from "./BankAccountsController";
import { categoryController } from "./CategoryController";
import { expenseModeController } from "./ExpenseModeController";
import { transactionController } from "./TransactionController";
import { usersController } from "./UsersController";

export function registerControllers(app: Express) {
  bankAccountsController(app);
  usersController(app);
  accountsController(app);
  categoryController(app);
  expenseModeController(app);
  transactionController(app);
}
