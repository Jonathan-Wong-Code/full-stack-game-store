import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

import spacing from "../../../theme/spacing";

const ICON_MODIFIERS = {
  large: () => `
  & svg {
    width: 55px;
    height: 50px;
  }

`,
  small: () => `
    & svg {
      width: 35px;
      height: 30px;
    }  
  `,
};

// background-color: ${({ theme, primaryIcon }) =>
// primaryIcon ? theme.primaryLight : theme.secondaryLight};

// &:hover {
//   background-color: ${({ theme, primaryIcon }) =>
//     primaryIcon ? theme.primaryDark : theme.secondaryDark};
// }
export const IconStyles = styled.div`
  border-radius: 5px;

  & svg {
    width: 40px;
    height: 35px;

    border-radius: 5px;
    padding: ${spacing[1]};
    fill: white;
  }

  ${applyStyleModifiers(ICON_MODIFIERS)}
`;
