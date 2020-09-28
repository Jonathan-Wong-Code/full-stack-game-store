import React from 'react';
import { string, number, shape, array } from 'prop-types';
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

import { useReviewDispatch } from '../../containers/gamePage/reviews/context';

import GameReviewForm from '../GameReviewForm';

const ReviewCard = ({
  date,
  description,
  gameId,
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
    { likes, dislikes, userHasLike, userHasDislike, isBeingEdited },
    setState
  ] = useSetState({
    likes: reviewLikes.length,
    dislikes: reviewDislikes.length,
    userHasLike: user && reviewLikes.some(like => like.user === user.id),

    userHasDislike:
      user && reviewDislikes.some(dislike => dislike.user === user.id),

    isBeingEdited: false
  });

  const { deleteReview } = useReviewDispatch();

  const closeEditForm = () => setState({ isBeingEdited: false });

  const onLikeClick = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews/${reviewId}/likes`,
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews/${reviewId}/dislikes`,
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

  const userOwnedReview = user ? reviewUserId === user.id : null;

  return isBeingEdited ? (
    <GameReviewForm
      userName={user && user.name}
      userPhoto={user && user.photo}
      userId={user && user.id}
      gameId={gameId}
      type="update"
      title={title}
      description={description}
      initialRating={rating}
      reviewId={reviewId}
      closeEditForm={closeEditForm}
      isBeingEdited={isBeingEdited}
    />
  ) : (
    <ReviewContainer data-testid="review-card-component">
      <UserProfile userName={userName} userPhoto={userPhoto} />
      <RightSide className="rightSide">
        <ReviewTitleRating className="Title">
          <ReviewTitle>{title}</ReviewTitle>
          <p className="screen-reader-only">{rating} star rating</p>
          <StarRating rating={rating} />
        </ReviewTitleRating>
        <Date>{date}</Date>
        <Description>{description}</Description>

        {/* If not the user's own review and user is logged in */}
        {user && !userOwnedReview ? (
          <ReviewFeedbackContainer
            className="helpful"
            data-testid="review-card-feedback-buttons"
          >
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
            <p data-testid="review-card-feedback-info">
              ({likes} of {likes + dislikes} people found this helpful)
            </p>
          </ReviewFeedbackContainer>
        ) : (
          <p data-testid="review-card-no-feedback-buttons">
            {likes} of {likes + dislikes} people found this helpful
          </p>
        )}

        {/* If user wrote review they can edit/delete it */}
        {userOwnedReview && (
          <ButtonContainer data-testid="review-card-modify-container">
            <PrimaryButton
              modifiers="small"
              style={{ marginRight: '.5rem' }}
              onClick={() => deleteReview(reviewId)}
              type="button"
            >
              Delete
            </PrimaryButton>

            <PrimaryButton
              modifiers="small"
              onClick={() => setState({ isBeingEdited: true })}
            >
              Edit
            </PrimaryButton>
          </ButtonContainer>
        )}
      </RightSide>
    </ReviewContainer>
  );
};

ReviewCard.propTypes = {
  date: string.isRequired,
  description: string.isRequired,
  gameId: string.isRequired,
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
  })
};

ReviewCard.defaultProps = {
  reviewUserId: '',
  user: null
};

export default ReviewCard;
