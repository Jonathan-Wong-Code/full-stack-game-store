import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { renderAllProviders } from '../../../utils/testUtils';
import mockData, { createData } from './index.mock';
import GameReviewForm from '../index';

jest.mock('axios');

describe('<GameReviewForm />', () => {
  it('renders', () => {
    renderAllProviders(<GameReviewForm {...mockData} />);
  });

  it('has a functional form for creation', async () => {
    axios.mockImplementation(() => Promise.resolve(createData));

    renderAllProviders(<GameReviewForm {...mockData} />, {
      reviews: [createData.data.review]
    });

    const title = screen.getByLabelText('Enter review title:');
    const description = screen.getByLabelText('Enter review description:');
    const form = screen.getByTestId('game-review-form-form');
    userEvent.type(title, 'hello this is my test title');
    expect(title).toHaveValue('hello this is my test title');

    userEvent.type(description, 'hello this is my test description');
    expect(description).toHaveValue('hello this is my test description');

    fireEvent.click(screen.getByTestId('unfilled-star-3'));

    fireEvent.submit(form);
    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));

    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      url: `http://localhost:5000/api/v1/games/${mockData.gameId}/reviews`,
      withCredentials: true,
      data: {
        title: 'hello this is my test title',
        description: 'hello this is my test description',
        rating: 5,
        game: mockData.gameId
      }
    });
  });
});
