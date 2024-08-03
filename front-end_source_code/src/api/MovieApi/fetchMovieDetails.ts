import { customFetch } from "@/api/customFetch";
import { MovieDetailResponse } from "@/utils/types";
async function fetchMovieDetails({ id = "271110" }: { id?: string }) {
	const res = await customFetch<MovieDetailResponse>(
		`/movie/${id}?append_to_response=credits%2Creviews%2Crecommendations&language=en-US`
	);
	return res.data;
}
export default fetchMovieDetails;
