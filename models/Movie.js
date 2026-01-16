import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: [
      {
        type: String,
      },
    ],

    releaseDate: {
      type: Date,
    },

    duration: {
      type: Number, // minutes
    },

    rating: {
      type: Number,
      default: 0,
    },

    poster: {
      type: String, // image URL
    },

    backdrop: {
      type: String, // banner image
    },

    language: {
      type: String,
      default: "English",
    },

    director: String,
    cast: [String],

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
