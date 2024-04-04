const commentsModels = require("../../../models/comments.models.js");
const userModels = require("../../../models/user.models.js");
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
    const commentInstances = await commentsModels.find({ blogId: id }).lean();
    const allUsers = await userModels.find({}).lean();
     const modifiedCommentInstance = commentInstances.map((singleComment)=>{
      let user = allUsers.find(
        (singleUser)=>singleUser._id.toString()===singleComment.user.toString())
        return{
          ...singleComment,
          userImg:user.img,
          userName:user.username,
        }
     })

    console.log(modifiedCommentInstance, "comment instances");
    return modifiedCommentInstance;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "comments service error");
    }
  }
}

module.exports = { create, getComments, update };
