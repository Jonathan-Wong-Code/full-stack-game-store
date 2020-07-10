import React from 'react';
import { string, func, number } from 'prop-types';

import {
  GameBanner,
  InnerBanner,
  PlayButton,
  GameCardContainer
} from './VideoBanner.css';
import PurchaseGameCard from '../../src/components/PurchaseGameCard';

const VideoBanner = ({
  coverImage,
  coverImageSmall,
  windowWidth,
  openVideoModal,
  title,
  price,
  discount
}) => {
  return (
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
  );
};

VideoBanner.propTypes = {
  coverImage: string.isRequired,
  coverImageSmall: string,
  windowWidth: number.isRequired,
  openVideoModal: func.isRequired,
  title: string.isRequired,
  price: number.isRequired,
  discount: number
};

VideoBanner.defaultProps = {
  coverImageSmall: '',
  discount: 0
};

export default VideoBanner;
