import { Express } from "express";
import { RouteTransactions } from "../utils/Routes";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../services/TransactionService";

export function transactionController(app: Express) {
  app
    .route(RouteTransactions)
    .get(getTransactions)
    .post(createTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);
}
