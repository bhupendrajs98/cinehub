import Movie from "../models/Movie.js";

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add movie (Admin only)
export const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update movie (Admin only)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete movie (Admin only)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search movies
export const searchMovies = async (req, res) => {
  const keyword = req.query.q
    ? { title: { $regex: req.query.q, $options: "i" } }
    : {};

  const movies = await Movie.find(keyword);
  res.json(movies);
};

// Filter & sort
export const filterMovies = async (req, res) => {
  const { genre, year, sort } = req.query;

  let filter = {};
  if (genre) filter.genre = genre;
  if (year) filter.releaseYear = year;

  let sortOption = {};
  if (sort === "rating") sortOption.rating = -1;
  if (sort === "name") sortOption.title = 1;

  const movies = await Movie.find(filter).sort(sortOption);
  res.json(movies);
};
