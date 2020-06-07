import { useContext, createContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  return theme;
};
