import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
  secondary: ({ theme }) => `
    background-color: ${theme.secondaryColor};

    &:hover {
      background-color: ${theme.secondaryLight};
    }
    `
};

export const Button = styled.button`
  transition: 0.2s all;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.primaryLight};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledColor};
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
