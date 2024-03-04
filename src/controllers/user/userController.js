// const { create, login } = require("../../core/services/user");
const userServices = require("../../core/services/user/user.js");
const cookie = require("cookie-parser");

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
    // console.log("Controller",req)
    // let response = await userServices.create(req.body);
    return res.status(200).send(req.body);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

async function loginUser(req, res) {
  try {
    // let { options,modifiedUser} = await userServices.login(req.body);
    // let accessToken = modifiedUser.accessToken
    // let refreshToken = modifiedUser.refreshToken
    // console.log(modifiedUser,"hi");
    return res.status(200).send(req.body);
    // .cookie("accessToken",modifiedUser.accessToken,options)
    // .cookie("refreshToken",modifiedUser.refreshToken,options)
    // .send({user:modifiedUser,accessToken,refreshToken});
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

async function logoutUser(req, res) {
  try {
    // console.log("Controller",req)
    // let response = await userServices.logout(req.body);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

module.exports = { createUser, loginUser, logoutUser };
