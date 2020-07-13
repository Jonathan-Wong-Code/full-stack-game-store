import React, { useEffect } from 'react';
import { string, shape } from 'prop-types';
import axios from 'axios';

import { ReviewHeading, ReviewContainer, FilterBar, Label } from './css';
import Accordion from '../../../components/Accordion';
import GameReviewForm from '../../../components/GameReviewForm';
import ReviewCard from '../../../components/ReviewCard';
import useSetState from '../../../hooks/useSetState';
import { useReviewState, useReviewDispatch } from './context';

const Reviews = ({ user, gameId }) => {
  const [{ limit, page, sortBy, rating }, setState] = useSetState({
    limit: 5,
    page: 1,
    sortBy: '-createdAt',
    rating: 0
  });

  const { reviews, numTotalReviews, noUserReview } = useReviewState();
  const { setReviews } = useReviewDispatch();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const ratingStr = Number(rating) === 0 ? '' : `&rating=${rating}`;
        const response = await axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/games/${gameId}/reviews?sort=${sortBy}&limit=${limit}&page=${page}${ratingStr}`,
          withCredentials: true
        });
        const { reviews, noUserReview, numTotalReviews } = response.data;
        setReviews(reviews, numTotalReviews, noUserReview);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getReviews();
  }, [limit, page, sortBy, rating]);

  const onChange = e => {
    setState({ [e.target.name]: e.target.value, page: 1 });
  };

  const totalNumPages = Math.ceil(numTotalReviews / limit);

  return (
    <section aria-labelledby="reviews-subheading">
      <ReviewHeading id="reviews-subheading">User reviews</ReviewHeading>

      {/* REVIEW FORM */}
      {noUserReview && (
        <div>
          <Accordion title="+Add Your Review">
            <GameReviewForm
              userName={user.name}
              userPhoto={user.photo}
              userId={user.id}
              gameId={gameId}
              type="create"
            />
          </Accordion>
        </div>
      )}

      {/* FILTER BAR */}
      <FilterBar noUserReview={noUserReview}>
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
          <option value={1}>1 on page</option>
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
        </select>
      </FilterBar>

      {/* REVIEW LIST */}
      <ul>
        {reviews &&
          reviews.map(review => {
            const {
              createdAt,
              description,
              likes,
              dislikes,
              rating,
              title,
              id,
              user: { name, photo, id: reviewUserId }
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
                  reviewUserId={reviewUserId}
                  reviewId={id}
                  gameId={gameId}
                />
              </ReviewContainer>
            );
          })}
      </ul>

      {/* PAGINATION */}
      <div>
        {page > 1 && (
          <button type="button" onClick={() => setState({ page: page - 1 })}>
            prev
          </button>
        )}

        {totalNumPages > page && (
          <button type="button" onClick={() => setState({ page: page + 1 })}>
            next
          </button>
        )}
      </div>
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
