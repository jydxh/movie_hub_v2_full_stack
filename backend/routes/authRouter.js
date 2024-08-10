const express = require("express");
const {
	register,
	verifyEmail,
	login,
	logout,
	resetPwd,
	VerifyPwdToken,
	resetPwdAfterLogin,
} = require("../controller/authController");
const pre_register = require("../middleware/authMiddleware/pre_register");
const pre_verifyEmail = require("../middleware/authMiddleware/pre_verifyEmail");
const pre_login = require("../middleware/authMiddleware/pre_login");

const userAuthentication = require("../middleware/authMiddleware/userAuthentication");
const pre_verifyPwdToken = require("../middleware/authMiddleware/pre_verifyPwdToken");

const pre_resetPwdAfterLogin = require("../middleware/authMiddleware/pre_resetPwdAfterLogin");

const router = express.Router();

router.post("/register", pre_register, register);
router.post("/verify-email", pre_verifyEmail, verifyEmail);
router.post("/login", pre_login, login);
router.post("/logout", userAuthentication, logout);
router.post("/reset-pwd", resetPwd);
router.post("/verify-resetPwd", pre_verifyPwdToken, VerifyPwdToken);
router.post(
	"/resetPwd",
	userAuthentication,
	pre_resetPwdAfterLogin,
	resetPwdAfterLogin
);
module.exports = router;
