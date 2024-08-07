const User = require("../model/User");

const loadUserInfo = async (req, res) => {
	const { userId } = req.user;
	const user = await User.findOne({ _id: userId });
	const { name, email, city, country, avatar } = user;
	res.json({ userInfo: { name, email, city, country, avatar } });
};

module.exports = { loadUserInfo };
