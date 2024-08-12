import backgroundImg from "@/assets/search_background.jpg";
import SearchInput from "./SearchInput";
function HomeSearch() {
	return (
		<section
			className="max-w-[1400px] mx-auto h-[24rem] contrast-125  flex flex-col items-start justify-center gap-y-4 text-white brightness-90"
			style={{
				backgroundImage: `url(${backgroundImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className="mx-auto px-8">
				<h1 className="text-5xl font-semibold">Welcome.</h1>
				<h2 className="text-3xl mt-2 font-semibold tracking-wide ">
					Millions of movies, TV shows and people to discoiver. Explore now.
				</h2>
			</div>
			<div className="w-full mx-auto">
				<SearchInput />
			</div>
		</section>
	);
}
export default HomeSearch;
