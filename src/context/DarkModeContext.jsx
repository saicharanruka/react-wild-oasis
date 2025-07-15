import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.remove("light-mode");
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
			document.body.classList.add("light-mode");
		}
	}, [isDarkMode]);

	function toggleDarkMode() {
		setIsDarkMode((i) => !i);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("useDarkMode must be used within a DarkModeProvider");
	return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
