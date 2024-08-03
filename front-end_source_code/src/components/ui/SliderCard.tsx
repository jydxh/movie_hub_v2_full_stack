import formateDate from "@/utils/formateDate";
import { baseImgUrl } from "@/utils/types";
import { TrendingAllResult, MovieResult } from "@/utils/types";
import RatingCircle from "./RatingCircle";
import { Link } from "react-router-dom";
export interface SliderCardProps {
	data: TrendingAllResult[] | MovieResult[];
}

export function SliderCard({ data }: SliderCardProps) {
	return (
		<>
			{data.map(item => {
				const {
					id,
					poster_path,
					title,
					vote_average,
					release_date,
					first_air_date,
					name,
				} = item;
				return (
					<div className="w-[10rem] h-[24rem] mt-4 flex-shrink-0" key={id}>
						<Link to={`${release_date ? `/movie/${id}` : `/tv_show/${id}`}`}>
							<img
								src={`${baseImgUrl}/original/${poster_path}`}
								alt={title || name}
								className="w-[10rem] rounded-md shadow-lg"
							/>
							<RatingCircle value={vote_average} />
							<p className="line-clamp-2">{title || name}</p>
							<p className="mt-4 font-light text-gray-500">
								{formateDate(release_date) ||
									formateDate(first_air_date) ||
									"unknow"}
							</p>
						</Link>
					</div>
				);
			})}
		</>
	);
}
