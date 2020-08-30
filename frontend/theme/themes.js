import { green, purple, neutral, black, white, red } from './colors';
import { typeWeight, typeScale } from './typography';
import { breakpoints } from './breakpoints';
import spacing from './spacing';

export const defaultTheme = {
  primaryColor: purple[200],
  primaryLight: purple[100],
  primaryDark: purple[300],
  secondaryColor: green[200],
  secondaryLight: green[100],
  secondaryDark: green[300],
  disabledColor: neutral[400],
  textColor: neutral[600],
  textColorLight: neutral[500],
  textInverted: neutral[100],
  contentBackgroundLight: neutral[100],
  contentBackground: neutral[300],
  lightGrey: neutral[200],
  grey: neutral[300],
  darkGrey: neutral[500],
  errorRed: red[100],
  bodyBackground: neutral[200],
  black,
  white,
  dividerColor: neutral[300],
  breakpoints,
  spacing,
  typeWeight,
  typeScale
};
