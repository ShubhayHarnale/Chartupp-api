import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// Payment intent
router.post("/create-payment-intent/:id", verifyToken, intent);

// Get orders
router.get("/", verifyToken, getOrders);

// Confirm order
router.put("/", verifyToken, confirm);

export default router;