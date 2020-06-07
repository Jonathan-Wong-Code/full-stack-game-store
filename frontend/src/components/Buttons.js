import styled from "styled-components";
import { typeScale, typeWeight } from "../../theme/typography";
import spacing from "../../theme/spacing";
import { applyStyleModifiers } from "styled-components-modifiers";

const BUTTON_MODIFIERS = {
  fullWidth: () => `
    width: 100%;
  `,

  large: () => `
    font-size: ${typeScale.header4};
  `,
};

export const BaseButton = styled.button`
  border-radius: 5px;
  border: none;

  font-size: ${typeScale.paragraph};
  font-weight: ${typeWeight.bold};

  display: block;
  cursor: pointer;

  min-width: 150px;
  padding: ${spacing[3]};

  transition: background-color 0.2s linear, color 0.2s linear;

  &:disabled {
    background-color: ${({ theme }) => theme.grey};
    color: ${({ theme }) => theme.darkGrey};
    border: ${({ theme }) => theme.darkGrey};
  }
`;

const PrimaryBaseButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.primaryLight};

  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.textInverted};
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const PrimaryButton = styled(PrimaryBaseButton)`
  color: ${({ theme }) => theme.textInverted};

  background-color: ${({ theme }) => theme.primaryLight};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

export const PrimaryInvertedButton = styled(PrimaryBaseButton)`
  color: ${({ theme }) => theme.primaryLight};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

const SecondaryBaseButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.secondaryLight};

  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.textInverted};
    background-color: ${({ theme }) => theme.secondaryDark};
  }
`;

export const SecondaryButton = styled(SecondaryBaseButton)`
  color: ${({ theme }) => theme.textInverted};

  background-color: ${({ theme }) => theme.secondaryLight};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

export const SecondaryInvertedButton = styled(SecondaryBaseButton)`
  color: ${({ theme }) => theme.secondaryLight};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
