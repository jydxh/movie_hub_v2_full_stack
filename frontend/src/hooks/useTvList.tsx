import MovieListCard from "@/components/Movie/MovieListCard";
import { TVResponse, TVResults } from "@/utils/types";
import { Divider } from "@mui/material";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router";
import MediaFilter from "@/components/ui/MediaFilter";
import fetchTvList from "@/api/fetchTvList";

const options = {
	//root: null,
	rootMargin: "200px",
	threshold: 0.1,
};

function useTvList(title: string) {
	const {
		results: initalResults,
		total_results,
		total_pages,
	} = useLoaderData() as TVResponse;
	const { pathname, search } = useLocation(); // /movie/popular, playing, upcoming, top_rated

	const searchParams = new URLSearchParams(search);
	const query = searchParams.get("with_genres") || undefined;

	const [results, setResults] = useState<TVResults[]>(initalResults);
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
			let params: "popular" | "arriving" | "on_Tv" | "top_rated" = "popular";
			if (pathname.includes("arriving")) params = "arriving";
			if (pathname.includes("on_Tv")) params = "on_Tv";
			if (pathname.includes("top_rated")) params = "top_rated";
			setIsLoading(true);
			const { results } = await fetchTvList(params, page.toString(), query);
			setResults(prev => [
				...prev,
				...results,
			]); /* get the fetched data and insert into results state */
			setIsLoading(false);
		},
		[pathname, query]
	);

	const ObserverCallBack = useCallback(
		/*  This callback is triggered when an intersection occurs between the observed element and the root element, as defined by the IntersectionObserver's options.*/
		(entries: IntersectionObserverEntry[]) => {
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
		<div className="grid grid-cols-1 md:flex md:gap-x-4 py-8 px-4">
			<MediaFilter mode="tv" />
			<div className="md:mt-0 mt-8 w-full">
				<h2 className="font-semibold tracking-wide text-2xl mb-4 capitalize">
					{title}
				</h2>
				<h3 className="mb-2">Total Results: {total_results}</h3>
				<Divider />
				<div className="mt-4">
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:place-content-center md:flex md:flex-wrap gap-6">
						{results.map(result => {
							const { id, poster_path, vote_average, name, first_air_date } =
								result;
							return (
								<MovieListCard
									id={id}
									type="tv"
									key={id + Math.random()}
									imgPath={poster_path}
									title={name}
									release_date={first_air_date}
									vote_average={vote_average}
								/>
							);
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
export default useTvList;
