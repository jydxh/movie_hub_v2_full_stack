import fetchTrendingAll from "@/api/fetchTrendingAll";
import SlidersWrapper from "../ui/SlidersWrapper";

const title = "trending";
const options = [
	{ title: "today", searchParam: "day" },
	{ title: "this week", searchParam: "week" },
];

function HomeTrending() {
	return (
		<SlidersWrapper
			title={title}
			options={options}
			fetchFunction={fetchTrendingAll}
		/>
	);
}
export default HomeTrending;
