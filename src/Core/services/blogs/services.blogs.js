const blogsModels = require("../../../models/blogs.models");
const { ApiError } = require("../../../utils/ApiError");
const { uploadOnCloudinary } = require("../../../utils/cloudinary");

async function create(data) {
  try {
    console.log(data.file, "file");
    console.log(data.body, "data body");
    // const { title , content } = data;
    const imgOnCloudinary = await uploadOnCloudinary(data.file.path);
    // console.log(imgOnCloudinary,"cloud image")

    const blogInstance = await blogsModels.create({
      title: data.body.title,
      content: data.body.content,
      img: imgOnCloudinary.url,
    });

    const blogCreated = {
      title: blogInstance.title,
      content: blogInstance.content,
      createdAt: blogInstance.createdAt,
      updatedAt: blogInstance.updatedAt,
    };
    // console.log(blogInstance,"bloginstance");
    return blogCreated;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "BlogService not available");
    }
  }
}

async function getAll(data) {
  try {

    const allBlogs = await blogsModels.find({})
    // console.log("all blogs",allBlogs);
    return allBlogs;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "BlogService not available");
    }
  }
}

async function getSingle(data) {
    try {
      const {id} = data.params 
    //   console.log(data.params,"parameter");
      const singleBlog = await blogsModels.findById(id)
      console.log("single blog",singleBlog);
      return singleBlog;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        console.log(error);
        throw new ApiError(500, "BlogService not available");
      }
    }
  }
  
module.exports = { create ,getAll,getSingle};
