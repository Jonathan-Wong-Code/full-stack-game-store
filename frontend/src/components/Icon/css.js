import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

import spacing from '../../../theme/spacing';

const ICON_MODIFIERS = {
  large: () => `
  & svg {
    width: 55px;
    height: 50px;
  }

`,
  small: () => `
    & svg {
      width: 25px;
      height: 30px;
      padding: 2px;
    }  
  `
};

export const IconStyles = styled.div`
  border-radius: 5px;
  display: inline-block;

  & svg {
    width: 40px;
    height: 35px;
    border-radius: 5px;
    padding: ${spacing[1]};
    fill: ${({ iconColor, theme }) => iconColor || theme.textInverted};
  }
  ${applyStyleModifiers(ICON_MODIFIERS)}
`;
