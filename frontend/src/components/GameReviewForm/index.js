import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { string, number, func, bool } from 'prop-types';
import * as Yup from 'yup';

import { Input } from '../Input';
import StarsRating from '../StarsRating';
import UserProfile from '../UserProfile';
import {
  ReviewContainer,
  ReviewRatingTitle,
  Section,
  ButtonContainer,
  ReviewError
} from './css';
import { PrimaryButton, PrimaryInvertedButton } from '../Buttons';

import {
  useReviewDispatch,
  useReviewState
} from '../../containers/gamePage/reviews/context';

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(20, 'Review must be 20 characters long at least.')
    .required('A review description is required'),

  title: Yup.string().required('A review title is required')
});

const GameReviewForm = props => {
  const {
    active,
    description,
    closeEditForm,
    isBeingEdited,
    userName,
    userPhoto,
    userId,
    gameId,
    initialRating,
    reviewId,
    title,
    type
  } = props;

  const [rating, setRating] = useState(initialRating);

  const { addReview, updateReview } = useReviewDispatch();
  const { error } = useReviewState();

  const onSubmit = async values => {
    if (error) return;
    const data = {
      ...values,
      game: gameId,
      rating
    };

    const user = { id: userId, name: userName, photo: userPhoto };
    if (type === 'create') {
      addReview(gameId, data, user);
    } else {
      const success = await updateReview(reviewId, { ...values, rating });
      if (success) {
        closeEditForm();
      }
    }
  };

  const getTabIndex = () => {
    if (active && !isBeingEdited) {
      return 0;
    }

    if (isBeingEdited && !active) {
      return 0;
    }

    return -1;
  };

  return (
    <Section>
      <UserProfile userName={userName} userPhoto={userPhoto} />
      <ReviewContainer>
        <Formik
          initialValues={{
            title,
            description
          }}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form method="">
              <div
                style={{
                  width: '100%',
                  marginLeft: '12rem',
                  marginBottom: '.5rem'
                }}
              >
                <ReviewError
                  role="alert"
                  showError={errors.title && touched.title}
                >
                  Error: {errors.title}
                </ReviewError>
              </div>
              <ReviewRatingTitle>
                <StarsRating
                  rating={rating}
                  setRating={setRating}
                  isForReview
                  tabIndex={getTabIndex()}
                />

                <label
                  htmlFor="game-review-title"
                  className="screen-reader-only"
                >
                  Enter review title:
                </label>
                <Input
                  name="title"
                  id="game-review-title"
                  placeholder="Review title"
                  tabIndex={getTabIndex()}
                />
              </ReviewRatingTitle>

              <>
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
                  tabIndex={getTabIndex()}
                />

                {errors.description && touched.description && (
                  <ReviewError
                    role="alert"
                    showError={errors.description && touched.description}
                  >
                    Error: {errors.description}
                  </ReviewError>
                )}

                {error && (
                  <ReviewError role="alert" showError={error}>
                    Error: {error}
                  </ReviewError>
                )}
              </>

              <ButtonContainer>
                <PrimaryInvertedButton type="reset" tabIndex={getTabIndex()}>
                  Reset
                </PrimaryInvertedButton>
                <PrimaryButton type="submit" tabIndex={getTabIndex()}>
                  Save Review
                </PrimaryButton>
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </ReviewContainer>
    </Section>
  );
};

GameReviewForm.propTypes = {
  closeEditForm: func,
  userName: string.isRequired,
  userId: string.isRequired,
  userPhoto: string.isRequired,
  gameId: string.isRequired,
  initialRating: number,
  title: string,
  description: string,
  reviewId: string,
  active: bool,
  isBeingEdited: bool,
  type: string.isRequired
};

GameReviewForm.defaultProps = {
  closeEditForm: () => {},
  initialRating: 1,
  title: '',
  description: '',
  reviewId: '',
  active: false,
  isBeingEdited: false
};

export default GameReviewForm;
