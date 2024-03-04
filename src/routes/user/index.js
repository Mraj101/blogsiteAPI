const express = require('express')
const router=express.Router();

const {
    createUser,
    loginUser,
    logoutUser
}=require('../../controllers/user/userController.js')



router.post("/crt", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


module.exports = router