// const { create, login } = require("../../core/services/user");
const userServices = require('../../Core/services/user/user.js');
const cookie = require("cookie-parser");
const {ApiResponse} = require('../../utils/ApiResponse.js')
const {ApiError} = require('../../utils/ApiError.js')
const createErrorMessage = () => {
  return {
    status: "",
    data: null,
    error: false,
    message: "",
  };
};

async function createUser(req, res) {
  try {
    console.log("Controller",req.body)
    console.log('hello')
    let response = await userServices.create(req.body);
    return res.status(201).json(
      new ApiResponse(200, response, "User registered Successfully")
  )
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

async function loginUser(req, res) {
  try {
    let { options,modifiedUser} = await userServices.login(req.body);
    console.log(modifiedUser,"hi in controller");
    return res.status(201)
    .cookie("accessToken",modifiedUser.accessToken,options)
    .cookie("refreshToken",modifiedUser.refreshToken,options)
    .json(new ApiResponse(200,modifiedUser,"userLogged in successfull"))
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      // console.error(err);
      return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = statusCode.internalServerError;
    // newError.message = "User Control Service Internal Server Error";
    // return res.status(statusCode).send(newError);
  }
}

// abcdefghijklmnopqrstuvwxyz
async function logoutUser(req, res) {
  try {
    // console.log("Controller",req)
    // let response = await userServices.logout(req.body);
    return res.status(200).send(response);
  } catch (err) {
    // console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

module.exports = { createUser, loginUser, logoutUser };
