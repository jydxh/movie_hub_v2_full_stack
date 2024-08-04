const joi = require("joi");
const validator = require("validator");
const xss = require("xss");

const schema = joi.object({
	email: joi.string().trim().email().required(),
	password: joi
		.string()
		.trim()
		.pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
		.required(),
});
const pre_login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const value = await schema.validateAsync({ email, password });
		req.body.email = validator.normalizeEmail(value.email);
		req.body.password = xss(validator.escape(value.password));
		return next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ msg: "failed to login" });
	}
};

module.exports = pre_login;
