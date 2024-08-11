import { Form, useLocation, useNavigate } from "react-router-dom";
import fetchGenres from "@/api/fetchGenres";
import { Genre } from "@/utils/types";
import SelectableButton from "@/components/Movie/SelectableButton";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

function MediaFilter({ mode }: { mode: "movie" | "tv" }) {
	const { pathname, search } = useLocation();

	const queryParams = new URLSearchParams(search);
	const intialGenres =
		queryParams.get("with_genres")?.split(",").map(Number) || [];
	const [data, setData] = useState<Genre[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [genres, setGenres] = useState<number[]>(intialGenres);
	const navigate = useNavigate();

	const handleClick = (id: number) => {
		if (genres.includes(id)) {
			setGenres(prev => {
				return prev.filter(item => item !== id);
			});
		} else {
			setGenres(prev => [...prev, id]);
		}
	};

	const handleReset = () => {
		setGenres([]);
	};
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await fetchGenres({ mode });
				//console.log(data);
				setData(data);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [mode]);

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const with_genres = genres.join(",");

		navigate(pathname + "?with_genres=" + with_genres);
	};
	return (
		<div className="border rounded shadow-xl w-full md:w-[18rem] p-4 h-full">
			<Form method="GET" onSubmit={handleSubmit}>
				<div>
					<label className="font-thin">Genres</label>
					{data && (
						<div className="mt-4 flex gap-4 flex-wrap">
							{data.map(item => {
								return (
									<SelectableButton
										onClick={handleClick}
										key={item.id}
										id={item.id}
										genres={genres}>
										{item.name}
									</SelectableButton>
								);
							})}
						</div>
					)}
					{isLoading && !data && <div> fetching data!</div>}
				</div>
				<div className="mt-8 flex justify-center">
					<Button
						disabled={genres.length === 0}
						type="submit"
						className="w-full rounded-full bg-teal-500 text-white hover:bg-teal-600 disabled:bg-slate-500">
						Search
					</Button>
				</div>
				<div className="mt-4 flex justify-center">
					<Button
						disabled={genres.length === 0}
						type="button"
						onClick={handleReset}
						className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-slate-500">
						Reset
					</Button>
				</div>
			</Form>
		</div>
	);
}
export default MediaFilter;
