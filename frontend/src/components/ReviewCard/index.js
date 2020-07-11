import React from 'react';
import { string, number, shape } from 'prop-types';
import axios from 'axios';

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
  ReviewFeedbackContainer
} from './css';

import UserProfile from '../UserProfile';
import useSetState from '../../hooks/useSetState';

const ReviewCard = ({
  date,
  description,
  rating,
  reviewDislikes,
  reviewLikes,
  title,
  reviewId,
  user,
  userName,
  userPhoto
}) => {
  const [
    { likes, dislikes, userHasLike, userHasDislike },
    setState
  ] = useSetState({
    likes: reviewLikes.length,
    dislikes: reviewDislikes.length,
    userHasLike: user && reviewLikes.some(like => like.user === user.id),
    userHasDislike:
      user && reviewDislikes.some(dislike => dislike.user === user.id)
  });

  const onLikeClick = async () => {
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}/likes`,
        data: {
          review: reviewId
        },
        withCredentials: true
      });

      setState({
        likes: likes + 1,
        dislikes: dislikes > 0 && userHasDislike ? dislikes - 1 : dislikes,
        userHasLike: true,
        userHasDislike: false
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDislikeClick = async () => {
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}/dislikes`,
        data: {
          review: reviewId
        },
        withCredentials: true
      });

      setState({
        dislikes: dislikes + 1,
        likes: likes > 0 && userHasLike ? likes - 1 : likes,
        userHasDislike: true,
        userHasLike: false
      });
    } catch (error) {
      console.log(error.response);
    }
  };

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
        {user ? (
          <ReviewFeedbackContainer className="helpful">
            <Feedback>
              <FeedbackText>Is this helpful to you?</FeedbackText>
              <FeedbackButton onClick={onLikeClick} disabled={userHasLike}>
                Yes
              </FeedbackButton>
              <FeedbackButton
                onClick={onDislikeClick}
                disabled={userHasDislike}
              >
                No
              </FeedbackButton>
            </Feedback>
            <p>
              ({likes} of {likes + dislikes} people found this helpful)
            </p>
          </ReviewFeedbackContainer>
        ) : (
          <p>
            {likes} of {likes + dislikes} people found this helpful
          </p>
        )}
      </RightSide>
    </ReviewContainer>
  );
};

ReviewCard.propTypes = {
  date: string.isRequired,
  description: string.isRequired,
  rating: number.isRequired,
  reviewDislikes: number.isRequired,
  reviewId: string.isRequired,
  reviewLikes: number.isRequired,
  title: string.isRequired,
  userName: string.isRequired,
  userPhoto: string.isRequired,
  user: shape({
    name: string.isRequired,
    photo: string.isRequired,
    id: string.isRequired
  }).isRequired
};

export default ReviewCard;
