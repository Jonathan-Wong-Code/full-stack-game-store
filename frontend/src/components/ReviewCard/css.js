import styled from "styled-components";
import { typeScale, typeWeight } from "../../../theme/typography";
import spacing from "../../../theme/spacing";
import { breakpoints } from "../../../theme/breakpoints";

export const LeftSide = styled.div`
  width: 100%;
  margin-bottom: ${spacing[5]};
  display: flex;
  align-items: center;

  @media screen and (min-width: ${breakpoints[0]}px) {
    width: 200px;
    margin: 0;
    flex-direction: column;
  }
`;

export const ImgContainer = styled.div`
  height: 60px;
  width: 60px;
  margin-right: ${spacing[3]};

  @media screen and (min-width: ${breakpoints[0]}px) {
    width: 100px;
    margin-right: 0;
    height: 80px;
    width: 80px;
  }
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

export const RightSide = styled.div`
  width: 100%;
`;

export const ReviewContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.dividerColor};

  @media screen and (min-width: ${breakpoints[0]}px) {
    flex-direction: row;
    padding: ${spacing[6]} 0;
  }
`;

export const ReviewTitleRating = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewTitle = styled.h3`
  line-height: 1;
  font-size: ${typeScale.header6};
  margin-right: ${spacing[3]};
`;

export const Date = styled.p`
  font-weight: ${typeWeight.light};
  margin-bottom: ${spacing[5]};
`;

export const Description = styled.p`
  margin-bottom: ${spacing[5]};
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
