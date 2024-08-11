const customFetch = require("./customFetch");

async function fetchMovieCustom({ id = "271110", mode }) {
	const res = await customFetch(
		`/movie/${id}/${mode}?include_image_language=en`
	);
	return res.data;
}

module.exports = fetchMovieCustom;
