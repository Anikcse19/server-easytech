// controllers/orderController.js
import { mongooseConnect } from "../config.js";
import { Order } from "../models/Order.js";
import { buffer } from "micro";
import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SK);

export const handleStripeWebhook = async (req, res) => {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];
  const endpointSecret =
    "whsec_48f2c797a3ed730520264869c21ae737aa4f672f0dd20583b92eec054252ad6f";

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, { paid: true });
    }
  }

  res.status(200).send("ok");
};
