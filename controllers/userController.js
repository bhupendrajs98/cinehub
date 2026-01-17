import User from "../models/User.js";

/* ================= ADMIN: GET ALL USERS ================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password exclude
    res.json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

/* ================= USER PROFILE ================= */
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

/* ================= WATCHLIST ================= */
export const addToWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user.watchlist.includes(req.params.movieId)) {
    user.watchlist.push(req.params.movieId);
    await user.save();
  }

  res.json(user.watchlist);
};

export const removeFromWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.watchlist = user.watchlist.filter(
    (id) => id.toString() !== req.params.movieId
  );

  await user.save();
  res.json(user.watchlist);
};

export const getWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("watchlist");
  res.json(user.watchlist);
};
