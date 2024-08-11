import { customFetch } from "@/api/customFetch";
import { HomeLatestTrailerRes } from "@/utils/types";

async function homeLatestTrailer() {
	const res = await customFetch<HomeLatestTrailerRes>("/movie/trailer");
	//console.log(res.data);
	return res.data.results;
}
export default homeLatestTrailer;
