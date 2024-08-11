import { useQuery } from "@tanstack/react-query";
import homeLatestTrailer from "@/api/videos/homeLatestTrailer";
import { baseImgUrl } from "@/utils/types";
import { useState } from "react";
import backgroundColor from "@/utils/backgroundColor";
import TrailerCard from "./TrailerCard";

function HomeLatestTrailer() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["HomeLatestTrailer"],
		queryFn: homeLatestTrailer,
		staleTime: 15 * 60 * 1000,
	});

	const [imgCount, setImgCount] = useState(0);
	const bgColor = backgroundColor(String(imgCount));

	console.log(data);

	return (
		<section className="max-w-[1400px] mx-auto p-8 relative">
			{data && (
				<>
					<div
						style={{
							backgroundImage: `url("${baseImgUrl}/w1920_and_h427_multi_faces/${data[imgCount].poster_path}")`,
						}}
						className=" flex justify-start items-center custom-scrollbar gap-x-6 object-fill absolute top-0 left-0 w-full h-full"></div>
					<div
						className={`${bgColor} opacity-80 w-full h-full  top-0 left-0 absolute`}></div>
					<div className="relative h-[16rem]">
						<h4 className="capitalize font-bold text-xl text-white">
							Latest Trailers
						</h4>
						<div className="flex overflow-x-scroll gap-x-4 ">
							{data.map((item, index) => (
								<TrailerCard
									key={item.id}
									index={index}
									data={item}
									setImgCount={setImgCount}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</section>
	);
}
export default HomeLatestTrailer;
