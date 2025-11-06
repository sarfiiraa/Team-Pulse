import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createQuestion, getQuestions, getQuestionById } from "../controllers/questionController.js";

const router = express.Router();
router.post("/", protect, createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);

export default router;
