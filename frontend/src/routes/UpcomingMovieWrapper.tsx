import { UpcomingMovie } from "@/pages";
import { useLocation } from "react-router";

function UpcomingMovieWrapper() {
	const { search } = useLocation();
	return <UpcomingMovie key={search} />;
}
export default UpcomingMovieWrapper;
