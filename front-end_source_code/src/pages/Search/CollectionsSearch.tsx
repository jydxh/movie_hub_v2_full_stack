import { CollectionResultResponse } from "@/utils/types";
import { useLoaderData } from "react-router";
import SearchContentCard from "@/components/ui/SearchContentCard";
import { Pagination } from "@mui/material";
import usePagination from "@/hooks/usePagination";
function CollectionsSearch() {
	const { page, total_pages, results, total_results } =
		useLoaderData() as CollectionResultResponse;
	const { handlePageChange } = usePagination();
	if (total_results === 0) {
		return (
			<p className="mx-auto text-center mt-8">
				There are no results matched your query, please try another query.{" "}
			</p>
		);
	} else {
		return (
			<>
				<div>
					{results.map(result => {
						const { poster_path, name, overview, id } = result;
						return (
							<SearchContentCard
								type="collection"
								key={id}
								id={id}
								overview={overview}
								poster={poster_path}
								title={name}
							/>
						);
					})}
				</div>
				<div className="flex justify-center">
					<Pagination
						page={page}
						count={total_pages}
						variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</div>
			</>
		);
	}
}
export default CollectionsSearch;
