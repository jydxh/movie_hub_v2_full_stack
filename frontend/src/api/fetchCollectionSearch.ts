import { customFetch } from "./customFetch";
import { CollectionResultResponse } from "@/utils/types";
async function fetchCollectionSearch(
	query: string,
	page: string = "1"
): Promise<CollectionResultResponse> {
	const res = await customFetch.get<CollectionResultResponse>(
		`/search/collection?query=${query}&include_adult=false&language=en-US&page=${page}`
	);
	console.log(res.data);
	return res.data;
}
export default fetchCollectionSearch;
