import express from "express";
import {
  deleteUser,
  getUser,
  getCurrentUser,
  updateUser,
  getSellerProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Protected routes (require authentication)
router.get("/me", verifyToken, getCurrentUser);

// Seller route must come before generic id route
router.get("/seller/:id", getSellerProfile);

// Generic routes
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;