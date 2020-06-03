import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../Buttons";
import spacing from "../../../theme/spacing";
import { breakpoints } from "../../../theme/breakpoints";
import { applyStyleModifiers } from "styled-components-modifiers";
import { typeScale } from "../../../theme/typography";
const BUTTON_MODIFIERS = {
  large: () => `
    font-size: ${typeScale.header4};

    @media screen and (min-width:${breakpoints[0]}) {
      font-size: ${typeScale.paragraph};
    }
  `,
};

const BaseIconButtonStyles = () => `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[1]};
  padding-right: ${spacing[6]};

  @media screen and (min-width: ${breakpoints[0]}) {
    padding: ${spacing[3]};
  }
`;

export const SecondaryStyles = styled(SecondaryButton)`
  ${BaseIconButtonStyles()};
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

export const PrimaryStyles = styled(PrimaryButton)`
  ${BaseIconButtonStyles()};
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;
