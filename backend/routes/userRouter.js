const express = require("express");
const userAuthentication = require("../middleware/authMiddleware/userAuthentication");
const { loadUserInfo } = require("../controller/userController");
const router = express.Router();

router.get("/userInfo", userAuthentication, loadUserInfo);

module.exports = router;
