import styled from 'styled-components';
import { typeScale, typeWeight } from '../../../theme/typography';
import spacing from '../../../theme/spacing';
import { breakpoints } from '../../../theme/breakpoints';

export const RightSide = styled.div`
  width: 100%;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacing[6]} 0 ${spacing[6]} ${spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.dividerColor};

  position: relative;

  @media screen and (min-width: ${breakpoints[0]}px) {
    flex-direction: row;
    padding: ${spacing[6]} 0;
  }
`;

export const ReviewTitleRating = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints[0]}px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ReviewTitle = styled.h3`
  font-size: ${typeScale.header6};
  line-height: 1;

  margin-right: ${spacing[3]};
  margin-bottom: ${spacing[1]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    margin-bottom: 0;
  }
`;

export const Date = styled.p`
  font-weight: ${typeWeight.light};
  margin-bottom: ${spacing[5]};
`;

export const Description = styled.p`
  margin-bottom: ${spacing[5]};
  word-wrap: break-word;
`;

export const ReviewFeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: ${typeScale.helperText};
  font-weight: ${typeWeight.light};

  @media screen and (min-width: ${breakpoints[0]}px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const FeedbackButton = styled.button`
  color: ${({ theme }) => theme.textInverted};
  background: ${({ theme }) => theme.primaryColor};

  padding: ${spacing[1]} ${spacing[2]};
  margin-right: ${spacing[1]};
  border-radius: 5px;

  font-weight: ${typeScale.bold};

  &:disabled {
    background: ${({ theme }) => theme.disabledColor};
    color: white;
  }
`;

export const Feedback = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing[1]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    margin: 0;
  }
`;

export const FeedbackText = styled.p`
  margin-right: ${spacing[1]};
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: ${spacing[2]};
`;
