import MovieListCard from "@/components/Movie/MovieListCard";
import {
	MovieListResult,
	TvListResult,
	TvListResponse,
	MovieListResponse,
} from "@/utils/types";
import { Divider } from "@mui/material";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router";
import fetchMovieList from "@/api/fetchMovieList";
import fetchTvList from "@/api/fetchTvList";
import MediaFilter from "@/components/ui/MediaFilter";

const options = {
	//root: null,
	rootMargin: "200px",
	threshold: 0.1,
};

function useMediaList(title: string, mode: "tv" | "movie") {
	const {
		results: initalResults,
		total_results,
		total_pages,
	} = useLoaderData() as MovieListResponse | TvListResponse;
	const { pathname, search } = useLocation();

	const searchParams = new URLSearchParams(search);
	const query = searchParams.get("with_genres") || undefined;

	const [results, setResults] =
		useState<(MovieListResult | TvListResult)[]>(initalResults);
	const [isLoading, setIsLoading] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);
	const divRef = useRef<HTMLDivElement | null>(null);
	const pageRef = useRef<number>(2);
	const [isInfiniteScrollEnabled, setIsInfiniteScrollEnabled] = useState(false);

	const handleLoadMore = () => {
		setIsInfiniteScrollEnabled(true);
	};

	/* the fetchData funtion for the infinity fetching  */
	const fetchData = useCallback(
		async (page: number) => {
			let movieParams: "popular" | "now_playing" | "upcoming" | "top_rated" =
				"popular";
			if (pathname.includes("playing")) movieParams = "now_playing";
			if (pathname.includes("upcoming")) movieParams = "upcoming";
			if (pathname.includes("top_rated")) movieParams = "top_rated";

			let tvParams: "popular" | "arriving" | "on_Tv" | "top_rated" = "popular";
			if (pathname.includes("arriving")) tvParams = "arriving";
			if (pathname.includes("on_Tv")) tvParams = "on_Tv";
			if (pathname.includes("top_rated")) tvParams = "top_rated";
			setIsLoading(true);

			if (mode === "movie") {
				const { results } = await fetchMovieList(
					movieParams,
					page.toString(),
					query
				);
				setResults(prev => [
					...prev,
					...(results as MovieListResult[]),
				]); /* get the fetched data and insert into results state */
			}

			if (mode === "tv") {
				const { results } = await fetchTvList(tvParams, page.toString(), query);
				setResults(prev => [
					...prev,
					...results,
				]); /* get the fetched data and insert into results state */
			}

			setIsLoading(false);
		},
		[pathname, query, mode]
	);

	const ObserverCallBack = useCallback(
		/*  This callback is triggered when an intersection occurs between the observed element and the root element, as defined by the IntersectionObserver's options.*/
		(entries: IntersectionObserverEntry[]) => {
			console.log(pageRef.current);
			const target = entries[0];
			if (target.isIntersecting && !isLoading && !isLastPage) {
				if (pageRef.current <= total_pages) {
					fetchData(pageRef.current);
					pageRef.current++;
				} else {
					setIsLastPage(true);
				}
			}
		},
		[isLoading, total_pages, fetchData, isLastPage]
	);

	useEffect(() => {
		const currentDivRef = divRef.current;
		console.log(currentDivRef);
		if (isInfiniteScrollEnabled) {
			const observer = new IntersectionObserver(ObserverCallBack, options); // using the IntersectionObserver API to kind of like add event listener when the window moves to the some point of the viewport, the callbackfuntion will be triggered
			if (currentDivRef) {
				observer.observe(currentDivRef); // use the div with the divRef as the reference to trigger the callbackfunntion
			}

			return () => {
				if (currentDivRef) {
					observer.unobserve(currentDivRef);
				}
			};
		}
	}, [ObserverCallBack, isInfiniteScrollEnabled]);

	return (
		<div className="grid grid-cols-1 md:flex md:gap-x-4 py-8 px-4 ">
			<MediaFilter mode="movie" />
			<div className="md:mt-0 mt-8 w-full">
				<h2 className="font-semibold tracking-wide text-2xl mb-4 capitalize">
					{title}
				</h2>
				<h3 className="mb-2">Total Results: {total_results}</h3>
				<Divider />
				<div className="mt-4">
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:place-content-center md:flex md:flex-wrap gap-6">
						{results.map(result => {
							if (Object.prototype.hasOwnProperty.call(result, "title")) {
								const { id, poster_path, release_date, title, vote_average } =
									result as MovieListResult;
								return (
									<MovieListCard
										type="movie"
										id={id}
										key={id + Math.random()}
										imgPath={poster_path}
										title={title}
										release_date={release_date}
										vote_average={vote_average}
									/>
								);
							} else if (Object.prototype.hasOwnProperty.call(result, "name")) {
								const { id, poster_path, vote_average, name, first_air_date } =
									result as TvListResult;
								return (
									<MovieListCard
										type="tv"
										id={id}
										key={id + Math.random()}
										imgPath={poster_path}
										title={name}
										release_date={first_air_date}
										vote_average={vote_average}
									/>
								);
							}
						})}
					</ul>

					<div
						ref={divRef}
						className="mx-auto mt-8 text-center font-serif text-xl">
						{isLoading && <p>Loading more items...</p>}
					</div>
					{!isInfiniteScrollEnabled && total_pages !== 1 && (
						<div>
							<button
								onClick={handleLoadMore}
								className="font-bold text-xl w-full bg-cyan-500 hover:bg-cyan-400 p-2 mt-8 rounded-lg">
								Load More
							</button>
						</div>
					)}
					{isLastPage && !isLoading && total_pages !== 1 && (
						<div className="font-bold mx-auto text-center text-xl w-full bg-cyan-500 p-2 mt-8 rounded-lg cursor-pointer">
							End of the List
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default useMediaList;

//Step1: logic for the inifinity pagination by using the useFetcher from react-router dom:
//Step2:  update the loader funtion to accept a dynamic ${page}, from the URL,
//Step3:  when scroll down trigger the observe call backfuntion, 1. pageRef.current value ++ ; 2. update the url serach params page into the pageRef.current value
//Step4: since the url has updated the page, we can call the fetcher.load(${currentLocation}) at the oberserCallback logic to trigger the loader funtion so we can get the loader data,
//Last step not sure, if react router dom will automatically handling the appending the data and render the page, or i have to manually append the loader data into the result state.  I guess it will return the current page data, and i should manually append it into the result state.
// using the approach above can help for the user back to prev url also back to the position they were, instead of the top of the page
