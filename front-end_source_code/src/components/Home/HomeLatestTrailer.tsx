import { useQuery } from "@tanstack/react-query";
import homeLatestTrailer from "@/api/videos/homeLatestTrailer";
import { baseImgUrl } from "@/utils/types";
import { useState } from "react";
import backgroundColor from "@/utils/backgroundColor";

import Skeleton from "@mui/material/Skeleton";
import TrailerContent from "../Videos/TrailerContent";

function HomeLatestTrailer() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["HomeLatestTrailer"],
		queryFn: homeLatestTrailer,
		staleTime: 15 * 60 * 1000,
	});

	const [imgCount, setImgCount] = useState(0);
	const bgColor = backgroundColor(String(imgCount));

	return (
		<section className="max-w-[1400px] px-4 mx-6 py-6 relative">
			{data && (
				<>
					<div
						style={{
							backgroundImage: `url("${baseImgUrl}/w1920_and_h427_multi_faces/${data[imgCount].poster_path}")`,
						}}
						className="  object-contain absolute top-0 left-0 w-full h-full"></div>
					<div
						className={`${bgColor} opacity-80 w-full h-full  top-0 left-0 absolute`}></div>
					<div className="relative h-[16rem]">
						<h4 className="capitalize font-bold text-xl text-white">
							Latest Trailers
						</h4>
						<div className="flex overflow-x-scroll gap-x-4 custom-scrollbar ">
							{data.map((item, index) => (
								<TrailerContent
									key={item.id}
									index={index}
									data={item}
									mode="home"
									setImgCount={setImgCount}
								/>
							))}
						</div>
					</div>
				</>
			)}
			{isLoading && (
				<>
					<div className="absolute top-0 left-0 w-full h-full"></div>
					<div
						className={`bg-teal-800/90 w-full h-full  top-0 left-0 absolute`}></div>
					<div className="relative h-[16rem]">
						<h4 className="capitalize font-bold text-xl text-white">
							Latest Trailers
						</h4>
						<div className="flex overflow-x-scroll gap-x-4 custom-scrollbar ">
							{Array.from(
								{ length: 10 },
								(_, index) => index + 1
							).map<React.ReactNode>(item => (
								<Skeleton
									key={item}
									width={300}
									height={200}
									className="flex-shrink-0"
								/>
							))}
						</div>
					</div>
				</>
			)}
			{isError && (
				<p className="text-center w-full my-8 mx-auto">
					Cannot fetch data, please try again!
				</p>
			)}
		</section>
	);
}
export default HomeLatestTrailer;
