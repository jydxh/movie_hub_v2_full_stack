import useMediaList from "@/hooks/useMediaList";

function TopRatedMovie() {
	return useMediaList("top rated movies", "movie");
}
export default TopRatedMovie;
