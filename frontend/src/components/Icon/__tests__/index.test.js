import React from 'react';
import { renderTheme } from '../../../utils/testUtils';
import { ArrowLeft } from '../../../assets/icons';
import Icon from '..';

describe('<Icon />', () => {
  it('renders', () => {
    renderTheme(
      <Icon>
        <ArrowLeft />
      </Icon>
    );
  });
});
