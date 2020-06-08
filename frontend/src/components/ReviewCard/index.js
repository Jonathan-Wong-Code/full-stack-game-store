import React from "react";
import StarRating from "../StarsRating/";

import {
  Date,
  Description,
  Feedback,
  FeedbackButton,
  FeedbackText,
  RightSide,
  ReviewContainer,
  ReviewTitleRating,
  ReviewTitle,
  ReviewFeedbackContainer,
} from "./css";

import UserProfile from "../UserProfile";

const ReviewCard = ({
  title = "Review title",
  description = "This is why my review is graet",
  rating = 4,
  reviewLikes = 100,
  reviewDislikes = 20,
  date = "Jan 16th 2009",
  userName = "Random Joe",
  userPhoto = "http://www.fillmurray.com/200/300",
}) => {
  const totalLikes = reviewDislikes + reviewLikes;
  return (
    <ReviewContainer>
      <UserProfile userName={userName} userPhoto={userPhoto} />
      <RightSide className="rightSide">
        <ReviewTitleRating className="Title">
          <ReviewTitle>{title}</ReviewTitle>
          <StarRating rating={rating} />
        </ReviewTitleRating>
        <Date>{date}</Date>
        <Description>{description}</Description>
        <ReviewFeedbackContainer className="helpful">
          <Feedback>
            <FeedbackText>Is this helpful to you?</FeedbackText>
            <FeedbackButton>Yes</FeedbackButton>
            <FeedbackButton>No</FeedbackButton>
          </Feedback>
          <p>
            ({reviewLikes} of {totalLikes} people found this helpful)
          </p>
        </ReviewFeedbackContainer>
      </RightSide>
    </ReviewContainer>
  );
};

export default ReviewCard;
