const validator = require("validator");
const joi = require("joi");
const xss = require("xss");

const schema = joi.object({
	name: joi.string().trim().min(5).max(30).required(),
	city: joi.string().trim().max(50),
	country: joi.string().trim().max(50),
});

const pre_updateUserInfo = async (req, res, next) => {
	const { name, city, country } = req.body;
	try {
		const value = await schema.validateAsync({ name, city, country });
		for (const item in value) {
			req.body[item] = xss(validator.escape(value[item]));
		}
		return next();
	} catch (err) {
		console.log(err);
		const errmsg = err.details[0].message;
		if (errmsg.includes("name")) {
			return res.status(400).json({ msg: "name should be 5 to 30 characters" });
		}
		if (errmsg.includes("city")) {
			return res
				.status(400)
				.json({ msg: "city should be less than 50 characters" });
		}
		if (errmsg.includes("country")) {
			return res
				.status(400)
				.json({ msg: "country should be less than 50 characters" });
		}
		return next(err);
	}
};

module.exports = pre_updateUserInfo;
