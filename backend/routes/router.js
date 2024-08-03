const express = require("express");
const fetchTrendingAll = require("../api/fetchTrendingAll");
const fetchHomePopular = require("../api/fetchHomePopular");

const router = express.Router();

// trending all api
router.get("/trending/all/:opt", async (req, res) => {
	const { opt } = req.params;
	console.log(opt);
	const results = await fetchTrendingAll(opt);
	return res.status(200).json({ results });
});

// home movie
router.get("/movie/popular", async (req, res) => {
	const { page } = req.query;
	console.log(page);
	const results = await fetchHomePopular(page);
	return res.status(200).json({ results });
});

module.exports = router;
