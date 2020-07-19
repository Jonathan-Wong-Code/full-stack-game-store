import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderTheme } from '../../../utils/testUtils';
import Arrow from '..';

const handleClick = jest.fn();

describe('<Arrow />', () => {
  it('renders as a left arrow', () => {
    renderTheme(
      <Arrow
        direction="left"
        left="20px"
        right="20px"
        handleClick={handleClick}
        description="previous"
      />
    );
    const buttonLeft = screen.getByRole('button', { name: 'previous' });
    const buttonRight = screen.queryByRole('button', { name: 'next' });
    const arrowComponent = screen.getByTestId('arrow-component');

    expect(buttonLeft).toBeDefined();
    expect(buttonRight).toBeNull();
    expect(arrowComponent).toHaveStyleRule('left', '20px');
    expect(arrowComponent).not.toHaveStyleRule('right', '20px');

    fireEvent.click(buttonLeft);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a right arrow', () => {
    renderTheme(
      <Arrow
        direction="right"
        right="20px"
        left="20px"
        handleClick={handleClick}
        description="next"
      />
    );
    const buttonLeft = screen.queryByRole('button', { name: 'previous' });
    const buttonRight = screen.getByRole('button', { name: 'next' });
    const arrowComponent = screen.getByTestId('arrow-component');

    expect(buttonLeft).toBeNull();
    expect(buttonRight).toBeDefined();
    expect(arrowComponent).toHaveStyleRule('right', '20px');
    expect(arrowComponent).not.toHaveStyleRule('left', '20px');

    fireEvent.click(buttonRight);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
