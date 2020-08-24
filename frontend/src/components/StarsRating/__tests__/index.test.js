import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderAllProviders } from '../../../utils/testUtils';
import StarRating from '..';

const setRating = jest.fn();

describe('<StarRating />', () => {
  it('renders a static rating not meant for review', () => {
    renderAllProviders(
      <StarRating rating={4} tabIndex={0} setRating={setRating} />
    );
  });

  it('renders stars as buttons meant for review', () => {
    renderAllProviders(
      <StarRating rating={4} tabIndex={0} setRating={setRating} isForReview />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Set rating to 5 out of 5 stars. star-empty'
      })
    );

    expect(setRating).toHaveBeenCalledTimes(1);
  });
});
