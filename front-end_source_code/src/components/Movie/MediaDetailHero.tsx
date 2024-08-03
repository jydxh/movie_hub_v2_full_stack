import { useParams } from "react-router";
import { MovieDetailResponse, TvMultiFetchResponse } from "@/utils/types";
import { baseImgUrl } from "@/utils/types";
import backgroundColor from "@/utils/backgroundColor";
import minutesToHours from "@/utils/minutesToHours";
import RatingCircle from "../ui/RatingCircle";
import formatDollars from "@/utils/formatDollars";

function isMovie(
	data: MovieDetailResponse | TvMultiFetchResponse
): data is MovieDetailResponse {
	return (
		data !== undefined &&
		Object.prototype.hasOwnProperty.call(data, "release_date")
	);
}
function isTv(
	data: MovieDetailResponse | TvMultiFetchResponse
): data is TvMultiFetchResponse {
	return (
		data !== undefined &&
		Object.prototype.hasOwnProperty.call(data, "first_air_date")
	);
}

function MediaDetailHero({
	data,
}: {
	data: MovieDetailResponse | TvMultiFetchResponse;
}) {
	const { id } = useParams();
	const bgColor = backgroundColor(id);

	if (data && id) {
		const {
			backdrop_path,
			poster_path,
			genres,
			homepage,
			vote_average,
			tagline,
			overview,
			status,
			production_companies,
			original_language,
			popularity,
		} = data;
		let title = "";
		let release_date = "";
		let runtime = 0;
		let budget: string | number = "unknown";
		let revenue: string | number = "unknown";
		if (isMovie(data)) {
			title = data.title;
			release_date = data.release_date;
			budget = data.budget;
			revenue = data.revenue;
			runtime = data.runtime;
		}
		if (isTv(data)) {
			title = data.name;
			release_date = data.first_air_date;
			budget = "unknow";
			revenue = "unknow";
			runtime = data.episode_run_time[0];
		}
		return (
			<>
				<div className="relative">
					<div
						// className="h-[80rem] md:h-[32rem]"
						className="absolute top-0 left-0 w-full h-full"
						style={{
							backgroundImage: `url(${baseImgUrl}/w1920_and_h800_multi_faces/${backdrop_path})`,
							backgroundPosition: "center",
							backgroundRepeat: "repeat-x",
							backgroundSize: "cover",
						}}></div>
					<div
						className={`${bgColor} w-full h-full opacity-90 absolute top-0 left-0`}></div>
					<div className="relative p-8 w-full">
						<div className="md:flex grid grid-cols-1 md:gap-x-4">
							<div className="flex md:justify-start justify-center w-full md:w-[19rem] flex-shrink-0">
								<img
									className="md:h-[28rem] h-[32rem] rounded-lg"
									src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
									alt={title}
								/>
							</div>
							<div className="mt-8 md:mt-0 w-full text-white text-center md:text-start ">
								<h2 className="text-3xl font-bold">
									<a href={homepage} target="_blank">
										{title}
									</a>
								</h2>
								<p>
									<span>{release_date}</span>
									<span>&nbsp;/&nbsp;</span>
									{genres.map((item, index) => (
										<span key={item.id}>
											{item.name}
											{index === genres.length - 1 ? "" : ", "}
										</span>
									))}
									<span>&nbsp;/&nbsp;</span>
									<span>{minutesToHours(runtime)}</span>
								</p>
								<div className="flex items-center justify-center md:justify-start gap-x-8 mt-4">
									<RatingCircle
										value={vote_average}
										className="md:top-1 w-[4rem] h-[4rem] top-1.5 font-bold"
										fontSize="large"
									/>
									<p>User Score </p>
								</div>
								<p className="mt-4 italic font-bold">{tagline}</p>
								<div className="mt-2">
									<h3 className="text-xl font-semibold">Overview</h3>
									<article>{overview}</article>
								</div>
								<section className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-y-8">
									<div>
										<p className="font-semibold">Status</p>
										<p>{status}</p>
									</div>
									<div>
										<p className="font-semibold">Budget</p>
										<p>{formatDollars(budget)}</p>
									</div>
									<div>
										<p className="font-semibold">Revenue</p>
										<p>{formatDollars(revenue)}</p>
									</div>
									<div>
										<p className="font-semibold">Company</p>
										<p>{production_companies[0]?.name || "unknow"}</p>
									</div>
									<div>
										<p className="font-semibold ">Original Language</p>
										<p className="uppercase">{original_language}</p>
									</div>
									<div>
										<p className="font-semibold">Popularity</p>
										<p>{popularity}</p>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
export default MediaDetailHero;
