const xss = require("xss");
const validator = require("validator");

const pre_verifyEmail = async (req, res, next) => {
	const { email, token } = req.body;
	if (!email || !token) {
		return res.status(400).json({ msg: "please provide email or token" });
	}
	req.body.eamil = validator.normalizeEmail(email);
	req.body.token = xss(validator.escape(token));
	next();
};

module.exports = pre_verifyEmail;
