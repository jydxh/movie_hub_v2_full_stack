const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const createJWT = async payload => {
	return await jwtSign(payload, process.env.JWT_SECRET, {
		expiresIn: payload.expiresIn,
	});
};

const decodeJwt = async token => {
	return await jwtVerify(token, process.env.JWT_SECRET);
};

const attatchCookiesToRes = async ({
	res,
	name,
	id,
	expiresIn,
	refreshToken,
}) => {
	const accessToken = await createJWT({ name, id, expiresIn: 60 * 15 });

	const refreshTokenJwt = await createJWT({
		name,
		id,
		refreshToken,
		expiresIn: Math.floor(
			(new Date(expiresIn).getTime() - Date.now() - 5 * 60 * 1000) / 1000
		),
	});

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		signed: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 1000 * 60 * 15,
	});

	res.cookie("refreshToken", refreshTokenJwt, {
		httpOnly: true,
		signed: true,
		secure: process.env.NODE_ENV === "production",
		expires: new Date(expiresIn - 1000 * 60 * 5),
	});
};

module.exports = { attatchCookiesToRes, createJWT, decodeJwt };
