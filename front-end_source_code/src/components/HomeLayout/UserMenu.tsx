import { Button, Menu, MenuItem } from "@mui/material";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface UserMenuProps {
	children: ReactNode;
	handlelogout: () => Promise<void>;
}

function UserMenu({ children, handlelogout }: UserMenuProps) {
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
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				className="capitalize">
				{children}
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				<MenuItem onClick={handleClose}>
					<Link to="/user/profile">Profile</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handlelogout}>Logout</MenuItem>
			</Menu>
		</>
	);
}
export default UserMenu;
