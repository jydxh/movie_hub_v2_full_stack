const express = require("express");
const fetchTrendingAll = require("../api/fetchTrendingAll");
const fetchHomePopular = require("../api/fetchHomePopular");
const fetchHomeTV = require("../api/fetchHomeTv");
const fetchMovieList = require("../api/fetchMovieList");
const fetchGenres = require("../api/fetchGenres");
const fetchMovieDetail = require("../api/fetchMovieDetail");
const fetchMovieCustom = require("../api/fetchMovieCustom");
const fetchTvList = require("../api/fetchTvList");
const fetchTvMulti = require("../api/fetchTvMulti");
const fetchPopularPeople = require("../api/fetchPopularPeople");

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

// movie or tv page -> fetch Genere
router.get("/genre/:mode/list", async (req, res) => {
	const { mode } = req.params;
	const genres = await fetchGenres(mode);
	return res.status(200).json({ genres });
});

//movie page -> fetch Movie detail
router.get("/movie/:id", async (req, res) => {
	const { id } = req.params;
	//console.log(id);
	const results = await fetchMovieDetail(id);
	//console.log(results);
	return res.status(200).json(results);
});

// movie-detail  -> fetchMovie Custom (review,images,credit)
router.get("/movie/:id/:mode", async (req, res) => {
	const { id, mode } = req.params;
	//console.log(id, mode);
	const results = await fetchMovieCustom({ id, mode });
	return res.status(200).json(results);
});

// tv_show
router.get("/discover/tv", async (req, res) => {
	const queryString = new URLSearchParams(req.query).toString();
	//console.log(queryString);
	const results = await fetchTvList(queryString);
	return res.status(200).json(results);
});

// tv_show-> tv_detail-> fetchTvMulti
router.get("/tv/:id", async (req, res) => {
	const { id } = req.params;
	const results = await fetchTvMulti({ id, mode: "multi" });
	return res.status(200).json(results);
});

// tv_show -> fetch iamges
router.get("/tv/:id/images", async (req, res) => {
	const { id } = req.params;
	const results = await fetchTvMulti({ id, mode: "image" });
	return res.status(200).json(results);
});

// people ->
router.get("/person/popular", async (req, res) => {
	const searchParams = new URLSearchParams(req.query).toString();
	console.log(searchParams);
	const results = await fetchPopularPeople(searchParams);
	return res.status(200).json(results);
});
module.exports = router;
