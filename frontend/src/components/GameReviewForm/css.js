import styled from 'styled-components';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';
import { ErrorMsg } from '../AuthForm';

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
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
      margin-left: ${spacing[5]};
    }
  }
`;

export const ReviewRatingTitle = styled.div`
  display: flex;
  margin-bottom: ${spacing[3]};
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-direction: row;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: ${spacing[5]};
  margin-top: ${spacing[3]};
  & button:not(:last-child) {
    margin-right: 5px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}px) {
    justify-content: flex-end;
  }
`;

export const TitleErrorDesktop = styled.div`
  width: 100%;
  margin-left: 12rem;
  margin-bottom: 0.5rem;
`;

export const ReviewError = styled(ErrorMsg)`
  opacity: ${({ showError }) => (showError ? 1 : 0)};
`;
