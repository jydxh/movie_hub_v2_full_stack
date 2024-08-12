import backgroundColor from "@/utils/backgroundColor";
import { baseImgUrl } from "@/utils/types";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

function MediaCastHeader({
	id,
	img,
	title,
	mode = "movie",
}: {
	img: string;
	title: string;
	id: string;
	mode?: "movie" | "tv_show";
}) {
	return (
		<section className={`${backgroundColor(id)} p-4 flex gap-x-8`}>
			<img
				src={`${baseImgUrl}/w116_and_h174_face/${img}`}
				alt={title}
				className="w-[4rem]"
			/>
			<div className="flex flex-col justify-center">
				<h1 className="text-3xl font-bold text-white hover:text-gray-400">
					<Link to={`/${mode}/${id}`}>{title}</Link>
				</h1>
				<Link
					to={`/${mode}/${id}`}
					className="text-gray-300 hover:text-gray-400 flex items-center gap-x-2">
					<WestIcon /> Back to main
				</Link>
			</div>
		</section>
	);
}
export default MediaCastHeader;
