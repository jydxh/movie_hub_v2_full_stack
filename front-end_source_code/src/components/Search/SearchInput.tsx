import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Button, useTheme, TextField } from "@mui/material";

import searchKeywordQuery from "@/api/searchKeywordQuery";
import { useQuery } from "@tanstack/react-query";
import fetchTrendingAll from "@/api/fetchTrendingAll";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { SearchKeywordResponse } from "@/utils/types";

function SearchInput() {
	const theme = useTheme();
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(search);
	const value = params.get("query") || "";
	const [inputValue, setInputValue] = useState(value);
	const [keywordsData, setKeyWordsData] = useState<
		undefined | SearchKeywordResponse
	>();
	const [showKeyWord, setShowKeyWord] = useState(false);
	const searchKeywordRef = useRef(value);
	const { data } = useQuery({
		queryKey: ["searchKeyword", inputValue],
		queryFn: async () => await fetchTrendingAll("day"),
		enabled: inputValue === "", // only fetch when inital input is empty
	});

	// logic here: when user focus in the Input, the suggestion will fetch the trending all('day'), and show the name in the UI, and with the user keep typing, the useEffect will debounced every key stroke and wait for 0.5s to fetch the keywords data from the api, and if user click one of the options, the content will be automatically add as the inputValue and then do the handleSubmit programmly
	// also, for better UX, the url query value should be two-way bind with the input value;
	const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === "Enter") {
			params.set("query", inputValue || "");
			params.set("page", "1");
			navigate(`${pathname}?${params.toString()}`);
		}
	};
	const handleSubmit = () => {
		params.set("query", inputValue || "");
		params.set("page", "1");
		navigate(`${pathname}?${params.toString()}`);
	};
	const handleSetSearch = (
		evt: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		//console.log(evt.currentTarget.innerText);
		const serachTerm = evt.currentTarget.innerText;
		setInputValue(serachTerm);
		searchKeywordRef.current = serachTerm;
		navigate(`/search?query=${searchKeywordRef.current}`);
	};

	useEffect(() => {
		//debouncer
		const timer = setTimeout(async () => {
			const res = await searchKeywordQuery({ query: inputValue || "" });
			//	console.log(res);
			setKeyWordsData(res);
		}, 500);
		return () => clearTimeout(timer);
	}, [inputValue]);

	const displayData = data ? data.slice(0, 10) : undefined; // to trim the trending data into first 10 only, to prevent too long list

	return (
		<div className="relative">
			<div className="border-b p-2 flex items-center gap-x-2">
				<SearchIcon />
				{/* 
				<input
					autoComplete="off"
					onFocus={() => {
						setShowKeyWord(true);
					}}
					onBlur={() => {
						// add 100ms delay to make sure searchKeywordRef can get the value
						setTimeout(() => {
							setShowKeyWord(false);
						}, 100);
					}}
					onChange={evt => {
						setInputValue(evt.currentTarget.value);
					}}
					onKeyDown={handleKeyDown}
					value={inputValue}
					type="search"
					name="query"
					placeholder="Seach for a movie, tv show, person"
					className="border border-gray-400 bg-gray-500 text-white px-4 py-1 w-full rounded italic"
				/>
				 */}
				<TextField
					id="outlined-basic"
					variant="outlined"
					className="borderpx-4 py-1 w-full rounded italic"
					size="small"
					autoComplete="off"
					onFocus={() => {
						setShowKeyWord(true);
					}}
					onBlur={() => {
						// add 100ms delay to make sure searchKeywordRef can get the value
						setTimeout(() => {
							setShowKeyWord(false);
						}, 100);
					}}
					onChange={evt => {
						setInputValue(evt.currentTarget.value);
					}}
					onKeyDown={handleKeyDown}
					value={inputValue}
					type="search"
					name="query"
					placeholder="Seach for a movie, tv show, person"
				/>
				<Button onClick={handleSubmit}>Search</Button>
			</div>
			<Box
				sx={{
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
				}}
				component="div"
				className={`${showKeyWord ? "block" : "hidden"} p-4 absolute w-full`}>
				{displayData && (
					<>
						<p className="font-bold text-xl border-b p-1">
							<TrendingUpIcon /> Trending
						</p>
						<ul>
							{displayData.map(item => (
								<li
									onMouseDown={handleSetSearch}
									key={item.id}
									className="border-b p-1 hover:bg-gray-400 cursor-pointer">
									<ManageSearchIcon />
									<span className="ps-2">
										{item.media_type === "movie" ? item.title : item.name}
									</span>
								</li>
							))}
						</ul>
					</>
				)}
				{keywordsData && (
					<ul>
						{keywordsData.results
							.filter((_, index) => index < 10)
							.map(result => (
								<li
									onMouseDown={handleSetSearch}
									key={result.id}
									className="border-b p-1 hover:bg-gray-400 cursor-pointer">
									<ManageSearchIcon />
									<span className="ps-2">{result.name}</span>
								</li>
							))}
					</ul>
				)}
			</Box>
		</div>
	);
}
export default SearchInput;
