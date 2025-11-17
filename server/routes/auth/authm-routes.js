const express = require("express");
const { registerUser, verifyOtp } = require("../../controllers/auth/authm-controller");


const router = express.Router();

router.post("/send-otp", registerUser);
router.post("/verify-otp", verifyOtp);

module.exports = router;
