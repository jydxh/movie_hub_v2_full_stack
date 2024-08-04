const User = require("../model/User");

const crypto = require("crypto");
const { promisify } = require("util");
const cryptpRandomByte = promisify(crypto.randomBytes);
const { sendEmail, sendDummyEamil } = require("../utils/sendEmail");

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
	const verificationToke = (await cryptpRandomByte(32)).toString("hex");

	const user = await User.create({ name, email, password, verificationToke });
	/* sending email to verify the email */
	const verifyEmail = `${origin}/userAuth/verify-email?token=${user.verificationToke}&email=${user.email}`;
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
	res.status(201).json({ name: user.name, id: user._id, verificationToke });
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
	await user.save();
	await new Promise(resolve => setTimeout(resolve, 2000)); // set 2s delay on purpse, so front-end can see the ui, deleted this line at production
	res.status(200).json({ msg: "success verify email, now you can log in" });
};

module.exports = { register, verifyEmail };
