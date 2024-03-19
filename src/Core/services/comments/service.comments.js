const commentsModels = require("../../../models/comments.models.js");
const { ApiError } = require("../../../utils/ApiError");

async function create(data) {
  try {
    console.log(data, "comments");

    // const { comment, } = data;
    // console.log(comments,"data extract");

    const commentInstance = await commentsModels.create(data);

    // console.log(commentInstance,"commentInstance");
    // const createdComment = {
    //   comments: commentInstance.comments,
    // };

    return commentInstance;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "comments service error");
    }
  }
}

async function update(data) {
  try {
    console.log(data, "comments update");

    // const { comment, } = data;
    // console.log(comments,"data extract");

    const commentInstance = await commentsModels.findByIdAndUpdate(data);

    // console.log(commentInstance,"commentInstance");
    // const createdComment = {
    //   comments: commentInstance.comments,
    // };

    return commentInstance;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "comments service error");
    }
  }
}





async function getComments(data) {
  try {
    const { id } = data.params; 
    const commentInstances = await commentsModels.find({ blogId: id });
    console.log(commentInstances, "comment instances");
    return commentInstances;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "comments service error");
    }
  }
}

module.exports = { create, getComments, update };
