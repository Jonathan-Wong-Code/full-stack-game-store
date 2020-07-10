import React, { useEffect } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../src/selectors/auth';

import {
  SubHeading,
  Detail,
  DetailList,
  DescriptionDetailsSection,
  DescriptionContainer,
  FilterBar,
  GameDetailsContainer,
  GameBanner,
  GameTitle,
  InnerBanner,
  GameCardContainer,
  GameTitleCardContainer,
  GameTitleContainer,
  GameTitleRating,
  Img,
  ImgGallery,
  ImgContainer,
  ReviewContainer,
  PlayButton,
  ReviewHeading
} from '../../pagesStyles/games.css';

import Accordion from '../../src/components/Accordion';
import GalleryModal from '../../src/components/GalleryModal';
import GameReviewForm from '../../src/components/GameReviewForm';
import PurchaseGameCard from '../../src/components/PurchaseGameCard';
import ReviewCard from '../../src/components/ReviewCard';
import { Wrapper } from '../../src/components/Wrapper';

import useWindowWidth from '../../src/hooks/useWindowWidth';
import useSetState from '../../src/hooks/useSetState';

import { renderArrayText } from '../../src/utils/utils';

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

  const {
    company,
    coverImage,
    coverImageSmall,
    description,
    genre,
    operatingSystems,
    reviews,
    title,
    price,
    releaseDate,
    discount,
    averageRating,
    galleryImages,
    mobileGalleryImages,
    thumbnails,
    youtubeTrailerLink,
    id
  } = game;

  return (
    <section>
      {/* GAME BANNER SECTION */}

      <GameBanner
        className="backgroundimg"
        desktopImage={coverImage}
        mobileImage={coverImageSmall}
      >
        <InnerBanner>
          {windowWidth > 576 && <PlayButton onClick={openVideoModal} />}
          <GameCardContainer>
            <PurchaseGameCard
              gameTitle={title}
              gamePrice={price}
              gameDiscount={discount}
            />
          </GameCardContainer>
        </InnerBanner>
      </GameBanner>

      {/* GAME TITLE AND RATING */}
      <Wrapper>
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

        {/* DESCRIPTION AND SPECS */}
        <DescriptionDetailsSection>
          <DescriptionContainer>
            <SubHeading>Description</SubHeading>
            <p>{description}</p>
          </DescriptionContainer>
          <GameDetailsContainer>
            <SubHeading>Game details</SubHeading>
            <DetailList>
              <Detail>
                Genre:
                <span>{renderArrayText(genre)} </span>
              </Detail>
              <Detail>
                Release date:
                <span>{new Date(releaseDate).toDateString()}</span>
              </Detail>
              <Detail>
                Company: <span>{company}</span>
              </Detail>
              <Detail>
                Operating Systems:
                <span>{renderArrayText(operatingSystems)}</span>
              </Detail>
            </DetailList>
          </GameDetailsContainer>
        </DescriptionDetailsSection>

        {/* REVIEWS */}
        <section aria-labelledby="reviews-subheading">
          <ReviewHeading id="reviews-subheading">User reviews</ReviewHeading>
          {!!user && (
            <FilterBar>
              <Accordion title="+Add Your Review">
                <GameReviewForm
                  userName={user.name}
                  userPhoto={user.photo}
                  gameId={id}
                />
              </Accordion>
            </FilterBar>
          )}

          <ul>
            {gameReviews &&
              gameReviews.map(review => {
                const {
                  createdAt,
                  description,
                  likes,
                  dislikes,
                  rating,
                  title,
                  id,
                  user: { name, photo }
                } = review;

                return (
                  <ReviewContainer key={id}>
                    <ReviewCard
                      date={new Date(createdAt).toDateString()}
                      description={description}
                      reviewLikes={likes.length}
                      reviewDislikes={dislikes.length}
                      rating={rating}
                      title={title}
                      userName={name}
                      userPhoto={photo}
                    />
                  </ReviewContainer>
                );
              })}
          </ul>
        </section>
      </Wrapper>
    </section>
  );
};

export default GamePage;
