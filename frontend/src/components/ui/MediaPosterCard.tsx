import { baseImgUrl, Backdrop } from "@/utils/types";

function MediaPosterCard({ data }: { data: Backdrop }) {
	const { file_path } = data;
	return (
		<>
			<a
				key={file_path}
				href={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
				className="block h-[18rem] flex-shrink-0"
				rel="noopener noreferrer"
				target="_blank">
				<img
					src={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
					className="h-[18rem]  w-auto "
				/>
			</a>
		</>
	);
}
export default MediaPosterCard;
