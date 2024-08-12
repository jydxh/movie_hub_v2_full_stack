import { LoaderFunction } from "react-router";
import { customFetch } from "@/api/customFetch";
import { TvBaseResponse } from "@/utils/types";
export const TvSeasonsLoader: LoaderFunction = async ({
	params,
}): Promise<TvBaseResponse | null> => {
	try {
		const res = await customFetch<TvBaseResponse>(
			`/tv/${params.id}?language=en-US`
		);
		return res.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
