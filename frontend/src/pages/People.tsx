import PeopleCard from "@/components/ui/PeopleCard";
import { PeopleListResponse } from "@/utils/types";
import { Divider, Pagination } from "@mui/material";
import { useLoaderData, useLocation, useNavigate } from "react-router";

function People() {
	const { results, page } = useLoaderData() as PeopleListResponse;
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
					count={500}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
export default People;
