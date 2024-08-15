import { Backdrop } from "@/utils/types";
import { useRef } from "react";
import MediaPosterCard from "./MediaPosterCard";
import LazyLoad from "react-lazyload";
import Skeleton from "@mui/material/Skeleton";

function LazyMediaPoster({
	show,
	backdrops,
	mode,
}: {
	show: "backdrop" | "poster" | "trailers";
	backdrops: Backdrop[];
	mode: "backdrop" | "poster";
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={scrollRef}
			className={`${
				show === mode ? "block " : "hidden "
			} rounded-t-lg border-1 overflow-x-scroll my-4 flex`}>
			{backdrops ? (
				backdrops.map((backdrop, index) => {
					if (index < 3) {
						return <MediaPosterCard data={backdrop} key={backdrop.file_path} />;
					}
					return (
						<LazyLoad
							className="flex-shrink-0"
							height={400}
							overflow={true}
							offset={-1}
							scroll={true}
							placeholder={
								<Skeleton
									className="grid place-content-center"
									width={511}
									height={288}>
									Loading...
								</Skeleton>
							}
							scrollContainer={scrollRef.current || undefined}
							key={backdrop.file_path}>
							<MediaPosterCard data={backdrop} key={backdrop.file_path} />
						</LazyLoad>
					);
				})
			) : (
				<p className="p-4 capitalize">no backdrop avialble</p>
			)}
		</div>
	);
}
export default LazyMediaPoster;

/*  mediaPoster lazy loading logic: use react-lazyload to deal with the lazy loading, but it has an issue that when internet is slow, or when there `offset` prop set to greater than 0, it will load all the imges, which is useless, and if set to <0 like -1, it will shows fallback at first, but as long as user dose not scroll right, it wont load img, which is a bad ux

the way to fix this issue is that add another 3 img first, and this 3 img wont be lazy loading , since they will be seen anyway, and then set the offset into -1 so img will load after they shows at ui, so when the internet slow, user can at least see the loading... skeleton, so they know img is loading ,instead of nothing
*/
