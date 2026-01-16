import express from "express";
import {
  addReview,
  getReviewsByMovie,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add review
router.post("/:movieId", protect, addReview);

// Get reviews of a movie
router.get("/:movieId", getReviewsByMovie);

// Admin can delete reviews
router.delete("/:id", protect, adminOnly, deleteReview);

export default router;
