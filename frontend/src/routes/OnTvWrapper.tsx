import { OnTv } from "@/pages";
import { useLocation } from "react-router";

function OnTvWrapper() {
	const { search } = useLocation();
	return <OnTv key={search} />;
}
export default OnTvWrapper;
