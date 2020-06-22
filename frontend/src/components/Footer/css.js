import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { typeScale } from '../../../theme/typography';
import { Wrapper } from '../Wrapper';

export const StyledFooter = styled.footer`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.darkGrey};
  color: ${({ theme }) => theme.textInverted};
  width: 100%;
  font-size: ${typeScale.paragraph};
  padding: ${spacing[6]} 0;
`;

export const InnerFooter = styled(Wrapper)``;
