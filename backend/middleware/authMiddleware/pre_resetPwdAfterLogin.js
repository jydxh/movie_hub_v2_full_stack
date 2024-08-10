const validator = require("validator");
const joi = require("joi");
const xss = require("xss");

const schema = joi.object({
	oldPassword: joi.string().trim().min(6).max(20).required(),
	newPassword: joi.string().trim().min(6).max(20).required(),
	repeat_password: joi.ref("newPassword"),
});

const pre_resetPwdAfterLogin = async (req, res, next) => {
	const { newPassword, repeat_password, oldPassword } = req.body;

	try {
		const value = await schema.validateAsync({
			oldPassword,
			newPassword,
			repeat_password,
		});
		// sanitizInput
		req.body.oldPassword = xss(validator.escape(value.oldPassword));
		req.body.newPassword = xss(validator.escape(value.newPassword));
		if (req.body.oldPassword === req.body.newPassword) {
			return res
				.status(400)
				.json({ msg: "old password and new password cannot be same!" });
		}
		return next();
	} catch (error) {
		console.log(error);
		return next(error);
	}
};

module.exports = pre_resetPwdAfterLogin;
