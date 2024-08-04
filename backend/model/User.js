const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: {
			required: [true, "name is required"],
			type: String,
			minlength: 3,
			maxlength: 50,
		},
		email: {
			required: [true, "email is required"],
			type: String,
			unique: true,
		},
		password: {
			required: [true, "password is required"],
			type: String,
		},
		verificationToke: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		passwordToken: String,
		passwordTokenExpirationDate: Date,
	},
	{ timeStamp: true }
);

module.exports = model("User", UserSchema);
