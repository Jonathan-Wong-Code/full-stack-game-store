import React from 'react';

import { renderAllProviders } from '../../../utils/testUtils';
import PurchaseGameCard from '..';

describe('<PurchaseGameCard>', () => {
  it('renders with clickable buttons', () => {
    renderAllProviders(
      <PurchaseGameCard
        gamePrice={60}
        gameDiscount={20}
        gameTitle="World of Warcraft"
      />
    );
  });
});
