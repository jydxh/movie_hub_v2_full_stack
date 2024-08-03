import { TvMultiFetchResponse, baseImgUrl } from "@/utils/types";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import formateDate from "@/utils/formateDate";

function TvCard({ data }: { data: TvMultiFetchResponse }) {
	if (!data) {
		return <p className="text-center text-red-500">404: Data not found</p>;
	}

	const { poster_path, name, seasons, next_episode_to_air } = data;

	// Ensure seasons array is not empty
	if (!seasons || seasons.length === 0) {
		return <p className="text-center text-yellow-500">No seasons available</p>;
	}

	// Select the latest season
	const season = seasons[seasons.length - 1];

	return (
		<div className="rounded-lg border shadow-lg sm:flex gap-x-4">
			<img
				src={`${baseImgUrl}/w260_and_h390_bestv2/${poster_path}`}
				alt={name || "TV Show Poster"}
				className="sm:h-[12rem]  rounded-lg"
			/>
			<div className="p-4">
				<p className="text-xl mt-4">
					{season.name || "Season Info Unavailable"}
				</p>
				<div className="flex gap-x-4">
					<div className="flex items-center bg-gray-700 w-[4rem] rounded justify-center gap-x-1 text-white text-sm">
						<StarIcon className="w-[1rem] h-[1rem]" />
						{season.vote_average ? `${season.vote_average * 10}%` : "N/A"}
					</div>
					<p className="flex items-center">
						{season.air_date?.substring(0, 4) || "Unknown Year"} |{" "}
						{season.episode_count} Episodes
					</p>
				</div>
				<article className="mt-4 font-thin">
					{season.overview || "Overview not available"}
				</article>
				<div className="flex items-center gap-x-4 mb-4">
					<CalendarMonthIcon />
					<p className="border-b py-2">
						{next_episode_to_air?.name || "Next Episode Info Unavailable"}
					</p>
					<p>
						(
						{next_episode_to_air
							? formateDate(next_episode_to_air.air_date)
							: "Unknown Date"}
						)
					</p>
				</div>
			</div>
		</div>
	);
}

// function TvCard({ data }: { data: TvMultiFetchResponse }) {
// 	if (data.name) {
// 		const { poster_path, name, seasons, next_episode_to_air } = data;
// 		let season: Season;
// 		if (seasons[seasons.length - 1].air_date) {
// 			season = seasons[seasons.length - 1];
// 		} else {
// 			season = seasons[seasons.length - 2];
// 		}
// 		return (
// 			<div className="rounded-lg border shadow-lg flex gap-x-4">
// 				<img
// 					src={`${baseImgUrl}/w260_and_h390_bestv2/${poster_path}`}
// 					alt={name}
// 					className="h-[12rem] rounded-lg"
// 				/>
// 				<div>
// 					<p className="text-xl mt-4">{season.name}</p>
// 					<div className="flex gap-x-4">
// 						<div className="flex items-center bg-gray-700 w-[4rem] rounded justify-center gap-x-1 text-white text-sm">
// 							<StarIcon className="w-[1rem] h-[1rem]" />
// 							{season.vote_average * 10 + "%" || "unknow"}
// 						</div>
// 						<p className="flex items-center">
// 							{season.air_date?.substring(0, 4)} | {season.episode_count}{" "}
// 							Eposodes
// 						</p>
// 					</div>
// 					<article className="mt-4 font-thin">{season.overview}</article>
// 					<div className="flex items-center gap-x-4 mb-4">
// 						<CalendarMonthIcon />
// 						<p className="border-b py-2">{next_episode_to_air.name}</p>
// 						<p>({formateDate(next_episode_to_air.air_date)})</p>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	} else {
// 		return <p> 404 can not find the resources</p>;
// 	}
// }
export default TvCard;
