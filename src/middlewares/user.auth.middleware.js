const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const userModels = require("../models/user.models");
const { ApiResponse } = require("../utils/ApiResponse");

async function verifyJWT(req, res, next) {
  try {
    // console.log( "hi i am here middle ware verifying jwt");
    // console.log(req.headers["authorization"]?.split(" ")[1]);
 
      const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    
    console.log(token, "token");
    if (!token) {
      //   return {
      //     data: null,
      //     statusCode: statusCode.internalServerError,
      //     error: true,
      //     message: "unathorized request",
      //   };
      throw new ApiError(404, "unothorized request");
    }
    // console.log('hi verify jwt');
    // console.log("hi",process.env.ACCESS_TOKEN_SECRET);

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log(decoded, "decoded things");
      const user = await userModels.findById(decoded._id).select("-password -refreshToken").lean();
      // console.log(user, "par kar pita");
   
    if (!user) {
      throw new ApiError(404, "no user was found while verifying jwt token");
      //   return {
      //     data: null,
      //     message: "invalid user request",
      //     error: true,
      //   };
    }

    req.user = { ...user };
    // console.log(req.user,"this is req.user");
    next();
    //writing a comment when in am initiating and engaging in code :)
  } catch (error) {
    console.log(error)
    if (error instanceof ApiError) {
      return new ApiResponse(error.statusCode, error.message);
    } else {
      return new ApiResponse(500, "inter server error while verification jwt");
    }
  }
}


module.exports = { verifyJWT };
