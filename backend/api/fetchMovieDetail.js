const customFetch = require("./customFetch");

const fetchMovieDetail = async id => {
	const res = await customFetch(
		`/movie/${id}?append_to_response=credits%2Creviews%2Crecommendations&language=en-US`
	);
	return res.data;
};

module.exports = fetchMovieDetail;
