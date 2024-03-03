const mongoose = require('mongoose');
const  dbName  = require("../constants.js");



const DbConnect=async ()=> {
      try {
    let connectionInstance = await mongoose.connect(`${process.env.CONNECTION_URI}/${dbName}`);
    console.log("Connected to MongoDB, !! HOST:",connectionInstance.connection.host);
  } catch (error) {
    console.log("Connection failed and more: ", error);
    process.exit(1);
  }
}


module.exports =  DbConnect