import { CombinedCredits, Cast, Crew, baseImgUrl } from "@/utils/types";
import { Link } from "react-router-dom";

function MediaWrappepr({ title, item }: { title: string; item: Cast | Crew }) {
	return (
		<li
			key={item.id}
			className="flex items-center justify-center flex-col my-4 sm:my-0 flex-shrink-0">
			<Link
				className="flex flex-col items-center justify-center sm:justify-start sm:flex-col sm:my-4"
				to={`/${item.media_type === "movie" ? "movie" : "tv_show"}/${item.id}`}>
				<img
					src={`${baseImgUrl}/w300_and_h450_bestv2/${item.poster_path}`}
					alt={title}
					className="rounded-xl mb-2 block sm:h-[12rem] sm:w-[8rem] object-fit"
				/>
				<p className="text-xl sm:text-sm sm:w-[8rem] sm:h-[2.4rem] line-clamp-2">
					{title}
				</p>
			</Link>
		</li>
	);
}

function PersonKnowfor({
	known_for,
	credits,
}: {
	known_for: string;
	credits: CombinedCredits;
}) {
	let filteredCredits: (Cast | Crew)[];
	if (known_for === "Acting") {
		filteredCredits = credits.cast;
	} else {
		filteredCredits = credits.crew;
	}

	return (
		<div>
			<h4 className="font-semibold text-xl mt-8">Known For</h4>
			<ul className="sm:flex sm:flex-row flex-col sm:overflow-x-scroll gap-x-4">
				{filteredCredits
					.sort((a, b) => b.vote_average - a.vote_average)
					.filter((_, index) => index < 9)
					.map(item => {
						let title: string;
						if (item.media_type === "movie") {
							const { title: theTitle } = item as Cast;
							title = theTitle!;
							return <MediaWrappepr item={item} title={title} key={item.id} />;
						} else if (item.media_type === "tv") {
							const { name } = item as Cast;
							title = name!;
							return <MediaWrappepr item={item} title={title} key={item.id} />;
						}
					})}
			</ul>
		</div>
	);
}
export default PersonKnowfor;

// combined_credits, images
