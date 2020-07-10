import styled from 'styled-components';
import spacing from '../../theme/spacing';
import { typeScale } from '../../theme/typography';

export const SubHeading = styled.h2`
  font-size: ${typeScale.header3};
  padding-bottom: ${spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
  margin-bottom: ${spacing[5]};
`;
