import { NextFunction, Request, Response } from "express";
import {
  createNewCategory,
  deleteCategoryById,
  getCategoriesByAccountId,
  updateCategoryById,
} from "../dao/CategoryDao";
import { ResponseEntity } from "../interfaces/ResponseEntity";

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accountId = req.query.accountId as string;
    const categories = await getCategoriesByAccountId(accountId);
    const response: ResponseEntity = {
      ok: true,
      data: categories,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCategory = await createNewCategory(req.body);
    const body: ResponseEntity = {
      ok: true,
      data: newCategory,
    };
    res.send(body);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.query.id as string;
    const category = req.body;
    const success = await updateCategoryById(categoryId, category);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.body._id;
    const success = await deleteCategoryById(categoryId);
    const response: ResponseEntity = {
      ok: success,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
}
