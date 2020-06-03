import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

const BUTTON_MODIFIERS = {
  secondary: ({ theme }) => `
    background-color: ${theme.secondaryLight};

    &:hover {
      background-color: ${theme.secondaryColor};
    }
    `,
};

export const Button = styled.button`
  border-radius: 5px;
  transition: 0.2s all;

  background-color: ${({ theme }) => theme.primaryLight};

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
