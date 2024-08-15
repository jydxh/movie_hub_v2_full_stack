import { baseImgUrl } from "@/utils/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "@mui/material/Skeleton";
interface ImageProps {
	filePath: string;
	scrollPosition: { x: number; y: number };
}
const LazyImage: React.FC<ImageProps> = ({ filePath, scrollPosition }) => {
	return (
		<a
			key={filePath}
			href={`${baseImgUrl}/w1066_and_h600_bestv2/${filePath}`}
			className="block h-[18rem] flex-shrink-0"
			rel="noopener noreferrer"
			target="_blank">
			<LazyLoadImage
				loading="lazy"
				alt="image"
				src={`${baseImgUrl}/w1066_and_h600_bestv2/${filePath}`}
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
};

export default LazyImage;
