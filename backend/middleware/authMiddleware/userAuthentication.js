const Token = require("../../model/Token");
const { decodeJwt, attatchCookiesToRes } = require("../../utils/jwt");

const userAuthentication = async (req, res, next) => {
	//console.log(req.headers.cookie);
	/* https://www.npmjs.com/package/cookie-parser  */
	/*  if a secret was provided, as the property req.signedCookies */
	const { accessToken, refreshToken: refreshTokenJWT } = req.signedCookies;
	if (accessToken) {
		const decodedJWT = await decodeJwt(accessToken);
		//console.log(decodedJWT);
		if (decodedJWT) {
			req.user = {
				username: decodedJWT.name,
				userId: decodedJWT.id,
			};
			return next();
		}
	} else {
		if (refreshTokenJWT) {
			const decodedRefreshToken = await decodeJwt(refreshTokenJWT);
			//console.log(decodedRefreshToken);
			const { name, id, refreshToken } = decodedRefreshToken;
			const token = await Token.findOne({
				refreshToken,
				userAgent: req.headers["user-agent"],
				user: id,
			});
			//console.log(token);
			if (!token || !token.isValid) {
				return res.status(401).json({ msg: "invalid token" });
			}
			req.user = {
				username: decodedRefreshToken.name,
				userId: decodedRefreshToken.id,
			};
			await attatchCookiesToRes({
				res,
				id,
				name,
				refreshToken,
				expiresIn: token.expiresIn,
			});
			next();
		}
	}
};

module.exports = userAuthentication;
