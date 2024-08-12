import SearchInput from "@/components/Search/SearchInput";
import SearchTags from "@/components/Search/SearchTags";
import { LoaderFunction, Outlet } from "react-router";
import fetchMultiSearch from "@/api/fetchMultiSearch";
import { MultiSearchResponse, CollectionResultResponse } from "@/utils/types";

export const loader: LoaderFunction = async ({
	request,
}): Promise<MultiSearchResponse | null | CollectionResultResponse> => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	let page = url.searchParams.get("page");

	try {
		if (page === null) {
			page = "1";
		}
		if (query === null) {
			return null;
		}
		const data = await fetchMultiSearch(query, page);
		//	console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

function Search() {
	return (
		<main>
			<SearchInput />
			<div className="grid grid-col-1 md:flex items-start gap-x-8 p-4">
				<div>
					<SearchTags />
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</main>
	);
}
export default Search;
