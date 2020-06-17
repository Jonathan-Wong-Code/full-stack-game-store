import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { typeScale } from '../../../theme/typography';
import { breakpoints } from '../../../theme/breakpoints';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & input {
    margin-bottom: ${spacing[2]};
  }

  & button {
    margin-top: ${spacing[5]};
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
  border: 1px solid ${({ theme }) => theme.dividerColor};
  flex-direction: column;
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

export const Links = styled.div`
  margin-top: ${spacing[3]};
  display: flex;
  justify-content: space-between;
`;
