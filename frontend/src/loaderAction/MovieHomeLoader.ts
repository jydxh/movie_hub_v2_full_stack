import { LoaderFunction, redirect } from "react-router";

export const MovieHomeLoader: LoaderFunction = () => {
	return redirect("popular");
};
