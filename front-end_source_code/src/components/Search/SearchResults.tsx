import SearchContentCard from "@/components/ui/SearchContentCard";
import { MovieResult, PersonResult, TVResults } from "@/utils/types";
import SearchPeopleCard from "./SearchPeopleCard";

function SearchResults({
	results,
}: {
	results: (MovieResult | PersonResult | TVResults)[];
}) {
	const isMovieResult = (
		result: MovieResult | PersonResult | TVResults
	): result is MovieResult => result.media_type === "movie";
	const isPersonResult = (
		result: MovieResult | PersonResult | TVResults
	): result is PersonResult => result.media_type === "person";
	const isTVResult = (
		result: MovieResult | PersonResult | TVResults
	): result is TVResults => result.media_type === "tv";

	//console.log(results);
	return (
		<div>
			{results.map(result => {
				if (isMovieResult(result)) {
					const { id, overview, poster_path, release_date, title } = result;
					return (
						<SearchContentCard
							type="movie"
							key={id}
							id={id}
							overview={overview}
							poster={poster_path}
							release_date={release_date}
							title={title}
						/>
					);
				} else if (isPersonResult(result)) {
					const {
						id,
						name,
						known_for_department: department,
						profile_path,
						gender,
						known_for,
					} = result;
					return (
						<SearchPeopleCard
							id={id}
							key={id}
							poster={profile_path}
							name={name}
							gender={gender}
							department={department}
							known_for={known_for}
						/>
					);
				}
				if (isTVResult(result)) {
					const { id, overview, poster_path, first_air_date, original_name } =
						result;
					return (
						<SearchContentCard
							key={id}
							id={id}
							type="tv"
							overview={overview}
							poster={poster_path}
							release_date={first_air_date}
							title={original_name}
						/>
					);
				}
			})}
		</div>
	);
}
export default SearchResults;
