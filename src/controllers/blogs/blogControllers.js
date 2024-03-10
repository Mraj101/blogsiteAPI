const blogServices = require("../../Core/services/blogs/index");
const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError.js");

async function creatBlogs(req, res) {
  try {
    console.log("Controller", req.body);
    console.log("hello");
    let response = await blogServices.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "BLOGS created Successfully"));
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

module.exports = { creatBlogs };
