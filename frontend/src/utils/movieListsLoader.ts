import { LoaderFunction } from "react-router";
import { MovieResultResponse } from "@/utils/types";
import fetchMovieList from "@/api/fetchMovieList";

function movieListsLoader(
	mode: "now_playing" | "popular" | "top_rated" | "upcoming"
): LoaderFunction {
	return async ({ request }): Promise<MovieResultResponse | null> => {
		const url = new URL(request.url);

		const searchParams = url.searchParams.get("with_genres");
		const page = url.searchParams.get("page") || "1";
		//console.log(searchParams);

		try {
			if (searchParams) {
				const res = await fetchMovieList(mode, page, searchParams);
				return res;
			} else {
				const res = await fetchMovieList(mode, page);
				return res;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}
export default movieListsLoader;
