import { customFetch } from "@/api/customFetch";
import { MovieDetailResponse } from "@/utils/types";
async function fetchMovieDetails({ id = "271110" }: { id?: string }) {
	const { data } = await customFetch<MovieDetailResponse>(
		`/movie/${id}?append_to_response=credits%2Creviews%2Crecommendations&language=en-US`
	);
	console.log(data);
	return data;
}
export default fetchMovieDetails;
