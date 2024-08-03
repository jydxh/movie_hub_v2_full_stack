import StarIcon from "@mui/icons-material/Star";
import { baseImgUrl } from "@/utils/types";
import PanoramaIcon from "@mui/icons-material/Panorama";

function TvSeasonsCard({
	poster_path,
	name,
	vote_average,
	air_date,
	overview,
	episode_count,
}: {
	poster_path: string | null;
	name: string;
	vote_average: number;
	air_date: string | null;
	overview: string;
	episode_count: number;
}) {
	return (
		<div className="rounded-lg border shadow-lg flex gap-x-4">
			{poster_path && (
				<img
					src={`${baseImgUrl}/w260_and_h390_bestv2/${poster_path}`}
					alt={name}
					className="h-[12rem] rounded-s-lg"
				/>
			)}
			{!poster_path && <PanoramaIcon className="h-[12rem] w-[8rem]" />}

			<div>
				<p className="text-xl mt-4">{name}</p>
				<div className="flex gap-x-4">
					<div className="flex items-center bg-gray-700 w-[4rem] rounded justify-center gap-x-1 text-white text-sm">
						<StarIcon className="w-[1rem] h-[1rem]" />
						{vote_average * 10 + "%"}
					</div>
					<p className="flex items-center">
						{air_date?.substring(0, 4)} | {episode_count} Eposodes
					</p>
				</div>
				<article className="mt-4 font-thin">{overview}</article>
			</div>
		</div>
	);
}
export default TvSeasonsCard;
