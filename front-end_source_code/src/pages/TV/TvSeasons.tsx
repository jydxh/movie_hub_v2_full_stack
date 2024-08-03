import { LoaderFunction, useLoaderData, useParams } from "react-router";
import { customFetch } from "@/api/customFetch";
import { TvBaseResponse } from "@/utils/types";

import MediaCastHeader from "@/components/Movie/MediaCastHeader";
import TvSeasonsCard from "@/components/TVshows/TvSeasonsCard";

export const loader: LoaderFunction = async ({
	params,
}): Promise<TvBaseResponse | null> => {
	try {
		const res = await customFetch<TvBaseResponse>(
			`/tv/${params.id}?language=en-US`
		);
		return res.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

function TvSeasons() {
	const { id } = useParams();
	const data = useLoaderData() as TvBaseResponse;
	console.log(data);
	if (id && data) {
		const { poster_path, name, seasons } = data;
		return (
			<>
				<MediaCastHeader
					id={id}
					img={poster_path}
					title={name}
					mode="tv_show"
				/>
				<ul className="mt-4">
					{seasons.map(season => {
						const {
							air_date,
							name,
							id,
							overview,
							poster_path,
							vote_average,
							episode_count,
						} = season;
						return (
							<li className="my-4 p-4" key={id}>
								<TvSeasonsCard
									overview={overview}
									episode_count={episode_count}
									poster_path={poster_path}
									name={name}
									air_date={air_date}
									vote_average={vote_average}
								/>
							</li>
						);
					})}
				</ul>
			</>
		);
	}
}
export default TvSeasons;
