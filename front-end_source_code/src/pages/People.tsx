import fetchPopularPeople from "@/api/fetchPopularPeople";
import PeopleCard from "@/components/ui/PeopleCard";
import { PeopleListResponse } from "@/utils/types";
import { Divider, Pagination } from "@mui/material";
import {
	LoaderFunction,
	useLoaderData,
	useLocation,
	useNavigate,
} from "react-router";

export const loader: LoaderFunction = async ({
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

function People() {
	const { results, page, total_pages } = useLoaderData() as PeopleListResponse;
	const navigate = useNavigate();
	const { pathname } = useLocation();
	//console.log(useLoaderData());
	const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
		navigate(`${pathname}?page=${page}`);
	};
	return (
		<div className="p-8 mx-auto">
			<h1 className="text-2xl tracking-wide font-bold">Popular People</h1>
			<Divider className="my-8" />
			<ul className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
				{results.map(result => (
					<li key={result.id} className="w-full ">
						<PeopleCard result={result} />
					</li>
				))}
			</ul>
			<div className="mt-8 flex justify-center -mx-8 ">
				<Pagination
					size="small"
					variant="outlined"
					shape="rounded"
					page={page}
					count={total_pages}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
export default People;
