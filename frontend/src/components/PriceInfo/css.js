import styled from 'styled-components';
import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';

export const PriceFlexBox = styled.div`
  display: flex;
  font-weight: ${typeWeight.bold};
  align-items: center;
`;

export const PriceInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Prices = styled.div`
  margin-left: ${({ gameDiscount }) => (gameDiscount ? spacing[2] : null)};
  margin-left: ${({ isLarge }) => (isLarge ? spacing[7] : null)};
`;

export const OriginalGamePrice = styled.p`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header5 : typeScale.smallText};
  text-align: right;
  text-decoration: line-through;

  color: ${({ theme, isLarge }) => (!isLarge ? theme.primaryColor : 'inherit')};
`;

export const FinalGamePrice = styled.p`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header1 : typeScale.paragraph};
`;
