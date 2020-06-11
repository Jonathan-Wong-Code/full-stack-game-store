import React from 'react';
import { func, string, oneOfType, array } from 'prop-types';

import ScreenReaderOnly from '../ScreenReaderOnly';
import IconComponent from '../Icon';
import { Button } from './css';

import useTheme from '../../hooks/useTheme';

// Look in ./css.js for variants = the modifiers.
const IconButton = ({ Icon, onClick, description, variants }) => {
  const theme = useTheme();
  return (
    <Button onClick={onClick} modifiers={variants}>
      <ScreenReaderOnly>{description}</ScreenReaderOnly>
      <IconComponent iconColor={theme.textInverted}>
        <Icon />
      </IconComponent>
    </Button>
  );
};

IconButton.propTypes = {
  Icon: func.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  variants: oneOfType([string, array])
};

IconButton.defaultProps = {
  variants: null
};
export default IconButton;
