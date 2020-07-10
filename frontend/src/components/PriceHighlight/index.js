import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';
const MODIFIERS = {
  large: () => `
    font-size:${typeScale.header3};
    padding: ${spacing[2]} ${spacing[6]};

    @media screen and (min-width: ${breakpoints[2]}px) {
      font-size:${typeScale.header1};
    }
  `
};

export const PriceHighlight = styled.p`
  display: inline-block;
  border-radius: 5px;

  font-size: ${typeScale.paragraph};
  font-weight: ${typeWeight.bold};

  color: ${({ theme }) => theme.textInverted};
  background-color: ${({ theme }) => theme.primaryColor};

  padding: ${spacing[2]};

  ${applyStyleModifiers(MODIFIERS)}
`;
