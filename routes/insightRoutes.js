import express from "express";
import { protect, managerOnly } from "../middleware/authMiddleware.js";
import { getInsights } from "../controllers/insightController.js";

const router = express.Router();
router.get("/", protect, managerOnly, getInsights);

export default router;
