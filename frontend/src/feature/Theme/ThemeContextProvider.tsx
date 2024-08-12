import { createContext, useState, ReactNode, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type Theme = "dark" | "light";

export const ThemeContext = createContext({ theme: "", toggleTheme: () => {} });

function ThemeContextProvider({ children }: { children: ReactNode }) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const [theme, setTheme] = useState<Theme>(prefersDarkMode ? "dark" : "light");

	const toggleTheme = () => {
		setTheme(prev => (prev === "dark" ? "light" : "dark"));
	};

	const currentTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: theme,
				},
			}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ThemeProvider theme={currentTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
export default ThemeContextProvider;
