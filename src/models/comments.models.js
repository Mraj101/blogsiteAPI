const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    blogId:{
      type:mongoose.Types.ObjectId,
      ref:'Blogs',
      required:true,
    },
    comment: {
        type: String,
        required: true
    },
    user:{
      type:mongoose.Types.ObjectId,
      ref:'Users',
      required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
