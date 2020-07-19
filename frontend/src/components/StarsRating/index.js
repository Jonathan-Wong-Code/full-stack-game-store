import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { number, func, bool } from 'prop-types';

import Icon from '../Icon';

import { StarFilled, StarUnfilled } from '../../assets/icons';
import useTheme from '../../hooks/useTheme';
import { StarsContainer } from './css';

const Stars = ({ rating, setRating, isForReview, tabIndex }) => {
  const theme = useTheme();

  const getStarFilledType = i =>
    isForReview ? (
      <button
        type="button"
        onClick={() => setRating(i + 1)}
        tabIndex={tabIndex}
        key={uuidv4()}
        data-testid={`filled-star-${i}`}
      >
        <span className="screen-reader-only">
          Set rating to {rating} out of 5 stars.
        </span>
        <Icon iconColor={theme.primaryLight} variants="small">
          <StarFilled />
        </Icon>
      </button>
    ) : (
      <Icon iconColor={theme.primaryLight} variants="small" key={uuidv4()}>
        <StarFilled />
      </Icon>
    );

  const getStarUnfilledType = i =>
    isForReview ? (
      <button
        type="button"
        onClick={() => setRating(rating + i + 1)}
        key={uuidv4()}
        tabIndex={tabIndex}
        data-testid={`unfilled-star-${i}`}
      >
        <span className="screen-reader-only">
          Set rating to {rating} out of 5 stars.
        </span>
        <Icon iconColor={theme.primaryLight} variants="small">
          <StarUnfilled />
        </Icon>
      </button>
    ) : (
      <Icon iconColor={theme.primaryLight} variants="small" key={uuidv4()}>
        <StarUnfilled />
      </Icon>
    );

  const getFilledStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i += 1) {
      stars.push(getStarFilledType(i));
    }

    return stars.map(star => star);
  };

  const getUnfilledStars = () => {
    const unfilledStars = 5 - rating;

    const stars = [];

    for (let i = 0; i < unfilledStars; i += 1) {
      stars.push(getStarUnfilledType(i));
    }

    return stars.map(star => star);
  };

  return (
    <StarsContainer>
      <span className="screen-reader-only">
        The rating for this review is: {rating} out of 5
      </span>
      {getFilledStars()}
      {getUnfilledStars()}
    </StarsContainer>
  );
};

Stars.propTypes = {
  rating: number.isRequired,
  setRating: func,
  isForReview: bool,
  tabIndex: number
};

Stars.defaultProps = {
  setRating: () => {},
  isForReview: false,
  tabIndex: 0
};
export default Stars;
