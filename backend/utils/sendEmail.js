const nodemailer = require("nodemailer");
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

const sendDummyEamil = async ({ html, to, subject }) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: "brad.bosco@ethereal.email",
			pass: "qPsQPErcnAfnqGtBjR",
		},
	});
	const msg = {
		from: "wzxxds@gmail.com",
		to,
		subject,
		html,
	};
	await transporter.sendMail(msg);
};
module.exports = { sendEmail, sendDummyEamil };
