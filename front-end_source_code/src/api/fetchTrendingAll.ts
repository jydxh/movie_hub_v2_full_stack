import { TrendingAllResponse } from "@/utils/types";
import { customFetch } from "./customFetch";

export default async function fetchTrendingAll(param: string) {
	try {
		const res = await customFetch<TrendingAllResponse>(
			`/trending/all/${param}?language=en-US`
		);
		// console.log(res);
		// console.log(res.data.results);
		return res.data.results;
	} catch (error) {
		throw Error("failed to fetch trendingAll");
	}
}
