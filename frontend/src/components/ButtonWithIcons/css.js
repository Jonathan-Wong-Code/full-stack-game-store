import styled from "styled-components";
import { SecondaryButton, PrimaryButton } from "../Buttons";
import spacing from "../../../theme/spacing";
const BaseIconButtonStyles = () => `
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${spacing[6]};
`;

export const SecondaryStyles = styled(SecondaryButton)`
  ${BaseIconButtonStyles()}
`;

export const PrimaryStyles = styled(PrimaryButton)`
  ${BaseIconButtonStyles()}
`;
