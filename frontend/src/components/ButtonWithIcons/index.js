import React from 'react';
import { func, string, array, oneOfType, number, bool } from 'prop-types';

import { PrimaryStyles, SecondaryStyles } from './css';
import IconComponent from '../Icon';

import useTheme from '../../hooks/useTheme';

export const PrimaryBtnWithIcon = ({
  Icon,
  buttonText,
  variants,
  tabIndex,
  disabled,
  handleClick
}) => {
  const theme = useTheme();
  return (
    <PrimaryStyles
      modifiers={variants}
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={handleClick}
    >
      <IconComponent iconColor={theme.textInverted}>
        <Icon />
      </IconComponent>
      <span>{buttonText}</span>
    </PrimaryStyles>
  );
};

PrimaryBtnWithIcon.propTypes = {
  Icon: func.isRequired,
  buttonText: string.isRequired,
  variants: oneOfType([string, array]),
  tabIndex: number,
  disabled: bool,
  handleClick: func.isRequired
};

PrimaryBtnWithIcon.defaultProps = {
  variants: null,
  tabIndex: 0,
  disabled: false
};

export const SecondaryBtnWithIcon = ({
  Icon,
  buttonText,
  variants,
  tabIndex,
  disabled,
  handleClick
}) => {
  return (
    <SecondaryStyles
      modifiers={variants}
      className="button-component"
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={handleClick}
    >
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
  tabIndex: number,
  disabled: bool,
  handleClick: func.isRequired
};

SecondaryBtnWithIcon.defaultProps = {
  variants: null,
  tabIndex: 0,
  disabled: false
};
