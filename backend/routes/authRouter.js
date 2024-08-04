const express = require("express");
const { register, verifyEmail } = require("../controller/authController");
const pre_register = require("../middleware/authMiddleware/pre_register");
const pre_verifyEmail = require("../middleware/authMiddleware/pre_verifyEmail");

const router = express.Router();

router.post("/register", pre_register, register);
router.post("/verify-email", pre_verifyEmail, verifyEmail);

module.exports = router;
