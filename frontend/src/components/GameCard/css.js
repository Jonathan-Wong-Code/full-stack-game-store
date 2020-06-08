import styled from "styled-components";
import { typeScale, typeWeight } from "../../../theme/typography";
import spacing from "../../../theme/spacing";
import { applyStyleModifiers } from "styled-components-modifiers";

const CONTAINER_MODIFIERS = {
  smallCard: () => `
    max-width: 250px;
  `,
};

export const Container = styled.li`
  font-size: ${typeScale.paragraph};
  font-weight: ${typeWeight.bold};

  list-style-type: none;

  max-width: 350px;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.contentBackground};

  ${applyStyleModifiers(CONTAINER_MODIFIERS)};
`;

export const GameTitle = styled.h3`
  font-size: ${typeScale.header4};
  font-weight: inherit;

  margin-bottom: ${spacing[4]};
`;

export const GameInformation = styled.div`
  padding: ${spacing[4]};
`;

export const PriceFlexBox = styled.div`
  display: flex;
`;

export const PriceInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Prices = styled.div`
  margin-left: ${({ gameDiscount }) => (gameDiscount ? spacing[2] : null)};
`;

export const OriginalGamePrice = styled.p`
  font-size: ${typeScale.smallText};
  text-align: right;
  text-decoration: line-through;

  margin-bottom: ${spacing[1]};
  color: ${({ theme }) => theme.primaryColor};
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
`;
