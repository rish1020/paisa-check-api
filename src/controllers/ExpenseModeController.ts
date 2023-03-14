import { Express } from "express";
import { RouteExpenseModes } from "../utils/Routes";
import {
  createExpenseMode,
  deleteExpenseMode,
  getExpenseModes,
  updateExpenseMode,
} from "../services/ExpenseModeService";

export function expenseModeController(app: Express) {
  app
    .route(RouteExpenseModes)
    .get(getExpenseModes)
    .post(createExpenseMode)
    .put(updateExpenseMode)
    .delete(deleteExpenseMode);
}
