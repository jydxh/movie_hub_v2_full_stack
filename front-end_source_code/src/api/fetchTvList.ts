import { customFetch } from "./customFetch";
import { TVResponse } from "@/utils/types";
import getDateOneMonthAgo from "@/utils/getDateOneMonthAgo";
import getTodayDate from "@/utils/getTodayDate";
import getDateOneMonthLater from "@/utils/getDateOneMonthLater";

async function fetchTvList(
	mode: "popular" | "arriving" | "on_Tv" | "top_rated",
	page: string = "1",
	searchParams?: string
): Promise<TVResponse> {
	let url: string;
	const oneMonthAgo = getDateOneMonthAgo();
	const today = getTodayDate();
	const oneMonthLater = getDateOneMonthLater();
	if (mode === "popular") {
		url = `/discover/tv?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "arriving") {
		url = `/discover/tv?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&air_date.lte=${oneMonthLater}&air_date.gte=${today}${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "on_Tv") {
		url = `/discover/tv?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&air_date.lte=${today}&air_date.gte=${oneMonthAgo}${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "top_rated") {
		url = `/discover/tv?include_adult=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_count.gte=200${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else {
		url = `/discover/tv?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`;
	}
	const res = await customFetch<TVResponse>(url);
	//console.log(res.data);
	return res.data;
}
export default fetchTvList;
