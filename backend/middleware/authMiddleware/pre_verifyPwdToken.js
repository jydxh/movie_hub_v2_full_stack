const validator = require("validator");
const joi = require("joi");
const xss = require("xss");

const schema = joi.object({
	password: joi
		.string()
		.trim()
		.pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
		.required(),
	re_password: joi.ref("password"),
	email: joi.string().trim().email().required().max(30),
	tokenJwt: joi.string().trim().required(),
});

const pre_verifyPwdToken = async (req, res, next) => {
	const { token: tokenJwt, email, password, re_password } = req.body;
	console.log(req.body);
	try {
		const value = await schema.validateAsync({
			tokenJwt,
			email,
			password,
			re_password,
		});

		req.body.tokenJwt = xss(validator.escape(value.tokenJwt));
		req.body.email = validator.normalizeEmail(value.email);
		req.body.password = xss(validator.escape(value.password));
		return next();
	} catch (err) {
		console.log(err);
		const errmsg = err.details[0].message;
		if (errmsg.includes("re_password")) {
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
		return next(err);
	}
};

module.exports = pre_verifyPwdToken;
