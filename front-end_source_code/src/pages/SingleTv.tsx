import MediaDetailHero from "@/components/Movie/MediaDetailHero";
import CastList from "@/components/ui/CastList";
import MediaReview from "@/components/ui/MediaReview";
import MediaPoster from "@/components/ui/MediaPoster";
import MediaRecommendation from "@/components/ui/MediaRecommendation";
import TvSeason from "@/components/TVshows/TvSeason";
import { Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Button } from "@mui/material";
import fetchTvMulti from "@/api/TvApi/fetchTvMulti";
import { TvMultiFetchResponse } from "@/utils/types";
function SingleTv() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, error, isPending, isError } = useQuery({
		queryKey: ["TvDetails", id],
		queryFn: () => fetchTvMulti({ id, mode: "multi" }),
		staleTime: 5 * 60 * 1000 /* 5 minnutes  */,
	});

	if (isPending) {
		return (
			<div className="mx-auto text-center w-full">
				<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
				<Skeleton variant="circular" width={40} height={40} />
				<Skeleton variant="rectangular" width={210} height={60} />
				<Skeleton variant="rounded" width={210} height={60} />
			</div>
		);
	} else if (isError) {
		return (
			<div className="w-full h-[80vh] grid place-content-center">
				<p className="text-center text-3xl text-red-500">
					Error: {error.message}
				</p>
				<Button
					onClick={() => {
						navigate(-1);
					}}
					className="capitalize mt-4"
					size="large"
					variant="outlined"
					color="success">
					Go Back
				</Button>
			</div>
		);
	} else if (data) {
		//console.log(data);
		const {
			aggregate_credits: credits,
			reviews,
			recommendations,
		} = data as TvMultiFetchResponse;
		return (
			<>
				<MediaDetailHero data={data as TvMultiFetchResponse} />
				<CastList data={credits} />
				<Divider className="mt-2" />
				<TvSeason data={data as TvMultiFetchResponse} />
				<Divider className="mt-2" />
				<MediaReview data={reviews} />
				<Divider className="mt-2" />
				<MediaPoster mode="tv" />
				<Divider className="mt-2" />
				<MediaRecommendation data={recommendations} />
			</>
		);
	}
}
export default SingleTv;
