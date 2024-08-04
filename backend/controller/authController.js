const User = require("../model/User");
const crypto = require("crypto");
const { promisify } = require("util");
const cryptpRandomByte = promisify(crypto.randomBytes);

const origin = "http://localhost:5173/";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	//check for email unique
	const emailExists = await User.findOne({ email });
	if (emailExists) {
		return res.status(400).json({ msg: "Email already exists" });
	}
	const verificationToke = (await cryptpRandomByte(32)).toString("hex");

	const user = await User.create({ name, email, password, verificationToke });
	/* sending email to verify the email */

	res.status(201).json({ name: user.name, id: user._id, verificationToke });
};

module.exports = { register };
