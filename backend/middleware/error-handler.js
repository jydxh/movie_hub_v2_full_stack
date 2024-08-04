const errorHanlderModdleware = (err, req, res, next) => {
	console.log("error: ", err);
	const statusCode = err.status || 500;
	const msg = err.msg || "Internal Server Error";
	return res.status(statusCode).json({ msg });
};

module.exports = errorHanlderModdleware;
