import React from 'react';
import { renderAllProviders } from '../../../utils/testUtils';
import Footer from '..';

describe('<Footer />', () => {
  it('renders', () => {
    renderAllProviders(<Footer />);
  });
});
