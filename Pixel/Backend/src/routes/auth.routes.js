const express = require("express");
const controller = require("../controllers/auth.controller");


const router = express.Router();

router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", controller.logout);

module.exports = router;