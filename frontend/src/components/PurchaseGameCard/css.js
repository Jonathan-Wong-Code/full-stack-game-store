import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const Container = styled.section`
  padding: ${spacing[5]} ${spacing[5]};
  background-color: ${({ theme }) => theme.contentBackgroundLight};

  border-radius: 4px;
  box-shadow: 0px 0px 13px 3px rgba(0, 0, 0, 0.27);

  min-width: 300px;
  @media screen and (min-width: ${breakpoints[0]}px) {
    min-width: 450px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: ${spacing[3]};

  & button:first-child {
    margin-bottom: ${spacing[3]};
  }
`;
