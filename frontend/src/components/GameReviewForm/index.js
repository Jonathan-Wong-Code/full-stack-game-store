import React, { useState } from 'react';
import { withFormik } from 'formik';
import { string, shape } from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';

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

const GameReviewForm = ({ userName, userPhoto, gameId, values }) => {
  const [rating, setRating] = useState(1);

  const handleSubmit = async e => {
    e.preventDefault();
    const { title, description } = values;
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/games/${gameId}/reviews`,
        withCredentials: true,
        data: {
          title,
          description,
          game: gameId,
          rating
        }
      });
    } catch (error) {
      console.log(error.response);
    }
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
  userPhoto: string.isRequired,
  gameId: string.isRequired,
  values: shape({
    title: string.isRequired,
    description: string.isRequired
  }).isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    description: '',
    title: ''
  }),

  validationSchema: Yup.object().shape({
    description: Yup.string()
      .min(20, 'Review must be 20 characters long at least.')
      .required('A review description is required'),

    title: Yup.string().required('A review title is required')
  })
})(GameReviewForm);
