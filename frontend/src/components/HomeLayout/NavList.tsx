import { Button, Menu, MenuItem, Fade } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { links } from "@/utils/links";
import { Link } from "react-router-dom";

function NavList() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Button
				id="fade-button"
				aria-controls={open ? "fade-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}>
				<MenuIcon />
			</Button>
			<Menu
				id="fade-menu"
				MenuListProps={{
					"aria-labelledby": "fade-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}>
				{links.map(link => {
					const { name, to } = link;
					return (
						<MenuItem key={name} onClick={handleClose}>
							<Link className="capitalize" to={to}>
								{name}
							</Link>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
}
export default NavList;
