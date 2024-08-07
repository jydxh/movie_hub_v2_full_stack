const User = require("../model/User");
const Token = require("../model/Token");

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

module.exports = { loadUserInfo, updateUserInfo };
