const TOKENS = require("./helperfuncitons/tokens.js");
// const Cryptography = require("./helperfuncitons/Cryptography");


const bcrypt = require("bcrypt");


//sigup user services
async function create(data) {
  try {
    const { email, password, name } = data;

    //checking if the feilds are empty
    if (
      [email, password, name].some((feild) => {
        feild?.trim() === "";
      })
    ) {
      return {
        data: null,
        message: "all the feilds need to filled",
        error: true,
        status: statusCode.internalServerError,
      };
    }

    const existsEmail = await db
      .collection("user")
      .findOne({ email: data.email });

    // const a = await db
    // .collection("user")
    // .findOne({ $or:[{ name: data.name } , {email: data.email} ] })

    // console.log(a,"my a");

    if (existsEmail.data.email) {
      return {
        data: null,
        message: "Duplicate Data",
        error: true,
        status: statusCode.internalServerError,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    this.data = {
      ...data,
      password: hash,
    };

    // console.log('before data saved')
    let savedData = await db.collection("user").insert(this.data);
    // console.log('after data saved')
    if (!savedData) {
      return {
        data: null,
        statusCode: statusCode.internalServerError,
        error: true,
        message: "something went wrong wile saving user data",
      };
    }
    // console.log(savedData,"data we have saved");

    // console.log('before encrypting payload')

    const payLoad = {
      email: savedData.data.email,
      name: savedData.data.name,
    };
    console.log(payLoad);
    return payLoad;
  } catch (err) {
    return {
      data: null,
      statusCode: statusCode.internalServerError,
      error: true,
      message: "something went wrong while login",
    };
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
    console.log(data, "data or not?");
    const { email, password } = data;
    if (!(email || password)) {
      return {
        data: null,
        message: "all feilds need to be filled",
        error: true,
        status: statusCode.internalServerError,
      };
    }

    const user = await db.collection("user").findOne({ email });
    // console.log(user, "hit or not");

    const match = await bcrypt.compare(password, user.data.password);
    // console.log(match, "match results");
    if (!match) {
      return {
        data: null,
        message: "password did not match",
        error: true,
      };
    }f


   console.log(email,"with waht ")
  const { accessToken, refreshToken } =
      await TOKENS.generateAccessAndRefreshToknes(email);
  
 
    
    // console.log(accessToken, "tokens");

    const loggedinUser = await db.collection("user").findOne({ email });
    // console.log(loggedinUser, "logged in");

    let modifiedUser = {
      name: user.data.name,
      email: user.data.email,
      accessToken,
      refreshToken,
    };
    const options = {
      httpOnly: true,
      secure: true,
    };

    return {  options, modifiedUser };

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
    return {
      data: null,
      statusCode: statusCode.internalServerError,
      error: true,
      message: err.message,
    };
  }
}

async function logout(req,res) {
  console.log('hello logout');
  const user = await db.collection('user').findOne(req.user.data._id);
}

module.exports = { create, login, logout };
