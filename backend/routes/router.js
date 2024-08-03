const express = require("express");
const fetchTrendingAll = require("../api/fetchTrendingAll");

const router = express.Router();

router.get("/trending/all/:opt", async (req, res) => {
	const { opt } = req.params;
	console.log(opt);
	const results = await fetchTrendingAll(opt);
	return res.status(200).json({ results });
});

module.exports = router;
