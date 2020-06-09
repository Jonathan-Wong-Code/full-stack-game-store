import { useContext } from "react";
import { ThemeContext } from "styled-components";

const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("Theme must be used within Theme Provider");
  }

  return theme;
};

export default useTheme;
