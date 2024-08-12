import { PopularMovie } from "@/pages";
import { useLocation } from "react-router";
//import { lazy } from "react";

function PopularMovieWrapper() {
	const { search } = useLocation();
	return <PopularMovie key={search} />;
}
export default PopularMovieWrapper;
