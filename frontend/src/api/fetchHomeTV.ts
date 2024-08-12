import { customFetch } from "./customFetch";
import { TVResponse } from "@/utils/types";

async function fetchHomeTV(param: string) {
	const res = await customFetch<TVResponse>(
		`/trending/tv/${param}?language=en-US`
	);
	return res.data.results;
}
export default fetchHomeTV;
