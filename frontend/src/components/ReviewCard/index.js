import React from 'react';
import { string, number } from 'prop-types';

import StarRating from '../StarsRating';

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
} from './css';

import UserProfile from '../UserProfile';

const ReviewCard = ({
  date,
  description,
  rating,
  reviewDislikes,
  reviewLikes,
  title,
  userName,
  userPhoto,
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

ReviewCard.propTypes = {
  date: string.isRequired,
  description: string.isRequired,
  rating: number.isRequired,
  reviewDislikes: number.isRequired,
  reviewLikes: number.isRequired,
  title: string.isRequired,
  userName: string.isRequired,
  userPhoto: string.isRequired,
};

export default ReviewCard;
