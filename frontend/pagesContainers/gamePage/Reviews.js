import React, { useEffect } from 'react';
import { string, shape } from 'prop-types';
import axios from 'axios';

import {
  ReviewHeading,
  ReviewContainer,
  FilterBar,
  Label
} from './Reviews.css';
import Accordion from '../../src/components/Accordion';
import GameReviewForm from '../../src/components/GameReviewForm';
import ReviewCard from '../../src/components/ReviewCard';
import useSetState from '../../src/hooks/useSetState';

const Reviews = ({ user, gameId }) => {
  const [{ gameReviews, limit, page, sortBy, rating }, setState] = useSetState({
    gameReviews: [],
    limit: 5,
    page: 1,
    sortBy: '-createdAt',
    rating: 0
  });

  useEffect(() => {
    const getReviews = async () => {
      console.log(rating);
      try {
        const ratingStr = Number(rating) === 0 ? '' : `&rating=${rating}`;
        console.log(ratingStr);
        const response = await axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/games/${gameId}/reviews?sort=${sortBy}&limit=${limit}&page=${page}${ratingStr}`
        });

        setState({ gameReviews: response.data.reviews });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getReviews();
  }, [limit, page, sortBy, rating]);

  const addReview = review => {
    setState({ gameReviews: [review, ...gameReviews] });
  };

  const onChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  return (
    <section aria-labelledby="reviews-subheading">
      <ReviewHeading id="reviews-subheading">User reviews</ReviewHeading>

      {!!user && (
        <div>
          <Accordion title="+Add Your Review">
            <GameReviewForm
              userName={user.name}
              userPhoto={user.photo}
              gameId={gameId}
              addReview={addReview}
            />
          </Accordion>
        </div>
      )}

      <FilterBar>
        <Label
          htmlFor="filter-number-of-reviews"
          style={{ marginRight: '.5rem' }}
        >
          Show:
        </Label>
        <select
          id="filter-number-of-reviews"
          value={limit}
          name="limit"
          onChange={onChange}
        >
          <option value={5}>5 on page</option>
          <option value={10}>10 on page</option>
          <option value={15}>15 on page</option>
          <option value={20}>20 on page</option>
        </select>

        <Label htmlFor="filter-review-rating" style={{ marginRight: '.5rem' }}>
          Rating:
        </Label>
        <select
          id="filter-review-rating"
          value={rating}
          name="rating"
          onChange={onChange}
        >
          <option value={0}>All</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <Label htmlFor="filter-order-reviews">Order by:</Label>
        <select
          id="filter-order-reviews"
          value={sortBy}
          name="sortBy"
          onChange={onChange}
        >
          <option value="-rating, -createdAt">Highest rating</option>
          <option value="-createdAt">Date</option>
          <option value="-likes">Most helpful</option>
        </select>
      </FilterBar>

      <ul>
        {gameReviews &&
          gameReviews.map(review => {
            const {
              createdAt,
              description,
              likes,
              dislikes,
              rating,
              title,
              id,
              user: { name, photo }
            } = review;

            return (
              <ReviewContainer key={id}>
                <ReviewCard
                  date={new Date(createdAt).toDateString()}
                  description={description}
                  reviewLikes={likes}
                  reviewDislikes={dislikes}
                  rating={rating}
                  title={title}
                  user={user}
                  userName={name}
                  userPhoto={photo}
                  reviewId={id}
                />
              </ReviewContainer>
            );
          })}
      </ul>
    </section>
  );
};

Reviews.propTypes = {
  user: shape({
    name: string.isRequired,
    photo: string.isRequired
  }).isRequired,

  gameId: string.isRequired
};

export default Reviews;
