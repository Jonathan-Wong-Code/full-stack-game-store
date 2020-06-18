import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const Section = styled.section`
  display: flex;
  flex-direction: column;

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

  & button:not(:last-child) {
    margin-right: 5px;
  }
`;
