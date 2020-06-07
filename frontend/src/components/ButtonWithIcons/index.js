import React, { useContext } from "react";
import { func, string, bool } from "prop-types";

import { PrimaryStyles, SecondaryStyles } from "./css";
import IconComponent from "../Icon";
import { ThemeContext } from "styled-components";

export const PrimaryBtnWithIcon = ({ Icon, buttonText, variants }) => {
  const theme = useContext(ThemeContext);

  return (
    <PrimaryStyles modifiers={variants}>
      <IconComponent iconColor={theme.textInverted}>
        <Icon />
      </IconComponent>
      {buttonText}
    </PrimaryStyles>
  );
};

PrimaryBtnWithIcon.proptypes = {
  Icon: func.isRequired,
  primaryIcon: bool,
  buttonText: string.isRequired,
};

PrimaryBtnWithIcon.defaultProps = {
  primaryIcon: false,
};

export const SecondaryBtnWithIcon = ({ Icon, buttonText, variants }) => {
  return (
    <SecondaryStyles modifiers={variants}>
      <IconComponent>
        <Icon />
      </IconComponent>
      <span>{buttonText}</span>
    </SecondaryStyles>
  );
};

SecondaryBtnWithIcon.propTypes = {
  Icon: func.isRequired,
  buttonText: string.isRequired,
};
