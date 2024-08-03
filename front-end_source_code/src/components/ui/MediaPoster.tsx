import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MediaImages, baseImgUrl } from "@/utils/types";
import { useState } from "react";
import fetchMovieCustom from "@/api/MovieApi/fetchMovieCustom";
import fetchTvMulti from "@/api/TvApi/fetchTvMulti";

function MediaPoster({ mode = "movie" }: { mode?: "movie" | "tv" }) {
	const { id } = useParams();
	const [show, setShow] = useState<"backdrop" | "poster">("backdrop");
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

				<div
					className={`${
						show === "backdrop" ? "block " : "hidden "
					} rounded-t-lg border-1 overflow-x-scroll my-4 flex`}>
					{backdrops.map(backdrop => {
						const { file_path } = backdrop;
						return (
							<a
								key={file_path}
								href={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
								className="block h-[18rem] flex-shrink-0"
								rel="noopener noreferrer"
								target="_blank">
								<img
									src={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
									className="h-[18rem]  w-auto"
								/>
							</a>
						);
					})}
				</div>
				<div
					className={`${
						show === "poster" ? "block " : "hidden "
					} rounded-t-lg border-1 overflow-x-scroll my-4 flex`}>
					{posters.map(poster => {
						const { file_path } = poster;
						return (
							<a
								key={file_path}
								href={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
								className="block h-[18rem] flex-shrink-0"
								rel="noopener noreferrer"
								target="_blank">
								<img
									key={file_path}
									src={`${baseImgUrl}/original/${file_path}`}
									className="h-[18rem]  w-auto object-contain"
								/>
							</a>
						);
					})}
				</div>
			</section>
		);
	}
}
export default MediaPoster;
