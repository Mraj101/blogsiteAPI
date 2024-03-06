const TOKENS = require("./helperfuncitons/tokens.js");
const userModels = require("../../../models/user.models.js");
// const Cryptography = require("./helperfuncitons/Cryptography");
const { ApiError } = require("../../../utils/ApiError.js");
const bcrypt = require("bcrypt");

//sigup user services
async function create(data) {
  try {
    const { username, email, fullName, password } = data;
    console.log(username, email, fullName, password, "data adsf");
    //checking if the feilds are empty
    if (
      [username, email, fullName, password].some(
        (feild) => feild?.trim() === ""
      )
    ) {
      // console.log("no error why?");
      throw new ApiError(404, "all feilds must be filled");
    }

    const existsEmail = await userModels.findOne({ email });
    // console.log(existsEmail,'email');

    if (existsEmail) {
      throw new ApiError(409, "User with email or username already exists");
    }
    console.log("hi exist");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModels.create({
      fullName,
      email,
      password: hash,
      username: username.toLowerCase(),
    });

    if (!user) {
      throw new ApiError(500, "could not create user");
    }

    // console.log(user,"user we have saved");

    // console.log('before encrypting payload')

    const payLoad = {
      email: user.email,
      name: user.username,
    };
    console.log(payLoad, "pay");
    return payLoad;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err; // Re-throw the ApiError
    } else {
      throw new ApiError(500, "Service not available");
    }
  }
}

//login services
//chekc email || user name is in the req
//check in the document the email or the user exist
//math the password
//access refresh token
//send cookies
//send back the response.

async function login(data) {
  try {
    // console.log(data, "data or not?");
    const { email, password } = data;
    if ([email,password].some((feild)=>feild?.trim()==="")) {
      throw new ApiError(400, "user name or email required");
    }
    // console.log(email,password,"print");
    const user = await userModels.findOne({ email });
    // console.log(user, "hit or not");
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const match = await bcrypt.compare(password, user.password);
    // console.log(match, "match results");
    if (!match) {
      throw new ApiError(401, "invalid user credential");
    }
    //  console.log(email,"with what ")
    const { accessToken, refreshToken, userInstance } =await TOKENS.generateAccessAndRefreshToknes(email);
    // console.log(accessToken, "actokens");
    // console.log(refreshToken, "retokens")
    // console.log(userInstance, "logged in");
    let modifiedUser = {
      username: userInstance.username,
      email: userInstance.email,
      fullName:userInstance.fullName,
      accessToken,
      refreshToken,
    };
    // console.log(modifiedUser, "modified user");
    const options = {
      httpOnly: true,
      secure: true,
    };

    return { options, modifiedUser };

    //encrypting our payload
    //convert the document into string
    // const payloadString=JSON.stringify(payLoad)
    // console.log("here is the pay load",payLoad);
    // const encryptedPayload = Cryptography.encryptPayload(payloadString);
    // console.log(encryptedPayload,"here is the encrypted payload");
    // console.log('after encrypting payload')

    //lets decrypt the data
    // const decryptedPayload = Cryptography.decryptPayload(encryptedPayload);
    // console.log(decryptedPayload, "decrypted value");

    //generating token
    // const token = TOKENS.createAccessToken({ encryptedPayload });
    // return { userToken: token };
  } catch (err) {
   if(err instanceof ApiError){
    throw err;
   }else{
    throw new ApiError(500,"login service not available")
   }
  }
}

async function logout(req, res) {
  try {
    // console.log("hello logout");
    // console.log("hi req.user",req.user);
    const user = await userModels.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )
    if(!user){
      throw new ApiError(404,"user not found");
    }
    const options={
      httpOnly:true,
      secure:true
    }
    return {};
    // console.log(token,'token var in logout service');
  } catch (error) {
    if(error instanceof ApiError){
      throw error;
    }
    else{
      throw new ApiError(500,"logout service internal error")
    }
  }
}

module.exports = { create, login, logout };
