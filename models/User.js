import pkg from "mongoose";
const { Schema, model, models } = pkg;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || model("User", userSchema);
