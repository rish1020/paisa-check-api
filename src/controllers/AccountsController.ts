import { Express } from "express";
import { RouteAccounts } from "../utils/Routes";
import {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
} from "../services/AccountsService";

export function accountsController(app: Express) {
  app
    .route(RouteAccounts)
    .get(getAccount)
    .post(createAccount)
    .put(updateAccount)
    .delete(deleteAccount);
}
