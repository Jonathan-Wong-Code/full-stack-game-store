import styled from 'styled-components';

import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const Logo = styled.h1`
  font-size: ${typeScale.header1};
  font-weight: ${typeWeight.bold};
  display: none;

  padding: ${spacing[1]};
  margin: 0;
  margin-right: ${spacing[7]};

  border-radius: 5px;

  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.white};

  cursor: pointer;

  @media screen and (min-width: ${breakpoints[0]}px) {
    display: inline-block;
  }
`;

export const HeaderSection = styled.header`
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
  padding: 0 ${({ theme }) => theme.spacing[5]};
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
  align-items: center;
`;

export const StyledLink = styled.a`
  margin-right: ${spacing[6]};
  cursor: pointer;
  position: relative;
`;

export const Button = styled.button`
  color: inherit;
`;

export const ItemNumber = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
  background: ${({ theme }) => theme.primaryColor};
  height: 20px;
  width: 20px;
  display: flex;
  border-radius: 50%;
  font-weight: ${({ theme }) => theme.typeWeight.bold};

  &::before {
    content: '${({ numItems }) => numItems}';
    display: block;
    margin: auto;
  }
`;
