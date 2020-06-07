import styled from "styled-components";
import { typeScale, typeWeight } from "../../../theme/typography";
import spacing from "../../../theme/spacing";
import { applyStyleModifiers } from "styled-components-modifiers";

const MODIFIERS = {
  large: () => `
    font-size:${typeScale.header1};
    padding: ${spacing[2]} ${spacing[6]};
  `,
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
