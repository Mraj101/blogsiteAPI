const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError.js");
const commentServices = require('../../Core/services/comments/index.js')



async function createComments(req, res) {
    try {
      console.log("Controller", req.body);
      console.log("hello");
      let response = await commentServices.create(req.body);
      return res
        .status(201)
        .json(new ApiResponse(200, response, "comments created Successfully"));
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

  async function updateComments(req, res) {
    try {
      // console.log("Controller", req.body);
      // console.log("hello");
      let response = await commentServices.update(req);
      return res
        .status(201)
        .json(new ApiResponse(200, response, "comments updated Successfully"));
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

  async function getComments(req, res) {
    try {
      // console.log("Controller of getting comments", req.body);
      console.log("hello get comment");
      let response = await commentServices.getComments(req);
      return res
        .status(201)
        .json(new ApiResponse(200, response, "get comments of a particular blog"));
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


  module.exports = { createComments,getComments, updateComments }
  