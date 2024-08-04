const User = require("../model/User");
const register = async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.create({ name, email, password });
	res.send(user);
};

module.exports = { register };
