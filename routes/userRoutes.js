// routes/productRoutes.js
import express from "express";

import {
  getExistsUser,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/userExists", getExistsUser);
router.post("/login", userLogin);
router.post("/registration", userRegistration);

export default router;
