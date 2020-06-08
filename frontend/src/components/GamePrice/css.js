import styled from "styled-components";
import { typeScale } from "../../../theme/typography";
import spacing from "../../../theme/spacing";

export const Prices = styled.div`
  margin-left: ${({ gameDiscount }) => (gameDiscount ? spacing[2] : null)};
  margin-left: ${({ isLarge }) => (isLarge ? spacing[7] : null)};
  display: inline-block;
`;

export const OriginalGamePrice = styled.p`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header5 : typeScale.smallText};
  text-align: right;
  text-decoration: line-through;

  color: ${({ discountColor, theme }) =>
    discountColor ? discountColor : theme.primaryColor};
`;

export const FinalGamePrice = styled.p`
  font-size: ${({ isLarge }) =>
    isLarge ? typeScale.header1 : typeScale.paragraph};
`;
