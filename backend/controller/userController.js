const User = require("../model/User");
const Token = require("../model/Token");
const { v2: cloudinary } = require("cloudinary");
const nodePath = require("path");
const fs = require("fs");

const loadUserInfo = async (req, res) => {
	const { userId } = req.user;
	const user = await User.findOne({ _id: userId });
	if (!user) {
		return res.status(404).json({ msg: "cannot find the user" });
	}
	const { name, email, city, country, avatar } = user;
	res.status(200).json({ userInfo: { name, email, city, country, avatar } });
};

const updateUserInfo = async (req, res) => {
	const { name, city, country } = req.body;
	const { userId } = req.user;
	const user = await User.findOne({ _id: userId });
	if (!user) {
		return res.status(404).json({ msg: "cannot find the user" });
	}
	user.name = name;
	user.city = city;
	user.country = country;
	const updatedUser = await user.save();

	const token = await Token.findOne({
		user: userId,
		userAgent: req.headers["user-agent"],
	});
	if (!token) {
		return res.status(404).json({ msg: "cannot find the user token" });
	}

	res.status(200).json({
		userInfo: {
			name: updatedUser.name,
			email: updatedUser.email,
			city: updatedUser.city,
			country: updatedUser.country,
			exp: token.expiresIn,
		},
	});
};

const uploadUserAvatar = async (req, res) => {
	console.log(req.user);

	/* multer way */
	const { path, filename } = req.file;

	const result = await cloudinary.uploader
		.upload(path, {
			public_id: filename,
			unique_filename: false,
			overwrite: true,
			folder: "movie_hub_v2_user",
		})
		.catch(err => console.log(err));
	const tempPath = nodePath.join(__dirname, "../", path);

	console.log(result);
	fs.unlinkSync(tempPath);

	//link src to the user
	const user = await User.findOne({ _id: req.user.userId });
	user.avatar = result.secure_url;
	await user.save();
	return res
		.status(201)
		.json({ msg: "uploaded", image: { src: result.secure_url } });
};

const deleteUser = async (req, res) => {
	const { userId } = req.user;
	await User.findOneAndDelete({ _id: userId });
	await Token.deleteMany({ user: userId });
	return res.status(200).json({ msg: "delete user success!" });
};

module.exports = { loadUserInfo, updateUserInfo, uploadUserAvatar, deleteUser };
