import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

//  Public routes
router.post("/register", register);
router.post("/login", login);

//  Protected admin route
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
