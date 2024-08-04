//const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = async ({ html, to, subject }) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		from: "wzxxds@gmail.com",
		to,
		subject,
		html,
	};
	try {
		return await sgMail.send(msg);
	} catch (err) {
		console.log(err);
	}
};
module.exports = sendEmail;
