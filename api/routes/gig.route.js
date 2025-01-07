import express from "express";
import {
    createGig,
    deleteGig,
    getGig,
    getGigs,
    updateGig,
    getUserGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Public routes
router.get("/", getGigs);
router.get("/single/:id", getGig);

// Protected routes (require authentication)
router.post("/", verifyToken, createGig);
router.put("/:id", verifyToken, updateGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/mygigs", verifyToken, getUserGigs);

export default router;