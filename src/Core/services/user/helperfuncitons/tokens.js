const jwt = require("jsonwebtoken");
const userModels = require("../../../../models/user.models");
const { ApiError } = require("../../../../utils/ApiError");

function createAccessToken(userPayload) {
  return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

function createRefreshToken(_id) {
  return jwt.sign({ _id: _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}


async function generateAccessAndRefreshToknes(email) {
  try {
    let user = await userModels.findOne({ email }).select("-password -refreshToken").lean();
    // console.log(user, "inside gen acc ref")
    if(!user){
      throw new ApiError(404,"user not available while creating tokens")
    }
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user._id);
    // console.log(user,"user without refresh token")
    user={
      ...user,
      refreshToken:refreshToken
    }
    // console.log(user,"user with refresh token")
    let userInstance = await userModels.findByIdAndUpdate(user._id, user,{new:true}).select("-password -refreshToken");
    // console.log(userInstance,"update")
    // console.log("inside gen");
    // console.log(refreshToken);
    // console.log(accessToken);
    return { accessToken, refreshToken, userInstance};
  } catch (err) {
      if(err instanceof ApiError){
        throw err;
      }
      else{
        throw new ApiError(500,"service helper tokengenaration failed")
      }
  }
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  generateAccessAndRefreshToknes,
};
