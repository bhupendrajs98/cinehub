import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const movies = await Movie.countDocuments();
  const reviews = await Review.countDocuments();

  const topMovies = await Movie.find().sort({ rating: -1 }).limit(5);

  res.json({
    users,
    movies,
    reviews,
    topMovies,
  });
};

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// ✅ DELETE USER (MISSING THA)
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
};
