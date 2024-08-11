import { HomeLatestTrailer } from "@/utils/types";
import { baseImgUrl } from "@/utils/types";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const { original_title, poster_path, trailer } = data;
	return (
		<>
			<div
				onMouseEnter={() => {
					mode === "home" ? setImgCount(index) : null;
				}}
				className={`mt-4  ${
					mode !== "trailerPage" ? "flex-shrink-0  text-white " : null
				}`}>
				<div
					onClick={handleClickOpen}
					className="relative hover:scale-105 duration-200 ease-in-out cursor-pointer ">
					<PlayCircleOutlineIcon
						fontSize="large"
						className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 "
					/>
					<img
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
						<iframe
							className="absolute top-0 left-0 w-full h-full"
							src={`https://www.youtube.com/embed/${trailer[0]}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="YouTube video player"></iframe>
					</div>
				</div>
			</Dialog>
		</>
	);
}
export default TrailerContent;
