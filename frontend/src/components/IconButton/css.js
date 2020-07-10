import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
  secondary: ({ theme }) => `
    background-color: ${theme.secondaryColor};

    &:hover {
      background-color: ${theme.secondaryLight};
    }
    `,

  tertiary: ({ theme }) => `
    background-color: ${theme.grey};

    &:hover {
      background-color: ${theme.lightGrey};
    }
    `,

  circular: () => `
    border-radius: 50%;
  `
};

export const Button = styled.button`
  border-radius: 5px;

  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.primaryLight};
  }

  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
