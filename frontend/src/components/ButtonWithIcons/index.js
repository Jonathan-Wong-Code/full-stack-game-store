import React from "react";
import { func, string, bool } from "prop-types";

import { PrimaryStyles, SecondaryStyles } from "./css";
import IconComponent from "../Icon";

export const PrimaryIconButton = ({ Icon, primaryIcon, buttonText }) => {
  return (
    <PrimaryStyles>
      <IconComponent primaryIcon={primaryIcon}>
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
