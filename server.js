// server.js
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
// Allow frontend origins: production + local dev
const allowedOrigins = [
  "https://cinehub-frontend-eta.vercel.app", // frontend prod
  "http://localhost:5173" // frontend dev
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Limit JSON payload size
app.use(express.json({ limit: "10mb" }));
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
app.listen(PORT, process.env.IP || "0.0.0.0", () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
