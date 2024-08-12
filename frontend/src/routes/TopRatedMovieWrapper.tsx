import { TopRatedMovie } from "@/pages";
import { useLocation } from "react-router";

function TopRatedMovieWrapper() {
	const { search } = useLocation();
	return <TopRatedMovie key={search} />;
}
export default TopRatedMovieWrapper;
