const express = require("express");
const multer = require("multer");
const path = require("path");

const userAuthentication = require("../middleware/authMiddleware/userAuthentication");
const pre_updateUserInfo = require("../middleware/userMiddleware/pre_updateUserInfo");
const {
	loadUserInfo,
	updateUserInfo,
	uploadUserAvatar,
	deleteUser,
} = require("../controller/userController");
const router = express.Router();
const upload = multer({
	dest: "temp/",
	limits: {
		fileSize: 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		// Accept only image files
		const allowedTypes = /jpeg|jpg|png/;
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = allowedTypes.test(file.mimetype);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(new Error("Invalid file type. Only JPEG, PNG images are allowed."));
		}
	},
});

router
	.route("/userInfo")
	.get(userAuthentication, loadUserInfo)
	.post(userAuthentication, pre_updateUserInfo, updateUserInfo);
router
	.route("/uploadAvatar")
	.post(upload.single("user_avatar"), userAuthentication, uploadUserAvatar);
router.delete("/", userAuthentication, deleteUser);

module.exports = router;
