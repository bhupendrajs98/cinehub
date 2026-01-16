import User from "../models/User.js";

// Get profile
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// Update profile
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

// Add to watchlist
export const addToWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user.watchlist.includes(req.params.movieId)) {
    user.watchlist.push(req.params.movieId);
    await user.save();
  }

  res.json(user.watchlist);
};

// Remove from watchlist
export const removeFromWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.watchlist = user.watchlist.filter(
    (id) => id.toString() !== req.params.movieId
  );

  await user.save();
  res.json(user.watchlist);
};

// Get watchlist
export const getWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("watchlist");
  res.json(user.watchlist);
};
