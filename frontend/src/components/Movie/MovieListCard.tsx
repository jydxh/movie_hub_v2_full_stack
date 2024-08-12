import formateDate from "@/utils/formateDate";
import RatingCircle from "../ui/RatingCircle";
import { Link } from "react-router-dom";

type MovieListCardProps = {
	imgPath: string;
	title: string;
	release_date: string;
	vote_average: number;
	id: number;
	type: "movie" | "tv";
};

function MovieListCard({
	imgPath,
	release_date,
	title,
	vote_average,
	id,
	type,
}: MovieListCardProps) {
	return (
		<li className="mx-auto rounded-lg md:w-[12rem] w-[80%] border border-gray-200 shadow-lg flex flex-col justify-start items-start">
			<Link
				preventScrollReset={true}
				to={`${type === "movie" ? `/movie/${id}` : `/tv_show/${id}`}`}>
				<img
					src={`https://media.themoviedb.org/t/p/w440_and_h660_face${imgPath}`}
					alt={title}
					className="rounded-t-lg"
				/>
				<RatingCircle value={vote_average} />
				<p className="capitalize text-sm font-thin px-2">{title}</p>
				<p className="text-gray-400 px-2 text-sm mb-4">
					{formateDate(release_date)}
				</p>
			</Link>
		</li>
	);
}
export default MovieListCard;
