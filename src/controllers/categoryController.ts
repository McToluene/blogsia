import { Request, Response } from "express";
import { Category } from "../models/Category";
import logger from "../utils/logger";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ msg: "Categories not found" });
    }
    res.json(categories);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    let category = await Category.findOne({ title });
    if (category) {
      return res.status(409).json({ msg: "Category already exists" });
    }

    category = new Category({
      title
    });

    await category.save();
    res.send(category);
  } catch (error) {
    logger.error(error.message);
    res.send(500).send("Server Error");
  }
};
