import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { renderAllProviders } from '../../../utils/testUtils';
import mockData, { createData, updateData } from './index.mock';
import GameReviewForm from '../index';

jest.mock('axios');

describe('<GameReviewForm />', () => {
  it('renders', () => {
    renderAllProviders(<GameReviewForm {...mockData} />);
  });

  it('has a functional form for creation', async () => {
    axios.mockImplementationOnce(() => Promise.resolve(createData));

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

  it('renders form errors when validation criteria are not met', async () => {
    renderAllProviders(<GameReviewForm {...mockData} />, {
      reviews: [createData.data.review]
    });

    const title = screen.getByLabelText('Enter review title:');
    const description = screen.getByLabelText('Enter review description:');
    const form = screen.getByTestId('game-review-form-form');

    userEvent.type(title, 'hello this is my test title');
    userEvent.clear(title);
    expect(title).toHaveValue('');
    expect(
      screen.getByTestId('game-review-form-error-title-desktop')
    ).toBeDefined();

    userEvent.type(description, 'hello');
    fireEvent.submit(form);

    await waitFor(() =>
      expect(
        screen.getByTestId('game-review-form-error-description')
      ).toBeDefined()
    );
  });

  it('renders form errors on mobile when validation criteria are not met', async () => {
    renderAllProviders(<GameReviewForm {...mockData} />, {
      reviews: [createData.data.review]
    });

    window.innerWidth = 400;

    await waitFor(() => window.dispatchEvent(new Event('resize')));
    const title = screen.getByLabelText('Enter review title:');
    const description = screen.getByLabelText('Enter review description:');
    const form = screen.getByTestId('game-review-form-form');

    userEvent.type(title, 'hello this is my test title');
    userEvent.clear(title);
    expect(title).toHaveValue('');

    userEvent.type(description, 'hello');
    fireEvent.submit(form);

    await waitFor(() =>
      expect(
        screen.getByTestId('game-review-form-error-description')
      ).toBeDefined()
    );

    expect(
      screen.getByTestId('game-review-form-error-title-mobile')
    ).toBeDefined();
  });

  it('returns an error from the api', async () => {
    const error = {
      response: {
        data: {
          message: 'Error'
        }
      }
    };
    axios.mockImplementationOnce(() => Promise.reject(error));

    renderAllProviders(<GameReviewForm {...mockData} />, {
      reviews: [createData.data.review]
    });

    const title = screen.getByLabelText('Enter review title:');
    const description = screen.getByLabelText('Enter review description:');
    const form = screen.getByTestId('game-review-form-form');
    userEvent.type(title, 'hello this is my test title');
    userEvent.type(description, 'hello this is my test description');
    fireEvent.click(screen.getByTestId('unfilled-star-3'));

    fireEvent.submit(form);
    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));

    const errorMsg = screen.getByTestId('game-review-form-error-review-api');
    expect(errorMsg).toBeDefined();
    expect(errorMsg).toHaveTextContent('Error: Error');
  });

  it('allows the form to perform update api calls.', async () => {
    const { rating, title, description } = updateData.data.review;
    const newData = {
      ...mockData,
      title,
      description,
      initialRating: rating,
      type: 'update',
      reviewId: 'reviewId'
    };

    axios.mockImplementationOnce(() => Promise.resolve(updateData));

    renderAllProviders(<GameReviewForm {...newData} />, {
      reviews: [createData.data.review]
    });

    const titleInput = screen.getByLabelText('Enter review title:');
    const descriptionInput = screen.getByLabelText('Enter review description:');
    const form = screen.getByTestId('game-review-form-form');
    userEvent.type(titleInput, 'hello');
    expect(titleInput).toHaveValue('Hello!hello');

    userEvent.type(descriptionInput, '!!!');
    expect(descriptionInput).toHaveValue('This is my brand new review!!!');

    fireEvent.submit(form);
    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));
    expect(axios).toHaveBeenCalledWith({
      method: 'PATCH',
      url: `http://localhost:5000/api/v1/reviews/reviewId`,
      withCredentials: true,
      data: {
        title: 'Hello!hello',
        description: 'This is my brand new review!!!',
        rating: 5
      }
    });
  });
});
