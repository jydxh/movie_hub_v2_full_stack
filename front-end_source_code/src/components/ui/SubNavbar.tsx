import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
type SubNavbarProps = {
	list: { to: string; label: string }[];
};

const LinkBaseCss = " text-semibold";

function SubNavbar({ list }: SubNavbarProps) {
	return (
		<>
			<div className="mt-8 mb-6">
				<ul className="flex gap-x-4 md:gap-x-12 lg:gap-x-16 justify-center items-center">
					{list.map(i => {
						const { label, to } = i;
						return (
							<li key={to} className="capitalize hover:text-orange-600">
								<NavLink
									to={to}
									className={({ isActive }) =>
										`${isActive && "text-orange-600 "}${LinkBaseCss}`
									}>
									{label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<Divider />
		</>
	);
}
export default SubNavbar;
