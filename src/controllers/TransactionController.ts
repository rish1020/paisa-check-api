import { Express } from "express";
import { RouteTransactions } from "../utils/Routes";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../services/TransactionService";

export function transactionController(app: Express) {
  app
    .route(RouteTransactions)
    .get(getTransactions)
    .post(createTransaction)
    .delete(deleteTransaction);
}
