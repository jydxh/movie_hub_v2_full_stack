import { PopularTv } from "@/pages";
import { useLocation } from "react-router";

function PopularTvWrapper() {
	const { search } = useLocation();
	return <PopularTv key={search} />;
}
export default PopularTvWrapper;
