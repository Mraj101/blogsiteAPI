const blogsModels = require("../../../models/blogs.models");
const countModels = require("../../../models/count.models");
const userModels = require("../../../models/user.models");
const { ApiError } = require("../../../utils/ApiError");
const { uploadOnCloudinary } = require("../../../utils/cloudinary");

async function create(data) {
  try {
    // console.log(data.file, "file");
    // console.log(data.body, "data body");
    // const { title , content } = data;
    const imgOnCloudinary = await uploadOnCloudinary(data.file.path);
    // console.log(imgOnCloudinary,"cloud image")

    const blogInstance = await blogsModels.create({
      title: data.body.title,
      content: data.body.content,
      img: imgOnCloudinary.url,
      user: data.body.user,
    });

    const userInstance = await userModels.findById(data.body.user);

    // console.log(userInstance,"userinstance");

    const blogCreated = {
      username: userInstance.username,
      userImg: userInstance.img,
      userEmail: userInstance.email,
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

async function getAll() {
  try {
    const allBlogs = await blogsModels.find({}).lean();
    const allUsers = await userModels.find({}).lean();
    const allViews = await countModels.find({}).lean();
    // console.log(allBlogs,"allblogs");
    // console.log(allUsers,"allusers");

    const blogs = allBlogs.map((singleBlog) => {
      const user = allUsers.find(
        (singleUser) => singleUser._id.toString() === singleBlog.user.toString()
      );
      const view = allViews.find(
        (singleView)=>singleView.blogId.toString()=== singleBlog._id.toString()
      )
      // console.log(singleBlog.user,"user");
      // console.log(user,"singleUser");
      if (user) {
        return {
          ...singleBlog,
          count:view.count,
          userImage: user.img,
          userName: user.username,
        };
      }
    });
    // console.log(blogs,"blogs");
    return blogs;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "BlogService not available");
    }
  }
}

async function get(data) {
  try {
    // console.log("inside get all blogs",data.body);
    const userId = data.body._id;

    const allBlogs = await blogsModels.find({ user: userId }).lean();

    const blogUser = await userModels.findById(userId).lean();

    // console.log("all blogs",allBlogs);
    // console.log("blog user",blogUser);

    const modifiedBLogs = allBlogs.map((singleBlog, index) => {
      return {
        _id: singleBlog._id,
        title: singleBlog.title,
        content: singleBlog.content,
        img: singleBlog.img,
        createdAt: singleBlog.createdAt,
        updatedAt: singleBlog.updatedAt,
        userImage: blogUser.img,
        userName: blogUser.username,
        ...singleBlog,
      };
    });
    // console.log(modifiedBLogs)

    return modifiedBLogs;
  } catch (error) {
    console.log(error);
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
    const { id } = data.params;
    //   console.log(data.params,"parameter");
    const singleBlog = await blogsModels.findById(id).lean();
    const singleUser = await userModels.findById(singleBlog.user).lean();
    // console.log(singleBlog,"singleblog");
    // console.log(singleUser,"singleuser");
    const modifiedResponse = {
      ...singleBlog,
      username: singleUser.username,
      userImg: singleUser.img,
    };
    // console.log(modifiedResponse,"response modified");
    return modifiedResponse;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "BlogService not available");
    }
  }
}

module.exports = { create, get, getAll, getSingle };
