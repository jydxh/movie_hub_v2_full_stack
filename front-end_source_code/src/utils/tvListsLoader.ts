import { LoaderFunction } from "react-router";
import { TVResponse } from "@/utils/types";
import fetchTvList from "@/api/fetchTvList";

function tvListsLoader(
	mode: "arriving" | "popular" | "top_rated" | "on_Tv"
): LoaderFunction {
	return async ({ request }): Promise<TVResponse | null> => {
		const url = new URL(request.url);
		const searchParams = url.searchParams.get("with_genres");
		console.log(searchParams);

		try {
			if (searchParams) {
				const res = await fetchTvList(mode, "1", searchParams);
				return res;
			} else {
				const res = await fetchTvList(mode);
				return res;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}
export default tvListsLoader;
