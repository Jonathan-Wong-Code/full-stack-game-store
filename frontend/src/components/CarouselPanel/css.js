import styled from "styled-components";
import { breakpoints } from "../../../theme/breakpoints";
import spacing from "../../../theme/spacing";
import { typeScale, typeWeight } from "../../../theme/typography";
import { SecondaryIconButton } from "../ButtonWithIcons";

export const Container = styled.section`
  width: 100%;
  height: 450px;
  background-image: url(${({ gameImage }) => gameImage});
  background-size: cover;
  background-position: center;

  color: ${({ textColorLight, theme }) =>
    textColorLight ? theme.textInverted : theme.textColor};

  display: flex;
  align-items: flex-end;

  padding: ${spacing[6]};

  @media screen and (min-width: ${breakpoints[2]}px) {
    height: 450px;
    width: 992px;
    background-size: cover;
    padding: ${spacing[7]};
  }
`;

export const ContentFlexbox = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints[2]}px) {
    flex-direction: row;
  }
`;

export const H3 = styled.h3`
  font-size: ${typeScale.header1};
  font-weight: ${typeWeight.bold};
`;

export const LeftSide = styled.div`
  width: 100%;
  margin-bottom: ${spacing[7]};

  @media screen and (min-width: ${breakpoints[2]}px) {
    justify-content: space-between;
    margin: 0;
  }
`;

export const RightSide = styled.div`
  width: 100%;
  display: block;

  @media screen and (min-width: ${breakpoints[2]}px) {
    justify-content: flex-end;
  }

  @media screen and (min-width: ${breakpoints[0]}px) {
    display: flex;
    align-items: center;
  }
`;

export const PromoText = styled.p`
  font-size: ${typeScale.paragraph};
  margin-bottom: ${spacing[3]};
`;

export const ButtonContainer = styled.div`
  margin-top: ${spacing[6]};

  & button {
    width: 100%;
  }

  @media screen and (min-width: ${breakpoints[0]}px) {
    margin: 0;
    margin-left: ${spacing[7]};
  }
`;
