import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Error() {
	const navigate = useNavigate();
	return (
		<div className="grid place-content-center w-[100vw] h-[100vh] text-red-500 text-center ">
			<p className="text-3xl">Error: 404</p>
			<p className="text-3xl">Cannot find the page, please try again</p>
			<Button
				onClick={() => {
					navigate(-1);
				}}
				className="capitalize mt-4"
				size="large"
				variant="outlined"
				color="success">
				Go Back
			</Button>
		</div>
	);
}
export default Error;
