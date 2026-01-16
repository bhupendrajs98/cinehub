import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;

  const existingReview = await Review.findOne({
    user: req.user._id,
    movie: req.params.movieId,
  });

  if (existingReview)
    return res.status(400).json({ message: "Already reviewed" });

  const review = await Review.create({
    user: req.user._id,
    movie: req.params.movieId,
    rating,
    comment,
  });

  const reviews = await Review.find({ movie: req.params.movieId });
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await Movie.findByIdAndUpdate(req.params.movieId, {
    rating: avgRating.toFixed(1),
  });

  res.status(201).json(review);
};

export const getReviewsByMovie = async (req, res) => {
  const reviews = await Review.find({ movie: req.params.movieId }).populate(
    "user",
    "name"
  );
  res.json(reviews);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  await review.deleteOne();

  const reviews = await Review.find({ movie: review.movie });
  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  await Movie.findByIdAndUpdate(review.movie, {
    rating: avgRating.toFixed(1),
  });

  res.json({ message: "Review deleted" });
};

