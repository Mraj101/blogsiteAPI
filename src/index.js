require('dotenv').config()
const mongoose = require('mongoose');
const { dbName } = require("./constants.js");
const DbConnect = require("./db/index.js"); 
const {app} = require('./app.js')

DbConnect().then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log(`app listening on port: ${process.env.PORT} `);
        app.on("error",(error)=>{
            console.log("err:",error);
            throw Error;
        })
    })
})
.catch(error=>{
    console.log('mongo db connection failed !!, ',error)
})

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.CONNECTION_URI}/${dbName}`);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("Connection failed and more: ", error);
//     process.exit(1);
//   }
// })();
