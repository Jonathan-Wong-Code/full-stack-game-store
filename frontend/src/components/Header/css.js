import styled from 'styled-components';

import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';

export const Logo = styled.h1`
  font-size: ${typeScale.header1};
  font-weight: ${typeWeight.bold};
  padding: ${spacing[1]};
  border-radius: 5px;
  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.contentBackgroundLight};
  display: inline-block;
  margin: 0;
  margin-right: ${spacing[7]};
  cursor: pointer;
`;

export const HeaderSection = styled.header`
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.textInverted};
  width: 100%;
  font-size: ${typeScale.header4};
  padding: ${spacing[5]} 0;
`;

export const Nav = styled.nav`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftNav = styled.ul`
  display: flex;
  align-items: center;
`;
export const LeftInnerNav = styled.div`
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
