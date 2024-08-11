const customFetch = require("./customFetch");

async function fetchMovieList(serachParams) {
	const res = await customFetch(`/discover/movie?${serachParams}`);
	//console.log(res.data);
	return res.data;
}

module.exports = fetchMovieList;
