import React from 'react';
import { screen } from '@testing-library/react';
import { renderTheme } from '../../../utils/testUtils';
import PriceInfo from '..';

describe('<PriceInfo />', () => {
  it('renders the discount percentage', () => {
    renderTheme(
      <PriceInfo
        gameTitle="Ashes of Creation"
        gameDiscount={20}
        gamePrice={60}
        isLarge
        discountColor="purple"
      />
    );

    expect(
      screen.getByTestId('price-high-light-discount-percent')
    ).toBeDefined();
  });

  it('does not render the discount percentage', () => {
    renderTheme(
      <PriceInfo
        gameTitle="Ashes of Creation"
        gameDiscount={0}
        gamePrice={60}
        isLarge
        discountColor="purple"
      />
    );

    expect(
      screen.queryByTestId('price-high-light-discount-percent')
    ).toBeNull();
  });
});
