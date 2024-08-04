const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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
		verificationToken: String,
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

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return; // this line of code is important! it check only if password field changed, next line will run, otherwise just return void
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePwd = async function (inputPwd) {
	return await bcrypt.compare(inputPwd, this.password);
};

module.exports = model("User", UserSchema);
