import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderTheme } from '../../../utils/testUtils';

import mockData from './index.mock';
import GalleryModal from '..';

const closeModal = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe('GalleryModal', () => {
  it('renders initial Modal that can be closed.', () => {
    renderTheme(
      <>
        <div id="header">HEADER</div>
        <div id="root-page">
          <h2>root page</h2>
        </div>
        <GalleryModal {...mockData} closeModal={closeModal} />
      </>
    );
    const closeButton = screen.getByRole('button', { name: '✕' });

    fireEvent.click(closeButton);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('renders the correct image and styles as the images change via clicking arrows', () => {
    renderTheme(
      <>
        <div id="header">HEADER</div>
        <div id="root-page">
          <h2>root page</h2>
        </div>
        <GalleryModal {...mockData} closeModal={closeModal} />
      </>
    );
    const mainImage = screen.getByRole('img', {
      name: 'Gameplay from Anno 1800'
    });

    let thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    const nextButton = screen.getByRole('button', { name: 'Next image' });
    const prevButton = screen.getByRole('button', { name: 'Previous image' });

    expect(thumbnails.length).toBe(3);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[0]);
    expect(thumbnails[0]).toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).not.toHaveStyleRule('border', '3px solid white');

    fireEvent.click(nextButton);
    thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    expect(thumbnails[0]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).toHaveStyleRule('border', '3px solid white');
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[1]);

    fireEvent.click(nextButton);
    thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    expect(thumbnails[0]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).toHaveStyleRule('border', '3px solid white');
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[2]);

    fireEvent.click(nextButton);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[0]);

    fireEvent.click(prevButton);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[2]);

    fireEvent.click(prevButton);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[1]);

    fireEvent.click(prevButton);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[0]);
  });

  it('should display the correct image when the preview image is clicked', () => {
    renderTheme(
      <>
        <div id="header">HEADER</div>
        <div id="root-page">
          <h2>root page</h2>
        </div>
        <GalleryModal {...mockData} closeModal={closeModal} />
      </>
    );
    const mainImage = screen.getByRole('img', {
      name: 'Gameplay from Anno 1800'
    });

    let thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    const thumbnailButtons = screen.getAllByTestId(
      'modal-gallery-thumbnail-button'
    );

    expect(thumbnailButtons.length).toBe(3);
    expect(thumbnails.length).toBe(3);

    fireEvent.click(thumbnailButtons[0]);
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[0]);
    expect(thumbnails[0]).toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).not.toHaveStyleRule('border', '3px solid white');

    fireEvent.click(thumbnailButtons[1]);
    thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    expect(thumbnails[0]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).toHaveStyleRule('border', '3px solid white');
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[1]);

    fireEvent.click(thumbnailButtons[2]);
    thumbnails = screen.getAllByTestId('modal-gallery-thumbnail');
    expect(thumbnails[0]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[1]).not.toHaveStyleRule('border', '3px solid white');
    expect(thumbnails[2]).toHaveStyleRule('border', '3px solid white');
    expect(mainImage).toHaveAttribute('src', mockData.galleryImages[2]);
  });
});
