import fetchMovieCustom from "@/api/MovieApi/fetchMovieCustom";
import { LoaderFunction, useLoaderData } from "react-router";
import { MediaImages, Backdrop, baseImgUrl } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

import { Skeleton } from "@mui/material";

function LazyImage({
	className,
	src,
	alt,
}: {
	className: string;
	src: string;
	alt: string;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const divRefCurrent = divRef.current;

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.unobserve(entry.target); // Stop observing once loaded
					}
				});
			},
			{
				threshold: 0,
				rootMargin: "0px -250px 0px 0px", // set me -250px, so even when user internet slow, the whole img list wont be loaded
			}
		);
		if (divRefCurrent) {
			observer.observe(divRefCurrent);
		}

		return () => {
			if (divRefCurrent) {
				observer.unobserve(divRefCurrent);
			}
		};
	}, []);

	return (
		<div ref={divRef}>
			{isVisible ? (
				<img src={src} alt={alt} className={className} />
			) : (
				<Skeleton
					height={400}
					width={710}
					className="grid place-content-center">
					loading...
				</Skeleton>
			)}
		</div>
	);
}

function LazyLoadImgList() {
	const backdrops = useLoaderData() as Backdrop[];
	return (
		<div className="mx-auto mt-10 flex w-[1200px] h-[26rem] bg-slate-200 overflow-x-scroll">
			{backdrops.map((item, index) => {
				const { file_path } = item;
				if (index < 3) {
					return (
						<div className="flex-shrink-0">
							<img
								className="h-[25rem]"
								src={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
								alt="img"
								key={file_path}
							/>
						</div>
					);
				}
				return (
					<div className="flex-shrink-0">
						<LazyImage
							className="h-[25rem]"
							key={file_path}
							src={`${baseImgUrl}/w1066_and_h600_bestv2/${file_path}`}
							alt="img"
						/>
					</div>
				);
			})}
		</div>
	);
}
export default LazyLoadImgList;

export const loader: LoaderFunction = async () => {
	try {
		const res = (await fetchMovieCustom({ mode: "images" })) as MediaImages;
		console.log(res);
		return res.backdrops;
	} catch (err) {
		console.log(err);
		return null;
	}
};
