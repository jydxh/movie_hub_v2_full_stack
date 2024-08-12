import { PeopleListResult } from "@/utils/types";
import { Link } from "react-router-dom";

function PeopleCard({ result }: { result: PeopleListResult }) {
	const { name, profile_path, known_for, id } = result;
	return (
		<div className="rounded-xl w-full h-[22.5rem] sm:h-[23.5rem] xl:h-[24rem] lg:h-[23rem]  border shadow-xl pb-2 ">
			<Link to={id.toString()}>
				<img
					src={`https://media.themoviedb.org/t/p/w470_and_h470_face${profile_path}`}
					alt={name}
					className="block rounded-t-xl max-h-[18rem] w-full object-cover"
				/>
				<p className="px-2 pt-1 text-lg font-medium">{name}</p>
			</Link>

			<ul className="px-2 line-clamp-2 ">
				{known_for.map((item, index) => {
					return (
						<li key={item.id} className="inline text-sm flex-shrink-0">
							<Link
								to={`/${
									item.media_type === "movie" ? "movie" : "tv_show"
								}/${item.id.toString()}`}>
								{`${item.name || item.title}${
									index < known_for.length - 2 ? "," : ""
								}${index == known_for.length - 2 ? ", and " : ""}`}{" "}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
export default PeopleCard;
