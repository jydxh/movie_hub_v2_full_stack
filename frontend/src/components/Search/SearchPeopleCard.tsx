import { KnownForItem } from "@/utils/types";
import man from "@/assets/man.jpg";
import woman from "@/assets/woman.jpg";
import { Link } from "react-router-dom";

type SearchPeopleCardProps = {
	poster: string | null;
	name: string;
	gender: number;
	department: string;
	known_for: KnownForItem[];
	id: number;
};

const imgClass = '"w-[4.8rem] h-[4.8rem] rounded-lg object-cover"';

function SearchPeopleCard({
	department,
	gender,
	known_for,
	name,
	poster,
	id,
}: SearchPeopleCardProps) {
	return (
		<Link to={`/people/${id}`}>
			<div className="w-full mt-4 md:mt-0 pe-4 flex mb-6 gap-x-6 border-1 shadow-lg">
				<div className="flex-shrink-0">
					{poster ? (
						<img
							src={
								"https://media.themoviedb.org/t/p" +
								"/w180_and_h180_face" +
								poster
							}
							alt={name}
							className={imgClass}
						/>
					) : gender === 2 ? (
						<img src={man} alt="male" className={imgClass} />
					) : (
						<img src={woman} alt="female" className={imgClass} />
					)}
				</div>

				<div className="mt-4 ">
					<h4 className="font-semibold"> {name}</h4>
					<div className="sm:flex gap-x-2">
						<p>{department}</p> <span>•</span>
						<ul className="sm:flex font-thin text-gray-500">
							{known_for.map(item => {
								const { id, title, name, original_name } = item;
								return (
									<li key={id}>{title || name || original_name} &nbsp;</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</Link>
	);
}
export default SearchPeopleCard;
