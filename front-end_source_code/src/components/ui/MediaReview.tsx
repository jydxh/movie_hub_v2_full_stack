import { Reviews } from "@/utils/types";
import { Link } from "react-router-dom";
import MediaReviewCard from "./MediaReviewCard";
import React from "react";

function CardWrapper({
	children,
	data,
}: {
	children: React.ReactNode;
	data?: Reviews;
}) {
	return (
		<section className="mt-4 p-4 ">
			<div className="flex justify-start items-end gap-x-20">
				<h3 className="font-semibold text-xl">Social</h3>
				<p className="font-semibold">
					Reviews <span className="font-light">{data?.total_results || 0}</span>
				</p>
			</div>
			{children}
		</section>
	);
}

function MediaReview({ data }: { data: Reviews }) {
	if (data.total_results > 0) {
		return (
			<CardWrapper data={data}>
				{data.results
					.filter((_, index) => index === data.results.length - 1)
					.map(result => (
						<MediaReviewCard data={result} key={result.id} />
					))}
				<div
					className={
						data.results.length > 1
							? "block mt-8 capitalize font-bold hover:text-gray-400"
							: "hidden"
					}>
					<Link to="reviews"> read all reviews</Link>
				</div>
			</CardWrapper>
		);
	} else {
		return (
			<CardWrapper>
				<div className="mt-4 p-4 ">
					We don't have any reviews yet. Would you like to write one?
				</div>
			</CardWrapper>
		);
	}
}
export default MediaReview;
