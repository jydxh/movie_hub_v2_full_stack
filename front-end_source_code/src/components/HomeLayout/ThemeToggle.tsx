import { useContext } from "react";
import { ThemeContext } from "@/feature/Theme/ThemeContextProvider";
import { Button } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function ThemeToggle() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<div>
			<Button onClick={toggleTheme}>
				{theme === "dark" ? <DarkModeIcon /> : <WbSunnyIcon />}
			</Button>
		</div>
	);
}
export default ThemeToggle;
