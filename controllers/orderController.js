import { mongooseConnect } from "../config.js";
import { Order } from "../models/Order.js";

import { Product } from "../models/Product.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LUKFUKs7xOwQgvMhENJsXbAtUEp5eipklSwmTsHp0i6HyQLQLHO2w9I43YOfhdNOBk7AfI4JQFioUi885jJX9ry00DHeV3mRw"
);

export const postOrder = async (req, res) => {
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  await mongooseConnect();

  const productsIds = cartProducts;
  // console.log(productsIds)
  const uniqueIds = [...new Set(productsIds)];
  // console.log(uniqueIds)
  const productsInfos = await Product.find({ _id: uniqueIds });
  //   console.log(productsInfos);

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    // console.log('product-info',productInfo)
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
    // console.log(line_items)
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
};
