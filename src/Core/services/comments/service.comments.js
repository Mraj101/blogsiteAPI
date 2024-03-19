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
    const { id } = data.params;
    console.log(id,'id')
    const objectData = data.body;
    // delete objectData._id;
    console.log(objectData[0], 'obj data')
    const commentInstance = await commentsModels.findByIdAndUpdate(id, objectData[0], { new: true });
    console.log(commentInstance,'intnc');

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
