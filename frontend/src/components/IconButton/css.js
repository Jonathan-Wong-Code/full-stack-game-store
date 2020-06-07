import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

const BUTTON_MODIFIERS = {
  secondary: ({ theme }) => `
    background-color: ${theme.secondaryColor};

    &:hover {
      background-color: ${theme.secondaryLight};
    }
    `,
};

export const Button = styled.button`
  border-radius: 5px;
  transition: 0.2s all;

  background-color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.primaryLight};
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
