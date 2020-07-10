import React from 'react';
import { string, number, object } from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../selectors/auth';
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
  user
}) => {
  const [
    { likes, dislikes, userHasLike, userHasDislike },
    setState
  ] = useSetState({
    likes: reviewLikes,
    dislikes: reviewDislikes,
    userHasLike: reviewLikes.some(like => like === user.id),
    userHasDislke: reviewDislikes.some(dislike => dislike === user.id)
  });

  // const user = useSelector(selectAuthUser);

  const onLikeClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}/likes`,
        data: {
          review: reviewId
        },
        withCredentials: true
      });

      setState({
        likes: [response.data.like, ...likes],
        dislikes: dislikes.filter(dislike => dislike === user.id),
        userHasLike: true,
        userHasDislke: false
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onDislikeClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/reviews/${reviewId}/dislikes`,
        data: {
          review: reviewId
        },
        withCredentials: true
      });

      setState({
        dislikes: [response.data.dislike, ...dislikes],
        likes: likes.filter(like => like === user.id),
        userHasDislke: true,
        userHasLike: false
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ReviewContainer>
      <UserProfile userName={user.name} userPhoto={user.photo} />
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
              ({likes.length} of {likes.length + dislikes.length} people found
              this helpful)
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
  user: object.isRequired
};

export default ReviewCard;
