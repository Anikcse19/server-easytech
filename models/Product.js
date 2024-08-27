import pkg from "mongoose";
const { Schema, model, models } = pkg;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    reviews: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
