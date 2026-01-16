import express from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMovies,
} from "../controllers/movieController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Public routes
 */

// Get all movies
router.get("/", getMovies);

// Search movies → /api/movies/search?q=batman
router.get("/search", searchMovies);

// Filter & sort → /api/movies/filter?genre=Action&sort=rating
router.get("/filter", filterMovies);

// Get single movie by ID
router.get("/:id", getMovieById);

/**
 * Admin routes
 */

// Add movie
router.post("/", protect, adminOnly, addMovie);

// Update movie
router.put("/:id", protect, adminOnly, updateMovie);

// Delete movie
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
