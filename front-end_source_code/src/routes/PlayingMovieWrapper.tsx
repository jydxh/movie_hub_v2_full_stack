import { PlayingMovie } from "@/pages";
import { useLocation } from "react-router";

function PlayingMovieWrapper() {
	const { search } = useLocation();
	return <PlayingMovie key={search} />;
}
export default PlayingMovieWrapper;
