import { customFetch } from "./customFetch";
import { SearchKeywordResponse } from "@/utils/types";
async function searchKeywordQuery({ query }: { query: string | undefined }) {
	try {
		const res = await customFetch<SearchKeywordResponse>(
			`/search/keyword?query=${query}&page=1`
		);
		//	console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
export default searchKeywordQuery;

//"https://www.themoviedb.org/search/trending?language=en-CA&query=hello"  this url cannot get the res back since the cors issue
// so use the keyword api to mimic the searchKeyword feedback funtion https://developer.themoviedb.org/reference/search-keyword
