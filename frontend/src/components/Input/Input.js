import styled from 'styled-components';
import { typeScale } from '../../../theme/typography';
import spacing from '../../../theme/spacing';

export const Input = styled.input`
  border-radius: 5px;
  font-size: ${typeScale.paragraph};
  width: 100%;
  padding: ${spacing[3]};
  background-color: ${({ theme }) => theme.lightGrey};
  border: 1px solid ${({ theme }) => theme.grey};
  outline: none;
`;
