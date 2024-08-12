import HomeSearch from "@/components/Home/HomeSearch";
import HeroPride from "@/components/Home/HeroPride";

/* when using lazy-loading, 6048.38ms load front-page */
/* when not using 6902.80ms */
// import HomeTrending from "@/components/Home/HomeTrending";
// import HomePopular from "@/components/Home/HomePopular";
// import HomeFreeWatch from "@/components/Home/HomeFreeWatch";
// import HomeLatestTrailer from "@/components/Home/HomeLatestTrailer";

import Skeleton from "@mui/material/Skeleton";
import { lazy, Suspense } from "react";

const LoadingSkeleton = () => {
	return (
		<div className="mx-auto my-8 text-center flex-col justify-center items-center">
			<p className="text-3xl font-semibold">loading...</p>
			<div className="mx-auto w-full">
				<Skeleton variant="rounded" width={400} height={60} />;
			</div>
		</div>
	);
};

const HomeTrending = lazy(() => import("@/components/Home/HomeTrending"));
const HomePopular = lazy(() => import("@/components/Home/HomePopular"));
const HomeFreeWatch = lazy(() => import("@/components/Home/HomeFreeWatch"));
const HomeLatestTrailer = lazy(
	() => import("@/components/Home/HomeLatestTrailer")
);

function Home() {
	return (
		<>
			<div className="min-w-[630px]">
				<HomeSearch />
				<HeroPride />

				{/* 	<HomeTrending />
			
				<HomeLatestTrailer />
			
				<HomePopular />
			
				<HomeFreeWatch /> */}
				<Suspense fallback={<LoadingSkeleton />}>
					<HomeTrending />
				</Suspense>
				<Suspense fallback={<LoadingSkeleton />}>
					<HomeLatestTrailer />
				</Suspense>
				<Suspense fallback={<LoadingSkeleton />}>
					<HomePopular />
				</Suspense>
				<Suspense fallback={<LoadingSkeleton />}>
					<HomeFreeWatch />
				</Suspense>
			</div>
		</>
	);
}
export default Home;
