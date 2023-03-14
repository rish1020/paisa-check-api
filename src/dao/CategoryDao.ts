import { Category } from "../interfaces/Category";
import { Collection } from "../utils/Constants";
import { Db, MongoClient, ObjectId } from "mongodb";

const CollectionName = Collection.Categories;

export async function getCategoriesByAccountId(accountId?: string) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      $or: [{ accountId: "default" }, { accountId }],
    };
    const options = {};
    const cursor = collection.find(query, options);
    const categories = await cursor.toArray();
    await cursor.close();
    return categories;
  } catch (error) {
    throw error;
  }
}

export async function createNewCategory(category: Partial<Category>) {
  try {
    const collection = (database as Db).collection(CollectionName);
    const result = await collection.insertOne(category);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateCategoryById(
  categoryId: string,
  category: Partial<Category>
): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(categoryId),
    };
    const result = await collection.updateOne(query, { $set: category });
    if (result.matchedCount === result.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteCategoryById(categoryId: string): Promise<boolean> {
  try {
    const collection = (database as Db).collection(CollectionName);
    const query = {
      _id: new ObjectId(categoryId),
    };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
