import React from "react";
import { IconStyles } from "./css";
import { node, oneOfType, array, string } from "prop-types";

// Variants can be "small" or "large" refer to .css for stylings
const Icon = ({ children, iconColor, variants }) => {
  return (
    <IconStyles iconColor={iconColor} modifiers={variants}>
      {children}
    </IconStyles>
  );
};

Icon.propTypes = {
  children: node.isRequired,
  iconColor: string,
  variants: oneOfType([string, array]),
};

Icon.defaultProps = {
  iconColor: null,
};

export default Icon;
