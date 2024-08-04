const validator = require("validator");
const joi = require("joi");
const xss = require("xss");

const schema = joi.object({
	name: joi.string().trim().min(5).max(30).required(),
	email: joi.string().trim().email().required(),
	password: joi
		.string()
		.trim()
		.pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
		.required(),
	repeat_password: joi.ref("password"), // use ref meaning repeat_password must eqaul to password
});

const pre_register = async (req, res, next) => {
	const { name, email, password, repeat_password } = req.body;
	try {
		const value = await schema.validateAsync({
			name,
			email,
			password,
			repeat_password,
		});
		// sanitizInput
		req.body.name = xss(validator.escape(value.name));
		req.body.email = validator.normalizeEmail(value.email);
		req.body.password = xss(validator.escape(value.password));
		return next();
	} catch (error) {
		console.log(error);
		const errmsg = error.details[0].message;
		if (errmsg.includes("name")) {
			return res.status(400).json({ msg: "name should be 5 to 30 characters" });
		}
		if (errmsg.includes("repeat_password")) {
			return res
				.status(400)
				.json({ msg: "re-entered password does not match first password!" });
		}
		if (errmsg.includes("password")) {
			return res.status(400).json({
				msg: "password must between 6 to 20 characters without non-alphanumeric character",
			});
		}

		if (errmsg.includes("email")) {
			return res
				.status(400)
				.json({ msg: "please provide valid email address" });
		}
	}
};
module.exports = pre_register;
