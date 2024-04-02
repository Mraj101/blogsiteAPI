const { ApiError } = require("../../../utils/ApiError");
const countModels = require("../../../models/count.models");
const mongoose = require("mongoose");
const blogsModels = require("../../../models/blogs.models");
const userViewsModels = require("../../../models/userViews.models");

async function update(data) {
  try {
    let { loggedInUser } = data.body;
    let { id } = data.params;

 
    const existUserView = await userViewsModels.findOne({ user: loggedInUser, blogId: id });

    if (!existUserView) {
      const userView = await userViewsModels.create({
        blogId: id,
        user: loggedInUser
      });

      let count = await countModels.findOne({ blogId: id });

      if (!count) {
        count = await countModels.create({
          blogId: id,
          count: 1,
          userview: userView._id 
        });
      } else {
        count.count += 1;
      }
      await count.save();
    }

    return {};
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, "count view service error");
    }
  }
}


async function get(data) {
  try {
    const allViews = await countModels.find({}).lean();

    const allBLogs = await blogsModels.find({}).lean();

    let modifiedViews = allBLogs.map((singleBlog) => {
      let matched = allViews.find(
        (singleView) =>
          singleView.blogId.toString() === singleBlog._id.toString()
      );

      // Create a new object with properties from matched view and additional properties from singleBlog
      return {
        ...matched,
        title: singleBlog.title,
        content: singleBlog.content,
        img: singleBlog.img,
        user: singleBlog.user,
      };
    });

    // console.log(modifiedViews, "modified");
    modifiedViews.sort((a, b) => b.count - a.count);

    return modifiedViews;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "count view service error");
    }
  }
}

module.exports = { update, get };
