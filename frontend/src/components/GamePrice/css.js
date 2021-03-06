import styled from 'styled-components';
import { typeScale } from '../../../theme/typography';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const Prices = styled.div`
  margin-left: ${({ gameDiscount }) => (gameDiscount > 0 ? spacing[2] : null)};
  margin-left: ${({ isLarge, gameDiscount }) =>
    isLarge && gameDiscount > 0 ? spacing[7] : null};

  display: block;
`;

export const OriginalGamePrice = styled.p`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header5 : typeScale.smallText};
  text-align: right;
  text-decoration: line-through;

  color: ${({ discountColor, theme }) => discountColor || theme.primaryColor};
`;

export const FinalGamePrice = styled.div`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header2 : typeScale.paragraph};

  display: flex;

  @media screen and (min-width: ${breakpoints[2]}px) {
    font-size: ${typeScale.header1};
  }
`;
