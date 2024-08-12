import SlidersWrapper from "../ui/SlidersWrapper";
import fetchHomePopular from "@/api/fetchHomePopular";

const title = "What's Popular";
const options = [
	{ title: "streaming", searchParam: "1" },
	{ title: "on TV", searchParam: "2" },
	{ title: "for rent", searchParam: "3" },
	{ title: "In theatres", searchParam: "4" },
];

function HomePopular() {
	return (
		<SlidersWrapper
			title={title}
			options={options}
			fetchFunction={fetchHomePopular}
		/>
	);
}
export default HomePopular;
