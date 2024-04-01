const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError.js");
const viewServices = require("../../Core/services/viewCount/index.js");

async function updateCount(req, res) {
  try {
    // console.log("Controller", req.body);
    // console.log("hello count");
    let response = await viewServices.update(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "count created Successfully"));
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


async function getCounts(req, res) {
  try {
    console.log("Controller", req.body);
    console.log("hello get popular blogs");
    let response = await viewServices.get(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "get popular blogs Successfull"));
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


module.exports = { updateCount, getCounts };
