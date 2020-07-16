import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';
import { ErrorMsg } from '../Forms/AuthForm';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${spacing[6]} 0;

  @media screen and (min-width: ${breakpoints[0]}px) {
    flex-direction: row;
  }
`;

export const ReviewContainer = styled.div`
  width: 100%;

  #game-review-title {
    margin-left: ${spacing[5]};
  }
`;

export const ReviewRatingTitle = styled.div`
  display: flex;
  margin-bottom: ${spacing[3]};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacing[5]};

  & button:not(:last-child) {
    margin-right: 5px;
  }
`;

export const ReviewError = styled(ErrorMsg)`
  opacity: ${({ showError }) => (showError ? 1 : 0)};
`;
