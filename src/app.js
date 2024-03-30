require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const cookieParser = require("cookie-parser");

const app = express(); // Create an Express app

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
    ));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


module.exports = { app };
