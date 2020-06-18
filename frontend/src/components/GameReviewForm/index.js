import React, { useState } from 'react';
import { withFormik } from 'formik';
import { string } from 'prop-types';
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

const GameReviewForm = ({
  userName = 'john doe',
  userPhoto = 'http://www.fillmurray.com/g/200/300'
}) => {
  const [rating, setRating] = useState(1);

  const onSubmit = () => {};
  return (
    <Section>
      <UserProfile userName={userName} userPhoto={userPhoto} />
      <ReviewContainer>
        <form onSubmit={onSubmit}>
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
            <PrimaryInvertedButton>Cancel</PrimaryInvertedButton>
            <PrimaryButton>Save Review</PrimaryButton>
          </ButtonContainer>
        </form>
      </ReviewContainer>
    </Section>
  );
};

GameReviewForm.propTypes = {
  userName: string.isRequired,
  userPhoto: string.isRequired
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
