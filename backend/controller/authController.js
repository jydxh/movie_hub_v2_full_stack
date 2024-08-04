const User = require("../model/User");
const Token = require("../model/Token");
const crypto = require("crypto");

const { promisify } = require("util");
const cryptpRandomByte = promisify(crypto.randomBytes);
const { sendEmail, sendDummyEamil } = require("../utils/sendEmail");
const { attatchCookiesToRes, decodeJwt } = require("../utils/jwt");

const origin = "http://localhost:5173";

const register = async (req, res) => {
	/* business logic: get name email pwd and generate token and save them into db,
	send email to the email with a link to verify the email, the front-end hanlding submit
	 the URLsearchParmas back to the verifyToken route, and if match set isVerified to true,
	  and user can login, otherwise, whenever user need to login, it will notice user to verify email first */
	const { name, email, password } = req.body;

	//check for email unique
	const emailExists = await User.findOne({ email });
	if (emailExists) {
		return res.status(400).json({ msg: "Email already exists" });
	}
	const verificationToken = (await cryptpRandomByte(32)).toString("hex");

	const user = await User.create({ name, email, password, verificationToken });
	/* sending email to verify the email */
	const verifyEmail = `${origin}/userAuth/verify-email?token=${user.verificationToken}&email=${user.email}`;
	const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;
	const emailConfi = {
		to: user.email,
		subject: "Email Confirmation",
		html: `<h2>Hello ${user.name}</h2> ${message}`,
	};
	//console.log(emailConfi);
	//await sendEmail(emailConfi);
	await sendDummyEamil(emailConfi);
	res.status(201).json({ name: user.name, id: user._id, email: user.email });
};

const verifyEmail = async (req, res) => {
	const { email, token } = req.body;
	const user = await User.findOne({ email });
	if (user.verificationToke !== token) {
		return res
			.status(401)
			.json({ msg: "failed to verify eamil, please try again!" });
	}
	user.isVerified = true;
	user.verificationToke = "";
	user.verified = Date.now();
	await user.save();
	await new Promise(resolve => setTimeout(resolve, 2000)); // set 2s delay on purpse, so front-end can see the ui, deleted this line at production
	res.status(200).json({ msg: "success verify email, now you can log in" });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res
			.status(401)
			.json({ mgs: "incorrect email or password, please try again!" });
	}
	if (!(await user.comparePwd(password))) {
		return res
			.status(401)
			.json({ mgs: "incorrect email or password, please try again!" });
	}
	if (!user.isVerified) {
		return res.status(401).json({ msg: "please verify you email first" });
	}
	/* pass the verify, generete jwt and send back to user */
	const refreshToken = (await cryptpRandomByte(32)).toString("hex");
	const ip = req.ip;
	const userAgent = req.headers["user-agent"];
	const userToken = {
		refreshToken,
		ip,
		userAgent,
		expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30,
	};

	const token = await Token.create(userToken);

	const payload = {
		res,
		name: user.name,
		id: user._id,
		refreshToken: token.refreshToken,
		expiresIn: token.expiresIn,
	};
	await attatchCookiesToRes(payload);
	res.status(200).json({ msg: "login success! hello user:" + user.name });
};

module.exports = { register, verifyEmail, login };
