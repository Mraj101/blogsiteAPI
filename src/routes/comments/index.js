const express = require('express')
const router = express.Router();
const commentControllers = require('../../controllers/comments/index.js');


router.post("/crt", commentControllers.createComments
);

router.post("/update", commentControllers.updateComments
);
router.get("/getComments/:id", commentControllers.getComments
);
// router.post("/", delete);


module.exports = router