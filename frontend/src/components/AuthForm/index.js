import styled from 'styled-components';
import { Form } from 'formik';

import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  & input {
    margin: ${spacing[2]} 0;
  }

  & button {
    margin-top: ${spacing[5]};
    margin-bottom: ${spacing[3]};
  }
`;

export const StyledSection = styled.section`
  padding: ${spacing[11]} ${spacing[7]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    padding: 12rem 0;
  }
`;

export const InnerSection = styled.div`
  max-width: 450px;

  padding: ${spacing[7]} ${spacing[7]};
  margin: 0 auto;

  border: 1px solid ${({ theme }) => theme.dividerColor};

  border-radius: 5px;
  background-color: ${({ theme }) => theme.contentBackgroundLight};
`;

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.errorRed};
  margin-bottom: ${({ apiError }) => (apiError ? spacing[3] : spacing[0])};
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    text-align: left;
    flex-direction: row;
  }
`;
