import styled from 'styled-components';

import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const Logo = styled.h1`
  font-size: ${typeScale.header1};
  font-weight: ${typeWeight.bold};

  display: inline-block;

  padding: ${spacing[1]};
  margin: 0;
  margin-right: ${spacing[7]};

  border-radius: 5px;

  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.contentBackgroundLight};

  cursor: pointer;
`;

export const HeaderSection = styled.header`
  display: none;
  width: 100%;

  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.textInverted};

  font-size: ${typeScale.header4};
  padding: ${spacing[5]} 0;

  @media screen and (min-width: ${breakpoints[0]}px) {
    display: block;
  }
`;

export const Nav = styled.nav`
  max-width: 1170px;
  width: 100%;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftNav = styled.div`
  display: flex;
  align-items: center;
`;
export const LeftInnerNav = styled.ul`
  display: flex;
`;

export const RightNav = styled.ul`
  display: flex;
`;

export const StyledLink = styled.a`
  margin-right: ${spacing[6]};
  cursor: pointer;
`;

export const Button = styled.button`
  color: inherit;
`;
