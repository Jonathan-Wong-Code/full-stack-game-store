import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderAllProviders } from '../../../utils/testUtils';
import PurchaseGameCard from '..';
import { addCartItem } from '../../../actions/cart';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

afterEach(jest.clearAllMocks);

describe('<PurchaseGameCard>', () => {
  it('renders with clickable buttons', () => {
    renderAllProviders(
      <PurchaseGameCard
        gamePrice={60}
        gameDiscount={20}
        gameTitle="World of Warcraft"
        gameId="test id"
        gameImage="test image"
      />
    );
    const buyButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(buyButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: addCartItem().type,
      payload: {
        title: 'World of Warcraft',
        price: 40,
        originalPrice: 60,
        image: 'test image',
        id: 'test id'
      }
    });
  });

  it('should not be able to add a game to the cart if its already in the cart', () => {
    renderAllProviders(
      <PurchaseGameCard
        gamePrice={60}
        gameDiscount={20}
        gameTitle="World of Warcraft"
        gameId="test id"
        gameImage="test image"
      />,
      null,
      {
        cart: {
          cartItems: [
            {
              title: 'World of Warcraft',
              price: 40,
              originalPrice: 60,
              image: 'test image',
              id: 'test id'
            }
          ]
        }
      }
    );

    const buyButton = screen.getByRole('button', {
      name: 'Added to Cart!'
    });

    expect(buyButton).toBeDisabled();
    fireEvent.click(buyButton);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
