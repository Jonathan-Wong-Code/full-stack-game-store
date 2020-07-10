import React from 'react';
import { string, func, shape, array, number } from 'prop-types';

import { ReviewHeading, ReviewContainer } from './Reviews.css';
import Accordion from '../../src/components/Accordion';
import GameReviewForm from '../../src/components/GameReviewForm';
import ReviewCard from '../../src/components/ReviewCard';

const Reviews = ({ user, addReview, gameReviews, gameId }) => {
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
              id
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

  addReview: func.isRequired,

  gameReviews: shape({
    createdAt: string.isRequired,
    description: string.isRequired,
    likes: array.isRequired,
    dislikes: array.isRequired,
    rating: number.isRequired,
    title: string.isRequired,
    id: string.isRequired
  }).isRequired,

  gameId: string.isRequired
};

export default Reviews;
