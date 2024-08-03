import getDateOneMonthAgo from "@/utils/getDateOneMonthAgo";
import { customFetch } from "./customFetch";
import { MovieResultResponse } from "@/utils/types";
import getTodayDate from "@/utils/getTodayDate";
import getDateOneMonthLater from "@/utils/getDateOneMonthLater";

async function fetchMovieList(
	mode: "now_playing" | "popular" | "top_rated" | "upcoming",
	page: string = "1",
	searchParams?: string
): Promise<MovieResultResponse> {
	//console.log(searchParams);

	let url: string;
	const oneMonthAgo = getDateOneMonthAgo();
	const today = getTodayDate();
	const oneMonthLater = getDateOneMonthLater();
	if (mode === "popular") {
		//console.log("popular path");
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "now_playing") {
		//	console.log("now playing path");
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${oneMonthAgo}&release_date.lte=${today}${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "top_rated") {
		//console.log("top rated path");
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else if (mode === "upcoming") {
		//	console.log("upcoming path");
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${today}&release_date.lte=${oneMonthLater}&${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	} else {
		//console.log("default path");
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&${
			searchParams ? `&with_genres=${searchParams}` : ""
		}`;
	}
	const res = await customFetch<MovieResultResponse>(url);
	//console.log(res.data);
	return res.data;
}
export default fetchMovieList;
