const express = require('express')
const router = express.Router();
const ratingController = require('../../controllers/ratings/index.js');


router.post("/crt", ratingController.createRatings);
// router.post("/", delete);


module.exports = router