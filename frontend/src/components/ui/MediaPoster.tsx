import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MediaImages, HomeLatestTrailer } from "@/utils/types";
import { useState } from "react";
import fetchMovieCustom from "@/api/MovieApi/fetchMovieCustom";
import fetchTvMulti from "@/api/TvApi/fetchTvMulti";
import MediaPosterCard from "./MediaPosterCard";
import TrailerContent from "../Videos/TrailerContent";

function MediaPoster({
	mode = "movie",
	trailers,
}: {
	mode?: "movie" | "tv";
	trailers?: string[] | undefined;
}) {
	const { id } = useParams();
	const [show, setShow] = useState<"backdrop" | "poster" | "trailers">(
		mode === "movie" ? "trailers" : "backdrop"
	);
	const { data, error, isPending, isError } = useQuery({
		queryKey: ["MovieOrTvImages", id],
		queryFn: async () => {
			if (mode === "movie")
				return await fetchMovieCustom({ id, mode: "images" });
			if (mode === "tv") return await fetchTvMulti({ id, mode: "images" });
			return Promise.resolve(null);
		},

		staleTime: 5 * 60 * 1000 /* 5 minnutes  */,
	});

	const handleBackDrop = () => {
		setShow("backdrop");
	};
	const handlePoster = () => {
		setShow("poster");
	};
	const handleTrailer = () => {
		setShow("trailers");
	};
	if (isError) {
		<p className="mx-auto text-center text-xl">Error: {error.message}</p>;
	}
	if (isPending) {
		<p className="mx-auto text-center text-xl">...Loading...</p>;
	}
	if (data) {
		const { backdrops, posters } = data as MediaImages;
		return (
			<section className="p-4">
				<div className="flex justify-start items-end gap-x-16">
					<h4 className="text-xl font-semibold">Media</h4>
					<div className="flex items-end justify-center gap-x-8">
						{mode === "movie" && trailers && (
							<button
								onClick={handleTrailer}
								className={`${
									show === "trailers" ? "" : "border-b-transparent"
								} border-b-2 font-semibold`}>
								Trailers <span className="font-thin">{trailers.length}</span>
							</button>
						)}

						<button
							onClick={handleBackDrop}
							className={`${
								show === "backdrop" ? "" : "border-b-transparent"
							} border-b-2 font-semibold`}>
							Backdrops <span className="font-thin">{backdrops.length}</span>
						</button>
						<button
							onClick={handlePoster}
							className={`${
								show === "poster" ? "" : "border-b-transparent"
							} border-b-2 font-semibold`}>
							Poster <span className="font-thin">{posters.length}</span>
						</button>
					</div>
				</div>
				{trailers ? (
					<div
						className={`${
							show === "trailers" ? "block " : "hidden "
						} rounded-t-lg border-1 overflow-x-scroll my-4 flex gap-x-4`}>
						{trailers.map((item, index) => {
							const posterPath = backdrops[index]
								? backdrops[index].file_path
								: backdrops[0].file_path;
							return (
								<TrailerContent
									key={item}
									data={
										{
											trailer: trailers,
											id: Number(Math.random().toFixed(4)),
											original_title: "trailer video",
											poster_path: posterPath,
										} as HomeLatestTrailer
									}
									index={index}
									mode="movieDetailTrailer"
									setImgCount={() => null}
								/>
							);
						})}
					</div>
				) : (
					<p className="p-4 capitalize"> no trailer avialble</p>
				)}

				<div
					className={`${
						show === "backdrop" ? "block " : "hidden "
					} rounded-t-lg border-1 overflow-x-scroll my-4 flex`}>
					{backdrops ? (
						backdrops.map(backdrop => (
							<MediaPosterCard data={backdrop} key={backdrop.file_path} />
						))
					) : (
						<p className="p-4 capitalize">no backdrop avialble</p>
					)}
				</div>
				<div
					className={`${
						show === "poster" ? "block " : "hidden "
					} rounded-t-lg border-1 overflow-x-scroll my-4 flex`}>
					{posters ? (
						posters.map(poster => (
							<MediaPosterCard data={poster} key={poster.file_path} />
						))
					) : (
						<p className="p-4 capitalize">no poster avialble</p>
					)}
				</div>
			</section>
		);
	}
}
export default MediaPoster;
