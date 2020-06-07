import React from "react";
import { func, string, bool } from "prop-types";

import { PrimaryStyles, SecondaryStyles } from "./css";
import IconComponent from "../Icon";
import { useThemeContext } from "../../context/themeContext";
// Todo props with theme...darkMode ? use defaultTheme else use darkMode
export const PrimaryIconButton = ({ Icon, buttonText }) => {
  const theme = useThemeContext();

  return (
    <PrimaryStyles>
      <IconComponent iconColor={theme.textInverted}>
        <Icon />
      </IconComponent>
      {buttonText}
    </PrimaryStyles>
  );
};

PrimaryIconButton.proptypes = {
  Icon: func.isRequired,
  primaryIcon: bool,
  buttonText: string.isRequired,
};

PrimaryIconButton.defaultProps = {
  primaryIcon: false,
};

export const SecondaryIconButton = ({ Icon, buttonText, variants }) => {
  return (
    <SecondaryStyles modifiers={variants}>
      <IconComponent>
        <Icon />
      </IconComponent>
      <span>{buttonText}</span>
    </SecondaryStyles>
  );
};

SecondaryIconButton.propTypes = {
  Icon: func.isRequired,
  buttonText: string.isRequired,
};
