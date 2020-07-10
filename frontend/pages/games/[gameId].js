import React, { useEffect } from 'react';
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
  ImgContainer
} from '../../pagesStyles/games.css';

import VideoBanner from '../../pagesContainers/gamePage/VideoBanner';
import GameDetails from '../../pagesContainers/gamePage/GameDetails';
import Reviews from '../../pagesContainers/gamePage/Reviews';

import GalleryModal from '../../src/components/GalleryModal';
import { Wrapper } from '../../src/components/Wrapper';

import useWindowWidth from '../../src/hooks/useWindowWidth';
import useSetState from '../../src/hooks/useSetState';

// SET STATIC PATHS
export async function getStaticPaths() {
  const response = await axios.get(
    'http://localhost:5000/api/v1/games?fields=id'
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
    url: `http://localhost:5000/api/v1/games/${context.params.gameId}`,
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
  const [
    { isOpen, modalType, modalLink, imgIndex, gameReviews },
    setState
  ] = useSetState({
    isOpen: false,
    showGameReviewForm: false,
    modalType: null,
    modalLink: null,
    imgIndex: 0,
    gameReviews: null
  });

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/games/${id}/reviews`
        });

        setState({ gameReviews: response.data.reviews });
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, []);

  const user = useSelector(selectAuthUser);
  const { windowWidth } = useWindowWidth();

  if (!game) return null;

  const openVideoModal = () =>
    setState({
      isOpen: true,
      modalType: 'video',
      modalLink: youtubeTrailerLink
    });

  const openImgModal = i =>
    setState({ isOpen: true, modalType: 'img', imgIndex: i });

  const closeModal = () =>
    setState({ isOpen: false, modalType: null, modalLink: null });

  const addReview = review => {
    setState({ gameReviews: [review, ...gameReviews] });
  };

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
    <section>
      {/* GAME BANNER SECTION */}
      <VideoBanner
        coverImage={coverImage}
        coverImageSmall={coverImageSmall}
        windowWidth={windowWidth}
        openVideoModal={openVideoModal}
        title={title}
        price={price}
        discount={discount}
      />

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
        <Reviews
          user={user}
          addReview={addReview}
          gameReviews={gameReviews}
          gameId={id}
        />
      </Wrapper>

      {/* MODAL */}
      {isOpen && windowWidth > 576 && (
        <GalleryModal
          type={modalType}
          mediaLink={modalLink}
          closeModal={closeModal}
          thumbnails={thumbnails}
          galleryImages={galleryImages}
          index={imgIndex}
        />
      )}
    </section>
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
    genre: string,
    mobileGalleryImages: array,
    operatingSystems: array,
    price: string.isRequired,
    title: string.isRequired,
    releaseDate: string.isRequired,
    thumbnails: arrayOf(string).isRequired,
    youtubeTrailerLink: string.isRequired
  }).isRequired
};

export default GamePage;
