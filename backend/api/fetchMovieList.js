const customFetch = require("./customFetch");

async function fetchMovieList(serachParams) {
	const res = await customFetch(`/discover/movie?${serachParams}`);
	return res.data.results;
}

module.exports = fetchMovieList;
