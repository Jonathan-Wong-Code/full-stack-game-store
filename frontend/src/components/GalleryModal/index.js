import React from 'react';

import { string, func, array, number } from 'prop-types';
import { Thumbnails, ThumbNailImg, Button, ImgContainer } from './css';
import Modal from '../Modal';

import useSetState from '../../hooks/useSetState';
import Arrow from '../CenteredArrow';
import spacing from '../../../theme/spacing';

const GalleryModal = ({
  gameTitle,
  closeModal,
  thumbnails,
  galleryImages,
  index
}) => {
  const [{ currentActiveImg }, setState] = useSetState({
    currentActiveImg: index
  });

  const displayNextImg = () => {
    const getNextImage = () =>
      currentActiveImg === galleryImages.length - 1 ? 0 : currentActiveImg + 1;

    setState({ currentActiveImg: getNextImage() });
  };

  const displayPrevImg = () => {
    const getPrevImage = () =>
      currentActiveImg === 0 ? galleryImages.length - 1 : currentActiveImg - 1;

    setState({ currentActiveImg: getPrevImage() });
  };

  return (
    <Modal closeModal={closeModal}>
      <ImgContainer>
        <img
          src={galleryImages[currentActiveImg]}
          alt={`Gameplay from ${gameTitle}`}
        />
        <Arrow
          direction="left"
          handleClick={displayPrevImg}
          left={`-${spacing[10]}`}
          description="Previous image"
        />
        <Arrow
          direction="right"
          handleClick={displayNextImg}
          right={`-${spacing[10]}`}
          isFocusedOnMount
          description="Next image"
        />
      </ImgContainer>
      <Thumbnails>
        {thumbnails.map((img, i) => (
          <Button
            type="button"
            key={img}
            onClick={() => setState({ currentActiveImg: i })}
            data-testid="modal-gallery-thumbnail-button"
          >
            <ThumbNailImg
              src={img}
              alt="Gallery preview image"
              active={currentActiveImg === i}
              data-testid="modal-gallery-thumbnail"
            />
          </Button>
        ))}
      </Thumbnails>
    </Modal>
  );
};

GalleryModal.propTypes = {
  gameTitle: string.isRequired,
  closeModal: func.isRequired,
  thumbnails: array.isRequired,
  galleryImages: array.isRequired,
  index: number.isRequired
};

export default GalleryModal;
