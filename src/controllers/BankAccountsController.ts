import { Express } from "express";
import { RouteBankAccounts } from "../utils/Routes";
import {
  addBankAccount,
  deleteBankAccount,
  getBankAccounts,
  updateBankAccount,
} from "../services/BankAccountsService";

export function bankAccountsController(app: Express) {
  app
    .route(RouteBankAccounts)
    .get(getBankAccounts)
    .post(addBankAccount)
    .put(updateBankAccount)
    .delete(deleteBankAccount);
}
