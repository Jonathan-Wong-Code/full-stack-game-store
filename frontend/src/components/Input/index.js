import styled from 'styled-components';
import { Field } from 'formik';
import { typeScale } from '../../../theme/typography';
import spacing from '../../../theme/spacing';

export const Input = styled(Field)`
  border-radius: 5px;
  font-size: ${typeScale.paragraph};
  width: 100%;
  padding: ${spacing[3]};
  background-color: ${({ theme }) => theme.contentBackgroundLight};
  border: 1px solid ${({ theme }) => theme.grey};
  outline: none;

  &:focus {
    outline: 1px solid blue;
  }
`;
