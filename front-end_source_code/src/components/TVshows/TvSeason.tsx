import TvCard from "./TvCard";
import { TvMultiFetchResponse } from "@/utils/types";
import { Link } from "react-router-dom";

function TvSeason({ data }: { data: TvMultiFetchResponse }) {
	return (
		<section className="p-4">
			<h3 className="text-xl font-bold mb-4">Current Season</h3>
			<TvCard data={data} />
			<Link
				to="seasons"
				className="mt-4 font-semibold block hover:text-gray-500">
				View All Seasons
			</Link>
		</section>
	);
}
export default TvSeason;
