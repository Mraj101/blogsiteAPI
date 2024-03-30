const express = require("express");
const router = express.Router();
const viewController = require("../../controllers/viewCounts/index.js");
router.get("/getAll", viewController.getCounts);
router.post("/update/:id", viewController.updateCount);

module.exports = router;
