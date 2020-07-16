import React from 'react';
import { func, string, array, oneOfType, number } from 'prop-types';

import { PrimaryStyles, SecondaryStyles } from './css';
import IconComponent from '../Icon';

import useTheme from '../../hooks/useTheme';

export const PrimaryBtnWithIcon = ({
  Icon,
  buttonText,
  variants,
  tabIndex
}) => {
  const theme = useTheme();
  return (
    <PrimaryStyles modifiers={variants} tabIndex={tabIndex}>
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
  tabIndex: number
};

PrimaryBtnWithIcon.defaultProps = {
  variants: null,
  tabIndex: 0
};

export const SecondaryBtnWithIcon = ({
  Icon,
  buttonText,
  variants,
  tabIndex
}) => {
  return (
    <SecondaryStyles
      modifiers={variants}
      className="button-component"
      tabIndex={tabIndex}
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
  tabIndex: number
};

SecondaryBtnWithIcon.defaultProps = {
  variants: null,
  tabIndex: 0
};
