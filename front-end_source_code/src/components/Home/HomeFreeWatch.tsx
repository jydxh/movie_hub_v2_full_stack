import SlidersWrapper from "../ui/SlidersWrapper";
import fetchHomeTV from "@/api/fetchHomeTV";

const title = "Trending TV";
const options = [
	{ title: "today", searchParam: "day" },
	{ title: "this week", searchParam: "week" },
];

function HomeFreeWatch() {
	return (
		<SlidersWrapper
			title={title}
			options={options}
			fetchFunction={fetchHomeTV}
		/>
	);
}
export default HomeFreeWatch;
