import SubNavbar from "@/components/ui/SubNavbar";
import { Outlet } from "react-router";

const tvSubNavLink = [
	{ to: "popular", label: "popular" },
	{ to: "arriving", label: "Arriving Today" },
	{ to: "on_Tv", label: "on Tv" },
	{ to: "top_rated", label: "top rated" },
];

function TvLayout() {
	return (
		<div>
			<SubNavbar list={tvSubNavLink} />
			<Outlet />
		</div>
	);
}
export default TvLayout;
