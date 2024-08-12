import ArrivingTv from "@/pages/TV/ArrivingTv";
import { useLocation } from "react-router";

function ArrivingTvWrapper() {
	const { search } = useLocation();
	return <ArrivingTv key={search} />;
}
export default ArrivingTvWrapper;
