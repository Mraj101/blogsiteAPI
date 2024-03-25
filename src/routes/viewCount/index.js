const express = require('express')
const router=express.Router();
const viewController =require('../../controllers/viewCounts/index.js');



router.post("/update",viewController.updateCount);


module.exports = router