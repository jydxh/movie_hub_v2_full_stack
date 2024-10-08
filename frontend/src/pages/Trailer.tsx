import { useLoaderData, useLocation, useNavigate } from "react-router";

import { HomeLatestTrailerRes } from "@/utils/types";
import { Divider, Pagination } from "@mui/material";
import TrailerContent from "@/components/Videos/TrailerContent";

function Trailer() {
	const location = useLocation();
	const navigate = useNavigate();
	const handlePageChange = (_: unknown, page: number) => {
		const { pathname } = location;

		navigate(pathname + "?page=" + page);
	};
	const { results } = useLoaderData() as HomeLatestTrailerRes;
	const { results: trailers, page, total_results } = results;
	return (
		<>
			<section className=" py-8 px-4 bg-gradient-to-r from-sky-800/80 to-emerald-900/80">
				<div className="grid grid-cols-1 md:flex md:gap-x-4">
					<div className="md:mt-0 mt-8 w-full">
						<h2 className="font-semibold tracking-wide text-2xl mb-4 capitalize">
							Latest Movie Trailers: for our VIP only
						</h2>
						<h3 className="mb-2">Total Results: {total_results}</h3>
						<Divider />
						<div className="mt-4">
							<ul className="grid grid-cols-1 sm:grid-cols-2 place-content-center md:flex md:flex-wrap gap-6">
								{trailers.map((item, index) => {
									return (
										<TrailerContent
											data={item}
											key={item.id}
											index={index}
											mode="trailerPage"
											setImgCount={() => null}
										/>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-4 text-center flex justify-center">
					<Pagination
						onChange={handlePageChange}
						count={500}
						page={page}
						variant="outlined"
						shape="rounded"
					/>
				</div>
			</section>
		</>
	);
}
export default Trailer;
