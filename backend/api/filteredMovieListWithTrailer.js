const customFetch = require("./customFetch");

const filteredMovieListWithTrailer = async () => {
	try {
		const res = await customFetch.get("/discover/movie");
		console.log(res.data.results);
		const results = res.data.results;
		const movieList = results.map((item, index) => {
			if (index > 9) return;
			const { poster_path, id, original_title } = item;
			return { poster_path, id, original_title, trailer: [] };
		});
		/* trim only first 10 */
		movieList.splice(10, movieList.length - 10);
		await Promise.all(
			movieList.map(async movie => {
				try {
					const res = await customFetch(`/movie/${movie.id}/videos`);
					const videos = res.data.results.filter(
						video => video.type === "Trailer"
					);
					movie.trailer = videos.map(video => video.key);
				} catch (err) {
					console.log(err);
				}
			})
		);
		console.log(movieList);
		return movieList;
	} catch (error) {
		console.log(error);
	}
};

module.exports = filteredMovieListWithTrailer;
