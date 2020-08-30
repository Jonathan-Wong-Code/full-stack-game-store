import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderTheme } from '../../../utils/testUtils';
import Modal from '..';

const closeModal = jest.fn();

describe('<Modal />', () => {
  it('renders the Modal', () => {
    renderTheme(
      <>
        <div id="header">
          <h2>Header</h2>
        </div>
        <div id="root-page">
          <h2>root page</h2>
        </div>
        <Modal closeModal={closeModal}>
          <div>Modal Content</div>
        </Modal>
      </>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
