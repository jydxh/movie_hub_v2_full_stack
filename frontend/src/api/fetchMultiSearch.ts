import { customFetch } from "./customFetch";
import { MultiSearchResponse, CollectionResultResponse } from "@/utils/types";
async function fetchMultiSearch(
	query: string,
	page: string = "1",
	mode: string = "multi"
): Promise<MultiSearchResponse | CollectionResultResponse> {
	const res = await customFetch.get<
		MultiSearchResponse | CollectionResultResponse
	>(
		`/search/${mode}?query=${query}&include_adult=false&language=en-US&page=${page}`
	);
	//console.log(res.data);
	return res.data;
}
export default fetchMultiSearch;
