import React from 'react';
import { render } from '@testing-library/react';
import Accordion from '..';

const Child = () => <h2>Accordion Content</h2>;

describe('<Accordion />', () => {
  it('renders', () => {
    render(
      <Accordion title="title">
        <Child />
      </Accordion>
    );
  });
});
