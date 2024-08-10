const User = require("../model/User");
const Token = require("../model/Token");
const crypto = require("crypto");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtSign = promisify(jwt.sign);
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
	if (user.verificationToken !== token) {
		return res
			.status(401)
			.json({ msg: "failed to verify eamil, please try again!" });
	}
	user.isVerified = true;
	user.verificationToken = "";
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
			.json({ msg: "incorrect email or password, please try again!" });
	}
	if (!(await user.comparePwd(password))) {
		return res
			.status(401)
			.json({ msg: "incorrect email or password, please try again!" });
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
		user: user._id,
		expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30, //30days
		// expiresIn: Date.now() + 1000 * 7, // 7s for testing front-end auto logout
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
	res
		.status(200)
		.json({ username: user.name, id: user._id, exp: token.expiresIn });
};

const logout = async (req, res) => {
	const { userId } = req.user;
	await Token.findOneAndDelete({
		user: userId,
		userAgent: req.headers["user-agent"],
	});
	res.cookie("accessToken", "token", {
		httpOnly: true,
		signed: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 5,
	});
	res.cookie("refreshToken", "token", {
		httpOnly: true,
		signed: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 5,
	});
	res.status(200).json({ msg: "user logged out!" });
};

/* for reset pwd logic: set a passwordToken and pwdTokenExpired time and save to user DB,
 and send email to the user email, include a url link (with the token and email address) */
const resetPwd = async (req, res) => {
	const { email } = req.body;

	if (!email || !validator.isEmail(email)) {
		return res.status(400).json({ msg: "please provide a valid email" });
	}

	const user = await User.findOne({ email });

	if (!user) {
		res
			.status(200)
			.json({ msg: "please check your email, to reset the password" });
	}
	//console.log(user.passwordTokenExpirationDate > Date.now());
	//console.log(user.passwordTokenExpirationDate.getTime(), Date.now());
	if (
		user.passwordTokenExpirationDate &&
		user.passwordTokenExpirationDate.getTime() > Date.now()
	) {
		// if the token still not expired, just return, let user know check email,intead of asking a new one,
		return res.status(400).json({
			msg: `Please check your email to reset password! Please try again ${new Date(
				user.passwordTokenExpirationDate.getTime() - Date.now()
			).getMinutes()} minutes later`,
		});
	}
	// if the token expired, just re-send a new email, and store the token and expiredDate in DB

	req.body.eamil = validator.normalizeEmail(email);
	const passwordToken = (await cryptpRandomByte(32)).toString("hex");
	const passwordTokenExpirationDate = new Date(
		Date.now() + 15 * 1000 * 60
	).getTime();

	user.passwordToken = passwordToken;
	user.passwordTokenExpirationDate = passwordTokenExpirationDate;
	await user.save();
	/*send email to reset pwd  */
	//console.log(user.passwordToken);
	const tokenJwt = await jwtSign(
		{
			token: user.passwordToken,
			userId: user._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: 15 * 60, // 15 mins expiration
		}
	);

	const urlLink = `${origin}/userAuth/reset-pwd?token=${tokenJwt}&email=${user.email}`;
	const message = `<p>To reset your password, click on the following link : 
  <a href="${urlLink}">Rest Password</a> </p>`;
	const emailConfi = {
		to: user.email,
		subject: "Password Reset",
		html: `<h2>Hello ${user.name}</h2> ${message}`,
	};
	//console.log(emailConfi);
	//await sendEmail(emailConfi);
	await sendDummyEamil(emailConfi);
	res
		.status(200)
		.json({ msg: "please check your email, to reset the password" });
};

const VerifyPwdToken = async (req, res) => {
	const { tokenJwt, email, password } = req.body;
	const { token, userId } = await decodeJwt(tokenJwt);
	const user = await User.findOne({ passwordToken: token, _id: userId, email });
	if (!user) {
		return res.status(404).json({ msg: "error, invalid token" });
	}
	/* attention since the bcrypt.compare is an aysnc function, we need to add await ahead to wait for the promise resolve, other wise this block will always trigger */
	if (await user.comparePwd(password)) {
		return res.status(400).json({ msg: "error, cannot use the same password" });
	}
	user.password = password;
	user.passwordTokenExpirationDate = null;
	user.passwordToken = null;
	await user.save();
	return res.status(200).json({ msg: "success update password" });
};

const resetPwdAfterLogin = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const { userId } = req.user;
	const user = await User.findOne({ _id: userId });
	if (!(await user.comparePwd(oldPassword))) {
		/* if the old password is not match */
		return res
			.status(401)
			.json({ msg: "Incorrect old-password, please try again" });
	}
	user.password = newPassword;
	await user.save();
	res.status(200).json({ msg: "Success changed password!" });
};

module.exports = {
	register,
	verifyEmail,
	login,
	logout,
	resetPwd,
	VerifyPwdToken,
	resetPwdAfterLogin,
};
