require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware


const app = express(); // Create an Express app

app.use(cors(process.env.CORS_ORIGIN));

module.exports = { app };
