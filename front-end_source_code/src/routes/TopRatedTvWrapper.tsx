import TopRatedTv from "@/pages/TV/TopRatedTv";
import { useLocation } from "react-router";

function TopRatedTvWrapper() {
	const { search } = useLocation();
	return <TopRatedTv key={search} />;
}
export default TopRatedTvWrapper;
