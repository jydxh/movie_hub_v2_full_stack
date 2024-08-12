import { customFetch } from "@/api/customFetch";
import {
	MovieDetailResponse,
	MovieDetailWithTrailerResponse,
} from "@/utils/types";
import lodash from "lodash";
async function fetchMovieDetails({ id = "271110" }: { id?: string }) {
	const { data } = await customFetch<MovieDetailResponse>(
		`/movie/${id}?append_to_response=credits%2Creviews%2Crecommendations&language=en-US`
	);
	const trailer = await customFetch<{ results: string[] }>(
		`/movie/trailer/${id}`
	);
	const results = lodash.cloneDeep(data) as MovieDetailWithTrailerResponse;
	results.trailers = trailer.data.results;
	//console.log(results);
	return results;
}
export default fetchMovieDetails;
