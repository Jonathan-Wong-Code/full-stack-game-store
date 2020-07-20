import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderTheme } from '../../../utils/testUtils';
import { ArrowLeft } from '../../../assets/icons';
import IconButton from '..';

const onClick = jest.fn();

describe('<IconButton />', () => {
  it('renders', () => {
    renderTheme(
      <IconButton
        Icon={ArrowLeft}
        onClick={onClick}
        description="test"
        variants={null}
      />
    );

    const button = screen.getByRole('button', { name: 'test' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
