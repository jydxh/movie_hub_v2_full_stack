import { LoaderFunction, redirect } from "react-router";

export const TvHomeLoader: LoaderFunction = () => {
	return redirect("popular");
};
