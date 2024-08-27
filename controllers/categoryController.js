// controllers/productController.js
import { mongooseConnect } from "../config.js";
import { Category } from "../models/Category.js";

export const getCategories = async (req, res) => {
  await mongooseConnect();
  const categories = await Category.find({});
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  await mongooseConnect();
  const { id } = req.params;

  const singleCategoryDoc = await Category.findById(id);

  res.status(200).json(singleCategoryDoc);
};
