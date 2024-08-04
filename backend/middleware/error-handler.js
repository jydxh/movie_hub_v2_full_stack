const errorHanlderModdleware = (err, req, res, next) => {
	console.log("error: ", err);
	let customError = {
		statusCode: err.statudCode || 500,
		msg: err.message || "Internal Server Error",
	};

	if (err.code && err.code == 11000) {
		customError.status = 400;
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
	}
	if (err.name === "ValidationError") {
		customError.msg = Object.values(err.errors)
			.map(item => item.message)
			.join(",");
		customError.statusCode = 400;
	}
	if (err.name === "CastError") {
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = 404;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHanlderModdleware;
