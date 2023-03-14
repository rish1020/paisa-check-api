import { Express } from "express";
import { RouteCategories } from "../utils/Routes";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/CategoryService";

export function categoryController(app: Express) {
  app
    .route(RouteCategories)
    .get(getCategories)
    .post(createCategory)
    .put(updateCategory)
    .delete(deleteCategory);
}
