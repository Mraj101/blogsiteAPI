const mongoose = require("mongoose");

const userViewsSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: true,
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"Users",
    //     required:true,
    // },
    isCounted:{
      type:Boolean,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("UserViews", userViewsSchema);
