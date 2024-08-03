import useMediaList from "@/hooks/useMediaList";

function PlayingMovie() {
	return useMediaList("Now Playing Movies", "movie");
}
export default PlayingMovie;
