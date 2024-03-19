const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    ratings: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ratings", ratingSchema);
