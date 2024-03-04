const jwt = require("jsonwebtoken");

function createAccessToken(userPayload) {
  return jwt.sign({ _id: userPayload }, process.env.ACCESS_TOKEN_SECRET, {
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
    const user = await db.collection("user").findOne({ email });
    const accessToken = createAccessToken(user.data);
    const refreshToken = createRefreshToken(user.data._id);

    // console.log(user,"before");

    // console.log(user,"after");
  
    if (user) {
      return {accessToken,refreshToken}
    }
 
      console.log("inside not existing");
      user.data.refreshtoken = refreshToken;
      let instance = db.collection("user").update(user.data._id, user);
    

    // console.log(instance,"update")

    // console.log("inside gen");
    // console.log(refreshToken);
    // console.log(accessToken);
    // console.log(data);
    return { accessToken, refreshToken };
  } catch (error) {
    return {
      data: null,
      // message: "something went wrong while generating refresh and access token.",
      message:
        "something went wrong while generating refresh and access token.",
      error: true,
    };
  }
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  generateAccessAndRefreshToknes,
};
