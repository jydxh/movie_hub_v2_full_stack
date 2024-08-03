import MediaCastHeader from "@/components/Movie/MediaCastHeader";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";

import MediaCastList from "@/components/Movie/MediaCastList";
import { TvMultiFetchResponse } from "@/utils/types";
import fetchTvMulti from "@/api/TvApi/fetchTvMulti";

function TvCast() {
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
		console.log(data);
		const {
			poster_path,
			name,
			aggregate_credits: credits,
		} = data as TvMultiFetchResponse;
		return (
			<>
				<MediaCastHeader
					id={id}
					img={poster_path}
					title={name}
					mode="tv_show"
				/>
				<MediaCastList credits={credits} />
			</>
		);
	}
}
export default TvCast;
