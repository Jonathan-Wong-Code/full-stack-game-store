import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderAllProviders } from '../../../utils/testUtils';
import GameCard from '../index';

const mockData = {
  gameDiscount: 20,
  gameTitle: 'test-title',
  gamePrice: 80,
  imgSource: 'test-image',
  gameId: 'id123'
};

describe('<GameCard>', () => {
  it('renders a GameCard', () => {
    renderAllProviders(<GameCard {...mockData} />);

    const buyButton = screen.getByRole('button', {
      name: 'Click to add test-title to cart'
    });

    fireEvent.click(buyButton);
  });
});
