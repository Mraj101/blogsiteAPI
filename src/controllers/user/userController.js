// const { create, login } = require("../../core/services/user");
const userServices = require("../../Core/services/user/user.js");
const cookie = require("cookie-parser");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { ApiError } = require("../../utils/ApiError.js");


// const createErrorMessage = () => {
//   return {
//     status: "",
//     data: null,
//     error: false,
//     message: "",
//   };
// };

async function createUser(req, res) {
  try {
    // console.log("Controller create user", req.body);
    // console.log("hello");
    let response = await userServices.create(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "User registered Successfully"));
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

async function loginUser(req, res) {
  try {
    let { options, modifiedUser } = await userServices.login(req.body);
    // console.log(modifiedUser, "hi in controller");
    // console.log(modifiedUser.refreshToken, "in login controller refresh token");
    // console.log(modifiedUser.accessToken, "in login controller accessToken");
    return res
      .status(201)
      .cookie("accessToken", modifiedUser.accessToken, options)
      .cookie("refreshToken", modifiedUser.refreshToken, options)
      .json(new ApiResponse(200, modifiedUser, "userLogged in successfull"));
  } catch (err) {
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      // console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = statusCode.internalServerError;
    // newError.message = "User Control Service Internal Server Error";
    // return res.status(statusCode).send(newError);
  }
}



async function logoutUser(req, res) {
  try {
    console.log("Controller user logout ");
    let response = await userServices.logout(req);
    // console.log("logout service response in controller",response)
    return res
      .status(201)
      .clearCookie("accessToken", response.options)
      .clearCookie("refreshToken", response.options)
      .json(new ApiResponse(201, {}, "user logged out successfull"));
  } catch (err) {
    // console.log(err);
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


async function refreshAccessToken(req, res) {
  try {
    console.log(" inside refresh controller ");
    const response = await userServices.tokenRefresh(req);
    // console.log("after tokern refresh service");
    return res
      .status(200)
      .cookie("accessToken", response.accessToken, response.options)
      .cookie("refreshToken", response.refreshToken, response.options)
      .json(
        new ApiResponse(
          200,
          { accessToken:response.accessToken, refreshToken:response.refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    if (error instanceof ApiError)
      return new ApiResponse(error.statusCode, null, error.message);
    else
      return new ApiResponse(
        500,
        null,
        "internal refreshAccess token server error"
      );
  }
}


async function changeCurrentPassword(req, res) {
  try {
    // console.log(" inside change password controller ");
    const response = await userServices.changePassword(req);
    // console.log("after tokern refresh service");
    return res.status(200).json(new ApiResponse(200, response, "Password changed successfully"));
  } catch (error) {
    if (error instanceof ApiError)
      return new ApiResponse(error.statusCode, null, error.message);
    else
      return new ApiResponse(
        500,
        null,
        "internal refreshAccess token server error"
      );
  }
}


module.exports = { createUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword };
