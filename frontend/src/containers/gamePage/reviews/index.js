import React, { useEffect } from 'react';
import { string, shape } from 'prop-types';
import axios from 'axios';

import {
  ReviewHeading,
  ReviewContainer,
  FilterBar,
  Label,
  Pagination,
  Section,
  Select,
  SelectContainer
} from './css';
import Accordion from '../../../components/Accordion';
import GameReviewForm from '../../../components/GameReviewForm';
import ReviewCard from '../../../components/ReviewCard';
import useSetState from '../../../hooks/useSetState';
import { useReviewState, useReviewDispatch } from './context';

import { ArrowRight, ArrowLeft } from '../../../assets/icons';
import IconButton from '../../../components/IconButton';

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
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/games/${gameId}/reviews?sort=${sortBy}&limit=${limit}&page=${page}${ratingStr}`,
          withCredentials: true
        });

        const { reviews, noUserReview, numTotalReviews } = response.data;
        setReviews(reviews, numTotalReviews, noUserReview);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, [limit, page, sortBy, rating]);

  const onChange = e => {
    setState({ [e.target.name]: e.target.value, page: 1 });
  };

  const totalNumPages = Math.ceil(numTotalReviews / limit);

  return (
    <Section aria-labelledby="reviews-subheading">
      <ReviewHeading id="reviews-subheading">User reviews</ReviewHeading>

      {/* REVIEW FORM */}
      {noUserReview && user && (
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
        <SelectContainer>
          <Label
            htmlFor="filter-number-of-reviews"
            style={{ marginRight: '.5rem' }}
          >
            Show:
          </Label>
          <Select
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
          </Select>
        </SelectContainer>
        <SelectContainer>
          <Label
            htmlFor="filter-review-rating"
            style={{ marginRight: '.5rem' }}
          >
            Rating:
          </Label>
          <Select
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
          </Select>
        </SelectContainer>
        <SelectContainer>
          <Label htmlFor="filter-order-reviews">Order by:</Label>
          <Select
            id="filter-order-reviews"
            value={sortBy}
            name="sortBy"
            onChange={onChange}
          >
            <option value="-rating, -createdAt">Highest rating</option>
            <option value="-createdAt">Date</option>
          </Select>
        </SelectContainer>
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
      <Pagination>
        <IconButton
          Icon={ArrowLeft}
          onClick={() => setState({ page: page - 1 })}
          description={`Go back to previous ${limit} reviews`}
          disabled={page === 1}
        />

        <IconButton
          Icon={ArrowRight}
          onClick={() => setState({ page: page + 1 })}
          description={`Go to next ${limit} reviews`}
          disabled={totalNumPages <= page}
        />
      </Pagination>
    </Section>
  );
};

Reviews.propTypes = {
  user: shape({
    name: string.isRequired,
    photo: string.isRequired
  }),

  gameId: string.isRequired
};

Reviews.defaultProps = {
  user: null
};

export default Reviews;
