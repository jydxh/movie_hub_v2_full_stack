const register = async (req, res) => {
	console.log(req.body);
	res.send("register");
};

module.exports = { register };
