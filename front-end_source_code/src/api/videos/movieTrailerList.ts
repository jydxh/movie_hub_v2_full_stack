import { customFetch } from "@/api/customFetch";
import { HomeLatestTrailerRes } from "@/utils/types";

const movieTrailerList = async ({ page }: { page: number }) => {
	const res = await customFetch<HomeLatestTrailerRes>(
		`/movie/trailerList?page=${page}`
	);

	return res.data.results;
};

module.exports = movieTrailerList;
