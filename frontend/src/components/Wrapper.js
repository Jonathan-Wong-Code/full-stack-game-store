import styled from 'styled-components';
import spacing from '../../theme/spacing';
export const Wrapper = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${spacing[5]};
  position: relative;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}px) {
    padding: 0;
  }
`;
