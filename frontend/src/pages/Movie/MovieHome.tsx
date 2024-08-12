import { LoaderFunction, redirect } from "react-router";
/* this page does not render anything, it is re-direct the user to the popular route */
export const loader: LoaderFunction = () => {
	return redirect("popular");
};

function MovieHome() {
	return <div>MovieHome</div>;
}
export default MovieHome;
