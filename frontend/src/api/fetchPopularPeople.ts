import { PeopleListResponse } from "@/utils/types";
import { customFetch } from "./customFetch";

async function fetchPopularPeople(page: number = 1) {
	const res = await customFetch<PeopleListResponse>(
		`/person/popular?language=en-US&page=${page}`
	);
	return res.data;
}
export default fetchPopularPeople;
