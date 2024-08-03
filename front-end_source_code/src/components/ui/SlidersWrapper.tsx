import { useState } from "react";
import Slider_Button from "./Slider_Button";
import { SliderCard } from "./SliderCard";
import useApiFetch from "@/hooks/useApiFetch";
import { TrendingAllResult, MovieResult } from "@/utils/types";
import FetchingSkeleton from "./FetchingSkeleton";

export interface SelectedOption {
	title: string;
	searchParam: string;
}
interface SliderProps {
	title: string;
	options: SelectedOption[];
	fetchFunction: (
		param: string
	) => Promise<TrendingAllResult[] | MovieResult[]>;
}

function SlidersWrapper({ title, options, fetchFunction }: SliderProps) {
	const [selectedOption, setSelectedOption] = useState<SelectedOption>(
		options[0]
	);

	const { data, isLoading, error } = useApiFetch<
		TrendingAllResult[] | MovieResult[]
	>(selectedOption, fetchFunction);

	return (
		<section className="max-w-[1400px] mx-auto p-8">
			<div className="flex gap-x-2 md:gap-x-6 items-center">
				<h4 className="capitalize font-bold text-xl">{title}</h4>
				<Slider_Button
					isLoading={isLoading}
					options={options}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
				/>
			</div>

			<div className="max-w-[1400px] overflow-x-scroll flex justify-start items-center custom-scrollbar   gap-x-6">
				{data !== null ? (
					<SliderCard data={data} />
				) : error ? (
					"load page failed"
				) : (
					<FetchingSkeleton />
				)}
			</div>
		</section>
	);
}
export default SlidersWrapper;
