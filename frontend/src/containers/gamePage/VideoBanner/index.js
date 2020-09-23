import React from 'react';
import { string, func, number } from 'prop-types';

import { GameBanner, InnerBanner, PlayButton, GameCardContainer } from './css';
import PurchaseGameCard from '../../../components/PurchaseGameCard';

const VideoBanner = ({
  coverImage,
  coverImageSmall,
  windowWidth,
  openVideoModal,
  title,
  price,
  discount,
  gameId
}) => {
  return (
    <GameBanner
      className="backgroundimg"
      desktopImage={coverImage}
      mobileImage={coverImageSmall}
    >
      <InnerBanner>
        <PlayButton onClick={openVideoModal} />
        {windowWidth > 576 && (
          <GameCardContainer>
            <PurchaseGameCard
              gameTitle={title}
              gamePrice={price}
              gameDiscount={discount}
              gameId={gameId}
              gameImage={coverImageSmall}
            />
          </GameCardContainer>
        )}
      </InnerBanner>
    </GameBanner>
  );
};

VideoBanner.propTypes = {
  coverImage: string.isRequired,
  coverImageSmall: string,
  windowWidth: number,
  openVideoModal: func.isRequired,
  title: string.isRequired,
  price: number.isRequired,
  gameId: string.isRequired,
  discount: number
};

VideoBanner.defaultProps = {
  coverImageSmall: '',
  discount: 0,
  windowWidth: 1024
};

export default VideoBanner;
