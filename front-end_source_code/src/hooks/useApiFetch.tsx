import { useState, useEffect, useCallback } from "react";
/* this is a hook to fetch the data for the home page */
import { SelectedOption } from "@/components/ui/SlidersWrapper";
function useApiFetch<T>(
	selectedOption: SelectedOption,
	apiFetchFn: (param: string) => Promise<T>
) {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | unknown>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const data = await apiFetchFn(selectedOption.searchParam);
			//console.log(data);
			setData(data);
		} catch (error) {
			console.error(error);
			setError(error);
		}
		setIsLoading(false);
	}, [selectedOption, apiFetchFn]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, error };
}
export default useApiFetch;
