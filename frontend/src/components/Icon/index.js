import React from "react";
import { IconStyles } from "./css";
import { node, bool } from "prop-types";

const Icon = ({ children, iconColor }) => {
  return <IconStyles iconColor={iconColor}>{children}</IconStyles>;
};

Icon.proptypes = {
  children: node.isRequired,
  primaryIcon: bool,
};

Icon.defaultProps = {
  primaryIcon: false,
};

export default Icon;
