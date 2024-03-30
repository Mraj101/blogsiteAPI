const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    content: {
      type: String,
      required: true,
    },
    img:{
      type: String,
      required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", 
        required: true,
      },
    // replies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Blogs", blogSchema);
