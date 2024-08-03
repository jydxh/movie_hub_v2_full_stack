import HomeSearch from "@/components/Home/HomeSearch";
import HeroPride from "@/components/Home/HeroPride";

import HomeTrending from "@/components/Home/HomeTrending";
import HomePopular from "@/components/Home/HomePopular";
import HomeFreeWatch from "@/components/Home/HomeFreeWatch";

function Home() {
	return (
		<>
			<div className="min-w-[630px]">
				<HomeSearch />
				<HeroPride />

				<HomeTrending />

				{/* popular */}
				<HomePopular />

				{/* free to watch */}
				<HomeFreeWatch />
			</div>
		</>
	);
}
export default Home;
