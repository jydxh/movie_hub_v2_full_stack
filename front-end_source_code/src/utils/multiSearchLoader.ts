import { LoaderFunction } from "react-router";
import { MultiSearchResponse, CollectionResultResponse } from "@/utils/types";
import fetchMultiSearch from "@/api/fetchMultiSearch";

function multiSearchLoader(
	mode: "multi" | "movie" | "tv" | "person" | "collection"
): LoaderFunction {
	return async ({
		request,
	}): Promise<MultiSearchResponse | null | CollectionResultResponse> => {
		const url = new URL(request.url);
		const serachQuery = url.searchParams.get("query")!;
		const page = url.searchParams.get("page");

		try {
			if (page) {
				const res = await fetchMultiSearch(serachQuery, page, mode);
				//console.log(res);
				return res;
			} else {
				const res = await fetchMultiSearch(serachQuery, "1", mode);
				//	console.log(res);
				return res;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}

export default multiSearchLoader;
