import { LoaderFunction, redirect } from "react-router";

export const loader: LoaderFunction = () => {
	return redirect("popular");
};

function TvHome() {
	return <div>TvHome</div>;
}
export default TvHome;
