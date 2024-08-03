import { customFetch } from "@/api/customFetch";
import { MovieCredits, MediaImages } from "@/utils/types";

async function fetchMovieCustom({
	id = "271110",
	mode,
}: {
	id?: string;
	mode: "credits" | "images";
}) {
	const res = await customFetch<MovieCredits | MediaImages>(
		`/movie/${id}/${mode}`
	);

	return res.data;
}
export default fetchMovieCustom;
