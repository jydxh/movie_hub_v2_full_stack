import useMediaList from "@/hooks/useMediaList";

function UpcomingMovie() {
	return useMediaList("upcoming movies", "movie");
}
export default UpcomingMovie;
