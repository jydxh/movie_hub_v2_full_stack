const customFetch = require("./customFetch");

const fetchSingleMovieTrailer = async ({ id }) => {
	try {
		const res = await customFetch(`/movie/${id}/videos`);

		let videos = res.data.results.filter(
			video => video.type === "Trailer" || video.type === "Featurette"
		);
		videos = videos.map(video => video.key);

		return videos;
	} catch (err) {
		console.log(err);
	}
};

module.exports = fetchSingleMovieTrailer;
