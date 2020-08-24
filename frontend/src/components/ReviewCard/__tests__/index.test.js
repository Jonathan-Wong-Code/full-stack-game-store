import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';

import { renderAllProviders } from '../../../utils/testUtils';
import ReviewCard from '..';
import mockData from './index.mock';

jest.mock('axios');

const contextState = {
  reviews: [
    {
      createdAt: '2020-07-18T02:40:01.848Z',
      _id: '5f13b046414a491d21935724',
      title: 'Hello this is my review',
      description: 'This is my review description',
      game: '5ef41462b5cad675c9d2594b',
      rating: 4,
      user: '5f0bc147f05f38196774d6d4',
      __v: 0,
      id: '5f13b046414a491d21935724'
    }
  ]
};

describe('<ReviewCard />', () => {
  it('renders an unowned review and can increase its likes and dislikes', async () => {
    axios.mockImplementationOnce(() => Promise.resolve());
    axios.mockImplementationOnce(() => Promise.resolve());

    renderAllProviders(<ReviewCard {...mockData} />);
    expect(screen.getByTestId('review-card-feedback-buttons')).toBeDefined();
    expect(screen.queryByTestId('review-card-no-feedback-buttons')).toBeNull();
    expect(screen.queryByTestId('review-card-modify-container')).toBeNull();
    expect(screen.queryByTestId('game-review-form-component')).toBeNull();

    const yesButton = screen.getByRole('button', { name: 'Yes' });
    const noButton = screen.getByRole('button', { name: 'No' });
    const feedback = screen.getByTestId('review-card-feedback-info');

    expect(feedback).toHaveTextContent('2 of 2 people found this helpful');

    fireEvent.click(yesButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));

    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      url: `http://localhost:5000/api/v1/reviews/${mockData.reviewId}/likes`,
      data: { review: mockData.reviewId },
      withCredentials: true
    });

    expect(yesButton).toBeDisabled();
    expect(feedback).toHaveTextContent('3 of 3 people found this helpful');

    fireEvent.click(noButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(2));

    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      url: `http://localhost:5000/api/v1/reviews/${mockData.reviewId}/dislikes`,
      data: { review: mockData.reviewId },
      withCredentials: true
    });

    expect(noButton).toBeDisabled();
    expect(feedback).toHaveTextContent('2 of 3 people found this helpful');
  });

  it('Should allow the user who wrote the review to delete it.', async () => {
    axios.mockImplementationOnce(() => Promise.resolve());
    const newData = {
      ...mockData,
      reviewUserId: 'id123',
      user: { ...mockData.user, id: 'id123' }
    };

    renderAllProviders(<ReviewCard {...newData} />, contextState);
    expect(screen.queryByTestId('review-card-feedback-buttons')).toBeNull();
    expect(screen.getByTestId('review-card-no-feedback-buttons')).toBeDefined();
    expect(screen.getByTestId('review-card-modify-container')).toBeDefined();
    expect(screen.queryByTestId('game-review-form-component')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));
    expect(axios).toHaveBeenCalledWith({
      method: 'DELETE',
      url: `http://localhost:5000/api/v1/reviews/${mockData.reviewId}`,
      withCredentials: true
    });
  });

  it('should render the game review form when the edit button is clicked', () => {
    const newData = {
      ...mockData,
      reviewUserId: 'id123',
      user: { ...mockData.user, id: 'id123' }
    };

    renderAllProviders(<ReviewCard {...newData} />, contextState);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.queryByTestId('review-card-component')).toBeNull();
    expect(screen.getByTestId('game-review-form-component')).toBeDefined();
  });

  it('should not show review feedback if user is not logged in', () => {
    const newData = {
      ...mockData,
      reviewUserId: 'id123',
      user: null
    };

    renderAllProviders(<ReviewCard {...newData} />, contextState);
    expect(screen.queryByTestId('review-card-feedback-buttons')).toBeNull();
    expect(screen.getByTestId('review-card-no-feedback-buttons')).toBeDefined();
    expect(screen.queryByTestId('review-card-modify-container')).toBeNull();
    expect(screen.queryByTestId('game-review-form-component')).toBeNull();
  });
});
