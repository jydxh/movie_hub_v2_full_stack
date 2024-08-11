const customFetch = require("./customFetch");

/* trim: boolean, when it is true, trim to first 10, when false, */

const filteredMovieListWithTrailer = async ({ trim, page }) => {
	try {
		const res = await customFetch.get(
			`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
		);
		//console.log(res.data.results);
		const { page: currentPage, total_pages, total_results, results } = res.data;

		const movieList = results.map((item, index) => {
			if (trim && index > 9) return;
			const { poster_path, id, original_title } = item;
			return { poster_path, id, original_title, trailer: [] };
		});
		/* trim only first 10 */
		if (trim) {
			movieList.splice(10, movieList.length - 10);
		}

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
		return {
			results: movieList,
			page: currentPage,
			total_pages,
			total_results,
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = filteredMovieListWithTrailer;
