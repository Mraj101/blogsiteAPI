const express = require('express')
const router=express.Router();
const { verifyJWT }= require('../../middlewares/user.auth.middleware.js')
const {
    createUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}=require('../../controllers/user/userController.js')

router.post("/crt", createUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/refresh-AccessToken",refreshAccessToken)

module.exports = router