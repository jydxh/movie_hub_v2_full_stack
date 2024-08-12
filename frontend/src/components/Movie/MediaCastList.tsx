import {
	baseImgUrl,
	MovieCast,
	TvCast,
	MovieCredits,
	TvCredits,
} from "@/utils/types";
import { Link } from "react-router-dom";
import MaleAvatar from "@/assets/man.jpg";
import FemaleAvatar from "@/assets/woman.jpg";
import getAllDept from "@/utils/getAllDept";
import { Divider } from "@mui/material";

const imgClass = "rounded-lg w-[4.6rem]";

export const isTvCast = (item: MovieCast | TvCast): item is TvCast => {
	return (
		item !== undefined &&
		Object.prototype.hasOwnProperty.call(item, "total_episode_count")
	);
};

export const isMovieCast = (item: MovieCast | TvCast): item is MovieCast => {
	return (
		item !== undefined &&
		Object.prototype.hasOwnProperty.call(item, "credit_id")
	);
};

function PeopleCard({
	item,
	mode,
}: {
	item: MovieCast | TvCast;
	mode: "cast" | "crew";
}) {
	const { profile_path, gender, name, id } = item;
	let character = "";
	let job = "";
	if (isTvCast(item)) {
		if (mode === "cast") {
			character = item.roles?.[0]?.character || "unknown";
		} else {
			job = item.jobs?.[0]?.job || "unknown";
		}
	}
	if (isMovieCast(item)) {
		if (mode === "cast") character = item.character || "unknow";
		else {
			job = item.job || "unknow";
		}
	}

	return (
		<>
			<li className="mb-4">
				<Link to={`/people/${id}`}>
					<div className="md:flex md:gap-x-4 lg:gap-x-8">
						{profile_path ? (
							<img
								className={imgClass}
								src={`${baseImgUrl}/w132_and_h132_face/${profile_path}`}
								alt={name}
							/>
						) : (
							<img
								className={imgClass}
								src={gender == 1 ? FemaleAvatar : MaleAvatar}
								alt={name}
							/>
						)}
						<div className="mt-2 md:mt-0 flex flex-col justify-center">
							<p className="font-bold md:text-base text-sm">{name}</p>
							<p className="md:text-sm text-xs">
								{mode === "cast" ? character : job}
							</p>
						</div>
					</div>
				</Link>
			</li>
		</>
	);
}

function MediaCastList({ credits }: { credits: MovieCredits | TvCredits }) {
	let depArray = getAllDept(credits.crew);
	depArray = depArray
		.sort((a, b) => a.localeCompare(b))
		.filter(item => item !== "Acting"); // to get the sorted department Array
	console.log(credits);
	return (
		<section className="grid grid-cols-3 p-1 md:p-4 mt-4">
			<div>
				<h2 className="text-xl font-semibold">
					Cast{" "}
					<span className="text-gray-500 font-thin">{credits.cast.length}</span>
				</h2>
				<ul className="mt-6">
					{credits.cast.map(item => (
						<PeopleCard key={item.id} item={item} mode="cast" />
					))}
				</ul>
			</div>
			<div className="flex justify-center -mx-10">
				<Divider orientation="vertical" />
			</div>

			<div>
				<h2 className="text-xl font-semibold">
					Crew{" "}
					<span className="text-gray-500 font-thin">{credits.crew.length}</span>
				</h2>
				<ul className="mt-6">
					{depArray.map((dep, index) => {
						const filteredCrew = credits.crew.filter(
							item => item.known_for_department === dep
						);
						return (
							<li key={index + Math.random()}>
								<h4 className="font-bold mb-2">{dep}</h4>
								{filteredCrew.map(item => (
									<ul key={item.id + Math.random()}>
										<PeopleCard item={item} mode="crew" />
									</ul>
								))}
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
export default MediaCastList;
