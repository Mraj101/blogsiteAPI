const commentsModel = require("../../../models/blogs.models");
const { ApiError } = require("../../../utils/ApiError");

async function create(data){
    try {

        //  console.log(data);
    const { title , content } = data;
    const blogInstance = await blogsModels.create(
        {
            title,
            content,
        }
    );
    const blogCreated = {
        title:blogInstance.title,
        content:blogInstance.content,
        createdAt:blogInstance.createdAt,
        updatedAt:blogInstance.updatedAt,
    }
    // console.log(blogInstance,"bloginstance"); 
    return blogCreated
    } catch (error) {
        if (error instanceof ApiError) {
            throw error; 
          } else {
            console.log(error)
            throw new ApiError(500, "BlogService not available");
          }    
    }
}

module.exports = { create }