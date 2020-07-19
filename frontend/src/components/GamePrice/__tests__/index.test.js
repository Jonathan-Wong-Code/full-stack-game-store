import React from 'react';
import { screen } from '@testing-library/react';
import { renderTheme } from '../../../utils/testUtils';
import GamePrice from '../index';

const mockData = {
  gameDiscount: 20,
  gamePrice: 60,
  isLarge: true,
  discountColor: 'blue'
};

describe('<GamePrice>', () => {
  it('renders', () => {
    renderTheme(<GamePrice {...mockData} />);
  });

  it('renders with a discount, gamePrice, and large modifier', () => {
    renderTheme(<GamePrice {...mockData} />);

    expect(
      screen.getByTestId('game-price-original-price-before-discount')
    ).toBeDefined();

    expect(screen.getByTestId('game-price-discounted-price')).toBeDefined();
    expect(screen.queryByTestId('game-price-no-discount-price')).toBeNull();
  });

  it('renders with no discount', () => {
    renderTheme(<GamePrice {...mockData} gameDiscount={0} />);

    expect(
      screen.queryByTestId('game-price-original-price-before-discount')
    ).toBeNull();

    expect(screen.queryByTestId('game-price-discounted-price')).toBeNull();
    expect(screen.getByTestId('game-price-no-discount-price')).toBeDefined();
  });
});
