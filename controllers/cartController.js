import { mongooseConnect } from "../config.js";
import { Product } from "../models/Product.js";

export const getCartItems = async (req, res) => {
  await mongooseConnect();

  const ids = req.body.ids;

  //  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
};
