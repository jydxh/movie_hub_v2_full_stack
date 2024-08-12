import { HomeLatestTrailer } from "@/utils/types";
import { baseImgUrl } from "@/utils/types";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {
	useState,
	// useRef, useEffect
} from "react";
import { Dialog } from "@mui/material";

function TrailerContent({
	data,
	mode,
	index,
	setImgCount,
}: {
	data: HomeLatestTrailer;
	mode: "home" | "trailerPage" | "movieDetailTrailer";
	index: number;
	setImgCount: (index: number) => void;
}) {
	const [open, setOpen] = useState(false);
	//const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	/* adding the tailwind css link at iframe */
	// useEffect(() => {
	// 	if (iframeRef.current) {
	// 		const iframeDoc = iframeRef.current.contentDocument;
	// 		if (iframeDoc) {
	// 			const link = iframeDoc.createElement("link");
	// 			link.rel = "stylesheet";
	// 			link.href =
	// 				"https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css"; // Tailwind CSS URL
	// 			iframeDoc.head.appendChild(link);
	// 		}
	// 	}
	// }, [open]); // Run this effect when the modal opens

	const { original_title, poster_path, trailer } = data;
	return (
		<>
			<div
				onMouseEnter={() => {
					mode === "home" ? setImgCount(index) : null;
				}}
				className={`mt-4 mx-auto  ${
					mode === "home"
						? "flex-shrink-0  text-white "
						: mode === "movieDetailTrailer"
						? "flex-shrink-0"
						: null
				}`}>
				<div
					onClick={handleClickOpen}
					className="relative hover:scale-105 duration-200 ease-in-out cursor-pointer ">
					<PlayCircleOutlineIcon
						fontSize="large"
						className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 "
					/>
					<img
						loading="lazy"
						className="w-[300px] rounded "
						src={`${baseImgUrl}/w355_and_h200_multi_faces${poster_path}`}
						alt={original_title}
					/>
				</div>

				<p className="text-center my-4 line-clamp-1 w-[80%] ">
					{original_title}
				</p>
			</div>

			<Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
				<div className="relative">
					<div className="flex justify-between items-center p-4 text-sm md:text-base">
						<p className="text-sm md:text-base ">Watch Trailer</p>
						<IconButton
							edge="end"
							color="inherit"
							onClick={handleClose}
							aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					{/* pb-[56.25%] is for a better aspect-ratio */}
					<div className="relative pb-[56.25%] ">
						{trailer[0] ? (
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src={`https://www.youtube.com/embed/${trailer[0]}`}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title="YouTube video player"></iframe>
						) : (
							<p className="text-center">No trailer available</p>
						)}
					</div>
				</div>
			</Dialog>
		</>
	);
}
export default TrailerContent;
