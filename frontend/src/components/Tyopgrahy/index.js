import styled from 'styled-components';
import { typeScale } from '../../../theme/typography';
import spacing from '../../../theme/spacing';

export const H2 = styled.h2`
  font-size: ${typeScale.header2};
  text-align: center;
  line-height: 1;
  margin-bottom: ${spacing[6]};
`;

export const H1 = styled.h1`
  font-size: ${typeScale.header1};
  margin: 0;
`;
