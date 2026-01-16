import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Middlewares
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config();

// Connect MongoDB Atlas
connectDB();

const app = express();

// ---------- Global Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- Root ----------
app.get("/", (req, res) => {
  res.send("🎬 Movie Application API is running...");
});

// ---------- API Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ---------- 404 Handler ----------
app.use(notFound);

// ---------- Global Error Handler ----------
app.use(errorHandler);

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
