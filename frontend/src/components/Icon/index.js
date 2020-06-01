import React from "react";
import { IconStyles } from "./css";
import { node, bool } from "prop-types";

const Icon = ({ children, primaryIcon }) => {
  return <IconStyles primaryIcon={primaryIcon}>{children}</IconStyles>;
};

Icon.proptypes = {
  children: node.isRequired,
  primaryIcon: bool,
};

Icon.defaultProps = {
  primaryIcon: false,
};

export default Icon;
