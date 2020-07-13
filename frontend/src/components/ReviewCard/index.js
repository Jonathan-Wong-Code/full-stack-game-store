import React from 'react';
import { string, number, shape, func, array } from 'prop-types';
import axios from 'axios';

import StarRating from '../StarsRating';

import {
  ButtonContainer,
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

import { PrimaryButton } from '../Buttons';

import UserProfile from '../UserProfile';
import useSetState from '../../hooks/useSetState';

const ReviewCard = ({
  date,
  deleteReviewUI,
  description,
  rating,
  reviewDislikes,
  reviewLikes,
  title,
  reviewId,
  reviewUserId,
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
        data: { review: reviewId },
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
        data: { review: reviewId },
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

  const deleteReview = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}`,
        withCredentials: true
      });
      deleteReviewUI(reviewId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const editReview = async () => {
    try {
      await axios({
        method: 'PATCH',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}`,
        withCredentials: true
      });
      deleteReviewUI(reviewId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const userOwnedReview = user ? reviewUserId === user.id : null;

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

        {user && !userOwnedReview ? (
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

        {userOwnedReview && (
          <ButtonContainer>
            <PrimaryButton
              modifiers="small"
              style={{ marginRight: '.5rem' }}
              onClick={() => deleteReview(reviewId)}
              type="button"
            >
              Delete
            </PrimaryButton>
            <PrimaryButton modifiers="small">Edit</PrimaryButton>
          </ButtonContainer>
        )}
      </RightSide>
    </ReviewContainer>
  );
};

ReviewCard.propTypes = {
  date: string.isRequired,
  deleteReviewUI: func.isRequired,
  description: string.isRequired,
  rating: number.isRequired,
  reviewDislikes: array.isRequired,
  reviewId: string.isRequired,
  reviewLikes: array.isRequired,
  reviewUserId: string,
  title: string.isRequired,
  userName: string.isRequired,
  userPhoto: string.isRequired,
  user: shape({
    name: string.isRequired,
    photo: string.isRequired,
    id: string.isRequired
  }).isRequired
};

ReviewCard.defaultProps = {
  reviewUserId: ''
};

export default ReviewCard;
