import React from "react";
import { IconStyles } from "./css";
import { node, bool } from "prop-types";

// Variants can be "small" or "large" refer to .css for stylings
const Icon = ({ children, iconColor, variants }) => {
  return (
    <IconStyles iconColor={iconColor} modifiers={variants}>
      {children}
    </IconStyles>
  );
};

Icon.proptypes = {
  children: node.isRequired,
  primaryIcon: bool,
};

Icon.defaultProps = {
  primaryIcon: false,
};

export default Icon;
