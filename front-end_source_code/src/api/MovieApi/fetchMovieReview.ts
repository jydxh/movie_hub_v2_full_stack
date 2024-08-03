import { customFetch } from "@/api/customFetch";
import { Reviews } from "@/utils/types";

async function fetchMovieReview({
	id = "271110",
	page = 1,
}: {
	id?: string;
	page?: number;
}) {
	const res = await customFetch<Reviews>(
		`/movie/${id}/reviews?language=en-US&page=${page}`
	);
	return res.data;
}
export default fetchMovieReview;
