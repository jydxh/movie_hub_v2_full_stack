import fetchPeopleMulti from "@/api/fetchPeopleMulti";
import { LoaderFunction } from "react-router";
import { PersonMultiFetchResponse } from "@/utils/types";
export const SinglePersonLoader: LoaderFunction = async ({
	params,
}): Promise<PersonMultiFetchResponse | null> => {
	const { id } = params;
	try {
		const res = await fetchPeopleMulti({ id });
		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};
