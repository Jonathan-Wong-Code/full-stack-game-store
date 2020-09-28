import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { shape, string, array, number, arrayOf } from 'prop-types';

import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../src/selectors/auth';

import {
  GameTitle,
  GameTitleCardContainer,
  GameTitleContainer,
  GameTitleRating,
  Img,
  ImgGallery,
  ImgContainer,
  PurchaseCardContainer
} from '../../src/containers/gamePage/index.css';

import VideoBanner from '../../src/containers/gamePage/videoBanner';
import GameDetails from '../../src/containers/gamePage/gameDetails';
import Reviews from '../../src/containers/gamePage/reviews';
import GalleryModal from '../../src/components/GalleryModal';
import PurchaseGameCard from '../../src/components/PurchaseGameCard';
import { Wrapper } from '../../src/components/Wrapper';

import useWindowWidth from '../../src/hooks/useWindowWidth';
import useTheme from '../../src/hooks/useTheme';
import useSetState from '../../src/hooks/useSetState';
import useModal from '../../src/hooks/useModal';
import Modal from '../../src/components/Modal';
import { ReviewProvider } from '../../src/containers/gamePage/reviews/context';

// SET STATIC PATHS
export async function getStaticPaths() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/games?fields=title`
  );

  const paths = response.data.games.map(game => ({
    params: { gameId: game.id }
  }));

  return {
    paths,
    fallback: true
  };
}

// FETCH DATA FOR STATIC RENDER
export async function getStaticProps(context) {
  const response = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/games/${context.params.gameId}`,
    withCredentials: true
  });

  return {
    props: {
      game: response.data.game
    }
  };
}

// COMPONENT
const GamePage = ({ game }) => {
  const [{ isGalleryOpen, imgIndex }, setState] = useSetState({
    isGalleryOpen: false,
    showGameReviewForm: false,

    imgIndex: 0
  });

  const theme = useTheme();

  const user = useSelector(selectAuthUser);
  const { windowWidth } = useWindowWidth();

  const videoRef = useRef(null);

  const {
    toggleModal: toggleVideoModal,
    isOpen: isVideoModalOpen
  } = useModal();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.focus();
    }
  }, [isVideoModalOpen]);

  if (!game) return null;

  const openImgModal = i => setState({ isGalleryOpen: true, imgIndex: i });
  const closeModal = () => setState({ isGalleryOpen: false });

  const {
    company,
    coverImage,
    coverImageSmall,
    description,
    genre,
    operatingSystems,
    title,
    price,
    releaseDate,
    discount,
    averageRating,
    galleryImages,
    // mobileGalleryImages,
    thumbnails,
    youtubeTrailerLink,
    id
  } = game;

  return (
    <>
      <section id="root-page">
        {/* GAME BANNER SECTION */}
        <VideoBanner
          coverImage={coverImage}
          coverImageSmall={coverImageSmall}
          windowWidth={windowWidth}
          openVideoModal={toggleVideoModal}
          title={title}
          price={price}
          discount={discount}
          gameId={id}
        />

        {windowWidth < 576 && (
          <PurchaseCardContainer>
            <PurchaseGameCard
              gameTitle={title}
              gamePrice={price}
              gameDiscount={discount}
              gameId={id}
              gameImage={coverImageSmall}
            />
          </PurchaseCardContainer>
        )}

        <Wrapper>
          {/* GAME TITLE AND RATING */}
          <GameTitleCardContainer>
            <GameTitleContainer>
              <GameTitle>{title}</GameTitle>
              <GameTitleRating>Rating: {averageRating}/5</GameTitleRating>
            </GameTitleContainer>
          </GameTitleCardContainer>

          {/* GAME GALLERY */}
          <ImgGallery>
            {thumbnails.map((img, i) => (
              <ImgContainer key={img}>
                <button type="button" onClick={() => openImgModal(i)}>
                  <Img src={img} alt={`A thumbnail for ${title}`} key={img} />
                </button>
              </ImgContainer>
            ))}
          </ImgGallery>

          {/* DESCRIPTION AND SPECS */}
          <GameDetails
            description={description}
            genre={genre}
            releaseDate={releaseDate}
            company={company}
            operatingSystems={operatingSystems}
          />

          {/* REVIEWS */}
          <ReviewProvider>
            <Reviews user={user} gameId={id} />
          </ReviewProvider>
        </Wrapper>
      </section>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <Modal closeModal={toggleVideoModal}>
          <iframe
            ref={videoRef}
            src={youtubeTrailerLink}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            width={windowWidth > theme.breakpoints[0] ? '560' : windowWidth}
            height="315"
          />
        </Modal>
      )}
      {/* GALLERY MODAL */}
      {isGalleryOpen && (
        <GalleryModal
          closeModal={closeModal}
          thumbnails={thumbnails}
          galleryImages={galleryImages}
          index={imgIndex}
          gameTitle={title}
        />
      )}
    </>
  );
};

GamePage.propTypes = {
  game: shape({
    averageRating: number.isRequired,
    company: string,
    coverImage: string.isRequired,
    coverImageSmall: string.isRequired,
    description: string.isRequired,
    discount: number,
    galleryImages: arrayOf(string).isRequired,
    genre: arrayOf(string),
    mobileGalleryImages: array,
    operatingSystems: array,
    price: number.isRequired,
    title: string.isRequired,
    releaseDate: string.isRequired,
    thumbnails: arrayOf(string).isRequired,
    youtubeTrailerLink: string.isRequired
  }).isRequired
};

export default GamePage;
