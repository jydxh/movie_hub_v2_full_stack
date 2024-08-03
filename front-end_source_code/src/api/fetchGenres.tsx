import { customFetch } from "./customFetch";
import { Genre } from "@/utils/types";
const fetchGenres = async ({ mode }: { mode: "tv" | "movie" }) => {
	const res = await customFetch<{ genres: Genre[] }>(
		`/genre/${mode}/list?language=en`
	);
	//console.log(res.data.genres);
	return res.data.genres;
};

export default fetchGenres;
