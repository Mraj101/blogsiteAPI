const mongoose = require("mongoose");

const countSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ViewCount", countSchema);
