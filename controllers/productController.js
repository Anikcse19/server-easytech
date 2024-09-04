// controllers/productController.js
import { mongooseConnect } from "../config.js";
import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  await mongooseConnect();
  const products = await Product.find({});
  res.json(products);
};

export const getProductById = async (req, res) => {
  await mongooseConnect();
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const createOrUpdateProduct = async (req, res) => {
  console.log("post api hit");

  await mongooseConnect();

  const { _id, review } = req.body;

  const product = await Product.findById(_id);

  if (product) {
    product.reviews.push(review);
    await product.save();
  } else {
    await Product.create(productData);
  }

  res.json({ message: "Product saved" });
};

export const getProductsByCategory = async (req, res) => {
  await mongooseConnect();
  const { id } = req.params;

  const productsFilteredByCat = await Product.find({ category: id });

  res.status(200).json(productsFilteredByCat);
};
