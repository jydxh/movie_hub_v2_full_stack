const express = require("express");
const fetchTrendingAll = require("../api/fetchTrendingAll");
const fetchHomePopular = require("../api/fetchHomePopular");
const fetchHomeTV = require("../api/fetchHomeTv");
const fetchMovieList = require("../api/fetchMovieList");

const router = express.Router();

// trending all api
router.get("/trending/all/:opt", async (req, res) => {
	const { opt } = req.params;
	//console.log(opt);
	const results = await fetchTrendingAll(opt);
	return res.status(200).json({ results });
});

// home popular
router.get("/movie/popular", async (req, res) => {
	const { page } = req.query;
	//console.log(page);
	const results = await fetchHomePopular(page);
	return res.status(200).json({ results });
});

// home trending Tv
router.get("/trending/tv/:opt", async (req, res) => {
	const { opt } = req.params;
	//console.log(opt);
	const results = await fetchHomeTV(opt);
	return res.status(200).json({ results });
});

// movie page -> fetch movielist
router.get("/discover/movie", async (req, res) => {
	//console.log(req.query);
	const searchParamsString = new URLSearchParams(req.query).toString();
	const results = await fetchMovieList(searchParamsString);
	return res.status(200).json({ results });
});

module.exports = router;
