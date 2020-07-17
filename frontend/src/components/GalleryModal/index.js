import React, { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { string, func, array, number } from 'prop-types';
import { Thumbnails, ThumbNailImg, Button, ImgContainer } from './css';
import Modal from '../Modal';

import useSetState from '../../hooks/useSetState';
import Arrow from '../CenteredArrow';
import spacing from '../../../theme/spacing';
const GalleryModal = ({
  mediaLink,
  type,
  gameTitle,
  closeModal,
  thumbnails,
  galleryImages,
  index
}) => {
  const [{ currentActiveImg }, setState] = useSetState({
    currentActiveImg: index
  });

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.focus();
    }
  }, []);

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
      {type === 'img' ? (
        <>
          <ImgContainer>
            <img
              src={galleryImages[currentActiveImg]}
              alt={`Gameplay from ${gameTitle}`}
            />
            <Arrow
              direction="left"
              handleClick={displayPrevImg}
              left={`-${spacing[10]}`}
            />
            <Arrow
              direction="right"
              handleClick={displayNextImg}
              right={`-${spacing[10]}`}
              isFocusedOnMount
            />
          </ImgContainer>
          <Thumbnails>
            {thumbnails.map((img, i) => (
              <Button
                type="button"
                key={uuidv4()}
                onClick={() => setState({ currentActiveImg: i })}
              >
                <ThumbNailImg
                  src={img}
                  alt="Gallery preview image"
                  active={currentActiveImg === i}
                />
              </Button>
            ))}
          </Thumbnails>
        </>
      ) : (
        <iframe
          ref={videoRef}
          src={mediaLink}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          width="560"
          height="315"
        />
      )}
    </Modal>
  );
};

GalleryModal.propTypes = {
  mediaLink: string,
  type: string,
  gameTitle: string.isRequired,
  closeModal: func.isRequired,
  thumbnails: array.isRequired,
  galleryImages: array.isRequired,
  index: number.isRequired
};

GalleryModal.defaultProps = {
  mediaLink: '',
  type: ''
};

export default GalleryModal;
