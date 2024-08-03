import { customFetch } from "@/api/customFetch";
import { TvMultiFetchResponse, MediaImages } from "@/utils/types";
async function fetchTvMulti({
	id = "76479",
	mode = "multi",
}: {
	id?: string;
	mode?: "multi" | "images";
}) {
	const params =
		"?append_to_response=aggregate_credits%2Creviews%2Crecommendations%2Cimages&language=en-US";
	const res = await customFetch<TvMultiFetchResponse | MediaImages>(
		`/tv/${id}${mode === "multi" ? params : "/images"}`
	);
	//console.log(res.data);
	return res.data;
}

export default fetchTvMulti;

// https://api.themoviedb.org/3/tv/76479/images

//https://api.themoviedb.org/3/tv/76479?append_to_response=aggregate_credits%2Creviews%2Crecommendations&language=en-US
