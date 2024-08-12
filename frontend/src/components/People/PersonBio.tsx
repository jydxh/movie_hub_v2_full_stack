import { useState } from "react";

function PersonBio({ biography }: { biography: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<h4 className="text-xl font-semibold mb-4">Biography</h4>
			<article
				className={`leading-8 text-start ${isExpanded ? "" : "line-clamp-4"}`}>
				{biography && biography.length > 1
					? biography
					: "None biography available yet!"}
			</article>
			{biography.length > 200 && (
				<button
					className="mt-2 text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
					onClick={toggleExpansion}>
					{isExpanded ? "Show Less" : "Read More"}
				</button>
			)}
		</section>
	);
}
export default PersonBio;
