import {
	LazyLoadImage,
	trackWindowScroll,
} from "react-lazy-load-image-component";
import { Backdrop, baseImgUrl } from "@/utils/types";

import Skeleton from "@mui/material/Skeleton";

interface ScrollPosition {
	x: number;
	y: number;
}

function Gal({
	images,
	scrollPosition,
}: {
	images: Backdrop[];
	scrollPosition: ScrollPosition;
}) {
	return (
		<>
			{images.map(image => {
				const { file_path } = image;
				return (
					<a
						key={file_path}
						href={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
						className="block h-[18rem] flex-shrink-0"
						target="_blank">
						<LazyLoadImage
							loading="lazy"
							alt="image"
							src={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
							scrollPosition={scrollPosition}
							className="h-[18rem]  w-auto "
							placeholder={
								<Skeleton
									className="grid place-content-center"
									width={511}
									height={288}>
									Loading...
								</Skeleton>
							}
						/>
					</a>
				);
			})}
		</>
	);
}
const Gallery = trackWindowScroll(Gal);
export default Gallery;
