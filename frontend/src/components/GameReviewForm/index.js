import React, { useState } from 'react';
import { withFormik } from 'formik';
import { string, shape, number } from 'prop-types';
import * as Yup from 'yup';

import { Input } from '../Input';
import StarsRating from '../StarsRating';
import UserProfile from '../UserProfile';
import {
  ReviewContainer,
  ReviewRatingTitle,
  Section,
  ButtonContainer
} from './css';
import { PrimaryButton, PrimaryInvertedButton } from '../Buttons';

import { useReviewDispatch } from '../../containers/gamePage/reviews/context';

const GameReviewForm = ({
  userName,
  userPhoto,
  userId,
  gameId,
  values,
  initialRating
}) => {
  const [rating, setRating] = useState(initialRating);

  const { addReview } = useReviewDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      title: values.title,
      description: values.description,
      game: gameId,
      rating
    };

    const user = { id: userId, name: userName, photo: userPhoto };
    addReview(gameId, data, user);
  };

  return (
    <Section>
      <UserProfile userName={userName} userPhoto={userPhoto} />
      <ReviewContainer>
        <form onSubmit={handleSubmit} method="">
          <ReviewRatingTitle>
            <StarsRating rating={rating} setRating={setRating} isForReview />
            <label htmlFor="game-review-title" className="screen-reader-only">
              Enter review title:
            </label>
            <Input
              name="title"
              id="game-review-title"
              placeholder="Review title"
            />
          </ReviewRatingTitle>

          <label
            htmlFor="game-review-description"
            className="screen-reader-only"
          >
            Enter review description:
          </label>
          <Input
            component="textarea"
            name="description"
            rows="10"
            id="game-review-description"
            placeholder="Review text"
          />
          <ButtonContainer>
            <PrimaryInvertedButton type="reset">Reset</PrimaryInvertedButton>
            <PrimaryButton type="submit">Save Review</PrimaryButton>
          </ButtonContainer>
        </form>
      </ReviewContainer>
    </Section>
  );
};

GameReviewForm.propTypes = {
  userName: string.isRequired,
  userId: string.isRequired,
  userPhoto: string.isRequired,
  gameId: string.isRequired,
  initialRating: number,
  title: string,
  description: string,
  values: shape({
    title: string.isRequired,
    description: string.isRequired
  }).isRequired
};

GameReviewForm.defaultProps = {
  initialRating: 1,
  title: '',
  description: ''
};

export default withFormik({
  mapPropsToValues: ({ description, title }) => ({
    description,
    title
  }),

  validationSchema: Yup.object().shape({
    description: Yup.string()
      .min(20, 'Review must be 20 characters long at least.')
      .required('A review description is required'),

    title: Yup.string().required('A review title is required')
  })
})(GameReviewForm);
