const express = require("express");
const userAuthentication = require("../middleware/authMiddleware/userAuthentication");
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
const fetchPeopleMulti = require("../api/fetchPeopleMulti");
const fetchMultiSearch = require("../api/fetchMultiSearch");
const filteredMovieListWithTrailer = require("../api/filteredMovieListWithTrailer");
const fetchSingleMovieTrailer = require("../api/fetchSingleMovieTrailer");
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

// home->movie_trailer list
router.get("/movie/trailer", async (req, res) => {
	const results = await filteredMovieListWithTrailer({ trim: true, page: "1" });

	res.status(200).json({ results });
});

// movie_detail -> the movies's trailers
router.get("/movie/trailer/:id", async (req, res) => {
	const { id } = req.params;
	const results = await fetchSingleMovieTrailer({ id });
	res.send({ results });
});

//movie trailerList, this route is protected, need to login
router.get("/movie/trailerList", userAuthentication, async (req, res) => {
	const page = req.query.page || "1";
	const results = await filteredMovieListWithTrailer({ trim: false, page });
	res.status(200).json({ results });
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
	//console.log(searchParamsString);
	const results = await fetchMovieList(searchParamsString);
	//console.log(results);
	//return res.status(200).json({ results });
	return res.status(200).json(results);
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

// people -> people list
router.get("/person/popular", async (req, res) => {
	const searchParams = new URLSearchParams(req.query).toString();
	//console.log(searchParams);
	const results = await fetchPopularPeople(searchParams);
	return res.status(200).json(results);
});

// people -> people multi

router.get("/person/:id", async (req, res) => {
	const { id } = req.params;
	const results = await fetchPeopleMulti(id);
	return res.status(200).json(results);
});

// home -> serach
router.get("/search/:mode", async (req, res) => {
	const { mode } = req.params;
	const { page, query } = req.query;
	const results = await fetchMultiSearch({ query, page, mode });
	return res.status(200).json(results);
});

module.exports = router;
