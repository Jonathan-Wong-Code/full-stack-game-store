import { Form } from 'formik';
import styled from 'styled-components';
import spacing from '../../theme/spacing';
import { typeScale } from '../../theme/typography';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  & input {
    margin-bottom: ${spacing[2]};
  }

  & button {
    margin-top: ${spacing[7]};
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  padding: ${spacing[7]} ${spacing[7]};
  border: 1px solid ${({ theme }) => theme.dividerColor};
  border-radius: 5px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.contentBackgroundLight};
`;

export const H2 = styled.h2`
  font-size: ${typeScale.header2};
  text-align: center;
  line-height: 1;
  margin-bottom: ${spacing[6]};
`;
