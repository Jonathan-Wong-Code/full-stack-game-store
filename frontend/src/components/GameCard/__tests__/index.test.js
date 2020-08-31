import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderAllProviders } from '../../../utils/testUtils';
import GameCard from '../index';
import { addCartItem } from '../../../actions/cart';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

const mockData = {
  gameDiscount: 20,
  gameTitle: 'test-title',
  gamePrice: 80,
  imgSource: 'test-image',
  gameId: 'id123'
};

describe('<GameCard>', () => {
  it('renders a GameCard that adds a game to the cart', () => {
    renderAllProviders(<GameCard {...mockData} />);

    const buyButton = screen.getByRole('button', {
      name: 'Click to add test-title to cart'
    });

    fireEvent.click(buyButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: addCartItem().type,
      payload: {
        price: 60,
        title: 'test-title',
        originalPrice: 80,
        image: 'test-image',
        id: 'id123'
      }
    });
  });

  it('should not be able to add a game to the cart if its already in the cart', () => {
    renderAllProviders(<GameCard {...mockData} />, null, {
      cart: {
        cartItems: [
          {
            price: 60,
            title: 'test-title',
            originalPrice: 80,
            image: 'test-image',
            id: 'id123'
          }
        ]
      }
    });

    const buyButton = screen.getByRole('button', {
      name: 'Click to add test-title to cart'
    });

    expect(buyButton).toBeDisabled();
    fireEvent.click(buyButton);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
