import { Link } from "react-router-dom";
import { links } from "@/utils/links";
import { Button } from "@mui/material";

function NavInline() {
	return (
		<div className="hidden md:flex gap-x-2 justify-center items-center">
			{links.map(link => {
				return (
					<Button key={link.name}>
						<Link className="capitalize text-lg" to={link.to}>
							{link.name}
						</Link>
					</Button>
				);
			})}
		</div>
	);
}
export default NavInline;
