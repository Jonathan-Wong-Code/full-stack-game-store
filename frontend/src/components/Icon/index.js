import React from 'react';
import { node, oneOfType, array, string } from 'prop-types';

import { IconStyles } from './css';

// Variants can be "small" or "large" refer to .css for stylings
const Icon = ({ children, iconColor, variants }) => (
  <IconStyles iconColor={iconColor} modifiers={variants}>
    {children}
  </IconStyles>
);

Icon.propTypes = {
  children: node.isRequired,
  iconColor: string,
  variants: oneOfType([string, array])
};

Icon.defaultProps = {
  iconColor: null,
  variants: null
};

export default Icon;
