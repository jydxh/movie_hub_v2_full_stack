import { customFetch } from "./customFetch";
import { MovieData } from "@/utils/types";

export default async function fetchHomePopular(params: string) {
	const res = await customFetch<MovieData>(
		`/movie/popular?language=en-US&page=${params}`
	);
	return res.data.results;
}
