import { screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { renderTheme } from '../../../utils/testUtils';
import { PrimaryBtnWithIcon, SecondaryBtnWithIcon } from '..';

describe('<PrimaryBtnWithIcon>', () => {
  it('renders a clickable button', () => {
    const handleClick = jest.fn();

    renderTheme(
      <PrimaryBtnWithIcon
        Icon={() => ''}
        buttonText="test-text-1"
        tabIndex={0}
        disabled={false}
        handleClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: 'test-text-1' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('<SecondaryBtnWithIcon>', () => {
  it('renders a clickable button', () => {
    const handleClick = jest.fn();

    renderTheme(
      <SecondaryBtnWithIcon
        Icon={() => ''}
        buttonText="test-text-2"
        tabIndex={0}
        disabled={false}
        handleClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: 'test-text-2' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
