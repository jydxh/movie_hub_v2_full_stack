import { Form } from "react-router-dom";
import { Button } from "@mui/material";

function SearchInput() {
	return (
		<Form method="GET" action="/search" className="w-full mt-10">
			<div className="w-[90%] flex items-center overflow-hidden mx-auto">
				<input
					type="text"
					name="query"
					className="ms-[2.6rem] rounded-full w-full py-2 ps-4 outline-none text-black"
					placeholder="Search for a movie, tv show,person..."
				/>
				<Button
					type="submit"
					className="bg-teal-500 text-white hover:text-black rounded-full p-2 w-[6rem] h-[2.5rem] capitalize text-sm  md:text-lg relative -left-[39px]">
					Search
				</Button>
			</div>
		</Form>
	);
}
export default SearchInput;
