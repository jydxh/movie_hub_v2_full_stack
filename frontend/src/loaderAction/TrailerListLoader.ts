import { LoaderFunction, json, redirect } from "react-router";
import { store } from "@/store";
import movieTrailerList from "@/api/videos/movieTrailerList";

import { HomeLatestTrailerRes } from "@/utils/types";
export const TrailerListLoader: LoaderFunction = async ({
	request,
}): Promise<HomeLatestTrailerRes | Response> => {
	const { username } = store.getState().user;
	if (!username) {
		return redirect("/login");
	}
	const urlSearchParams = new URL(request.url).searchParams;
	const searchParam = new URLSearchParams(urlSearchParams);
	const page = searchParam.get("page") || 1;

	try {
		const res = await movieTrailerList({ page: Number(page) });
		//console.log(res);
		return res;
	} catch (err) {
		console.log(err);
		return json({ status: 500, msg: "failed to fetch data" });
	}
};
