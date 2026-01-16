import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/users
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/watchlist", protect, getWatchlist);
router.post("/watchlist/:movieId", protect, addToWatchlist);
router.delete("/watchlist/:movieId", protect, removeFromWatchlist);

export default router;
