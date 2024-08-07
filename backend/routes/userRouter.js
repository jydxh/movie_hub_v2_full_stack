const express = require("express");
const userAuthentication = require("../middleware/authMiddleware/userAuthentication");
const pre_updateUserInfo = require("../middleware/userMiddleware/pre_updateUserInfo");
const {
	loadUserInfo,
	updateUserInfo,
} = require("../controller/userController");
const router = express.Router();

router
	.route("/userInfo")
	.get(userAuthentication, loadUserInfo)
	.post(userAuthentication, pre_updateUserInfo, updateUserInfo);

module.exports = router;
