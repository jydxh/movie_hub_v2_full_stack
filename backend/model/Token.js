const { Schema, Types, model } = require("mongoose");

const TokenSchema = new Schema(
	{
		refreshToken: { type: String, required: true },
		ip: { type: String, required: true },
		userAgent: { type: String, required: true },
		isValid: { type: Boolean, default: true },
		user: { type: Types.ObjectId, ref: "User" },
		expiresIn: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Token", TokenSchema);
