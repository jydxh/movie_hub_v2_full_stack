import formateDate from "@/utils/formateDate";
import { baseImgUrl, ReviewsResult } from "@/utils/types";
import convertTxtIntoPara from "@/utils/convertTxtIntoPara";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export interface MediaReviewCardProps {
	data: ReviewsResult;
}

function MediaReviewCard({ data }: MediaReviewCardProps) {
	const { author, content, updated_at, url, author_details } = data;
	return (
		<div className="w-full border border-gray-200 shadow-lg mt-4 p-8 rounded-lg">
			<div className="flex items-center justify-start gap-x-4">
				{author_details.avatar_path && (
					<img
						src={`${baseImgUrl}/w90_and_h90_face/${author_details.avatar_path}`}
						alt={author}
						className="rounded-full border-2 w-[3.8rem] h-[3.8rem]"
					/>
				)}
				{!author_details.avatar_path && (
					<AccountCircleIcon className="rounded-full border-2 w-[3.8rem] h-[3.8rem]" />
				)}

				<div className="flex flex-col justify-center">
					<h5 className="font-bold text-xl">A review by {author}</h5>
					<p className="font-light text-sm">
						Written by <span className="font-bold">{author}</span> on{" "}
						{formateDate(updated_at)}
					</p>
				</div>
			</div>
			<article
				dangerouslySetInnerHTML={{
					__html: convertTxtIntoPara(content),
				}}
			/>
			{/* <p>{content}</p> */}
			<Button size="small" variant="text">
				<a href={url}>read the rest</a>
			</Button>
		</div>
	);
}
export default MediaReviewCard;
