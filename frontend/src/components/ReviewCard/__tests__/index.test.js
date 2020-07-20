import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';

import { renderAllProviders } from '../../../utils/testUtils';
import ReviewCard from '..';
import mockData from './index.mock';

jest.mock('axios');

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
});
