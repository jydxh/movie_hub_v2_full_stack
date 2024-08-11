import HomeSearch from "@/components/Home/HomeSearch";
import HeroPride from "@/components/Home/HeroPride";

import HomeTrending from "@/components/Home/HomeTrending";
import HomePopular from "@/components/Home/HomePopular";
import HomeFreeWatch from "@/components/Home/HomeFreeWatch";
import HomeLatestTrailer from "@/components/Home/HomeLatestTrailer";

function Home() {
	return (
		<>
			<div className="min-w-[630px]">
				<HomeSearch />
				<HeroPride />

				<HomeTrending />
				{/* latest trailers */}
				<HomeLatestTrailer />
				{/* popular */}
				<HomePopular />

				{/* free to watch */}
				<HomeFreeWatch />
			</div>
		</>
	);
}
export default Home;
