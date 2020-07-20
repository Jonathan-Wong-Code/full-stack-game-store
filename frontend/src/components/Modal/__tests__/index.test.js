import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderTheme } from '../../../utils/testUtils';
import Modal from '..';

const closeModal = jest.fn();

describe('<Modal />', () => {
  it('renders the Modal', () => {
    renderTheme(
      <Modal closeModal={closeModal}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
