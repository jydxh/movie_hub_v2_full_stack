const customFetch = require("./customFetch");

async function fetchMovieCustom({ id = "271110", mode }) {
	const res = await customFetch(`/movie/${id}/${mode}`);
	return res.data;
}

module.exports = fetchMovieCustom;
