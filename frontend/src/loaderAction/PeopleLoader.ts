import fetchPopularPeople from "@/api/fetchPopularPeople";
import { LoaderFunction } from "react-router-dom";
import { PeopleListResponse } from "@/utils/types";

export const PeopleLoader: LoaderFunction = async ({
	request,
}): Promise<PeopleListResponse | null> => {
	const url = new URL(request.url);
	const search = url.searchParams;
	const page = search.get("page");
	try {
		if (page) {
			const res = await fetchPopularPeople(Number(page));
			return res;
		} else {
			const res = await fetchPopularPeople();
			return res;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};
