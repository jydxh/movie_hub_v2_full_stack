import MediaCastHeader from "@/components/Movie/MediaCastHeader";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { TvMultiFetchResponse } from "@/utils/types";
import MediaReviewCard from "@/components/ui/MediaReviewCard";
import backgroundColor from "@/utils/backgroundColor";
import CreateIcon from "@mui/icons-material/Create";
import fetchTvMulti from "@/api/TvApi/fetchTvMulti";

function TvReviews() {
	const { pathname } = useLocation();
	const id = pathname.split("/")[2];
	const { data, error, isPending, isError } = useQuery({
		queryKey: ["MovieCast", id],
		queryFn: () => fetchTvMulti({ id }),
		staleTime: 5 * 60 * 1000 /* 5 minnutes  */,
	});

	if (isError) {
		return <div className="mx-auto text-xl text-center">{error.message}</div>;
	}
	if (isPending) {
		return <div className="mx-auto text-xl text-center">...loading...</div>;
	}
	if (data) {
		const { reviews, poster_path, name } = data as TvMultiFetchResponse;
		console.log(reviews);
		return (
			<>
				<MediaCastHeader id={id} img={poster_path} title={name} />
				<div className="grid md:grid-cols-4 grid-cols-1">
					<div className="col-span-1 mx-auto my-8 p-8">
						<button
							className={
								"rounded-full px-6 py-2 font-semibold text-white flex items-center gap-x-2 hover:bg-slate-800 " +
								backgroundColor(id)
							}
							onClick={() => {
								alert("write Review on the way...");
							}}>
							<CreateIcon />
							WRITE REVIEW
						</button>
					</div>
					<div className="col-span-3 p-8 mb-4">
						{reviews.results.map(result => {
							return <MediaReviewCard data={result} key={result.id} />;
						})}
					</div>
				</div>
			</>
		);
	}
}
export default TvReviews;
