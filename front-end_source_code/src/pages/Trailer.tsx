import { LoaderFunction, json } from "react-router";
import movieTrailerList from "@/api/videos/movieTrailerList";

import { HomeLatestTrailerRes } from "@/utils/types";

export const loader: LoaderFunction = async ({
	request,
}): Promise<HomeLatestTrailerRes | Response> => {
	const urlSearchParams = new URL(request.url).searchParams;
	const searchParam = new URLSearchParams(urlSearchParams);
	const page = searchParam.get("page") || 1;

	try {
		const res = await movieTrailerList({ page: Number(page) });
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
		return json({ status: 500, msg: "failed to fetch data" });
	}
};

function Trailer() {
	return <div>Trailer</div>;
}
export default Trailer;
