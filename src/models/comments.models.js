const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comments: {
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

module.exports = mongoose.model("Comments", commentSchema);
