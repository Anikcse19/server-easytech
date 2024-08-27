// controllers/productController.js
import { mongooseConnect } from "../config.js";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

export const getExistsUser = async (req, res) => {
  await mongooseConnect();

  const { email } = req.body;

  const existsUser = await User.findOne({ email }).select("_id");

  res.status(200).json(existsUser);
};

export const userLogin = async (req, res) => {
  try {
    await mongooseConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    // Or using spread operator
    if (isMatch) {
      let userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(200).json({
        error: false,
        user: userWithoutPassword,
      });
    } else {
      res.status(200).json({
        error: false,
        message: "Wrong email or Password",
      });
    }
  } catch (error) {
    res.json({ message: "Error occured during registration" });
  }
};

export const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await mongooseConnect();

    const hashedpass = await bcrypt.hash(password, 10);
    //   console.log("hashedPass", hashedpass);

    const userDoc = await User.create({ name, email, password: hashedpass });
    //   console.log(userDoc);

    res.status(200).json({
      error: false,
      message: "user registered",
    });
  } catch (error) {
    res.json({ message: "Error occured during registration" });
  }
};
