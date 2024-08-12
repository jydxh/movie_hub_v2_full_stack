import { customFetch } from "./customFetch";
import { PersonMultiFetchResponse } from "@/utils/types";

async function fetchPeopleMulti({ id = "224513" }) {
	const res = await customFetch<PersonMultiFetchResponse>(
		`/person/${id}?append_to_response=combined_credits%2Cimages&language=en-US`
	);
	return res.data;
}
export default fetchPeopleMulti;
