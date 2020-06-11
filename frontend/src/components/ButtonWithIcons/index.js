import React from "react";
import { func, string, array, oneOfType } from "prop-types";

import { PrimaryStyles, SecondaryStyles } from "./css";
import IconComponent from "../Icon";

import useTheme from "../../hooks/useTheme";

export const PrimaryBtnWithIcon = ({ Icon, buttonText, variants }) => {
  const theme = useTheme();
  return (
    <PrimaryStyles modifiers={variants}>
      <IconComponent iconColor={theme.textInverted}>
        <Icon />
      </IconComponent>
      {buttonText}
    </PrimaryStyles>
  );
};

PrimaryBtnWithIcon.propTypes = {
  Icon: func.isRequired,
  buttonText: string.isRequired,
  variants: oneOfType([string, array]),
};

PrimaryBtnWithIcon.defaultProps = {
  variants: null,
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
  variants: oneOfType([string, array]),
};

SecondaryBtnWithIcon.defaultProps = {
  variants: null,
};
