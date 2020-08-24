import React from 'react';

import { renderTheme } from '../../../utils/testUtils';
import UserProfile from '..';

describe('<UserProfile />', () => {
  it('renders', () => {
    renderTheme(<UserProfile userName="jon" userPhoto="testPhoto" />);
  });
});
