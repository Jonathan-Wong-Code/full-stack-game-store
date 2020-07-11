import React from 'react';
import { number, string } from 'prop-types';
import Link from 'next/link';

import { Cart } from '../../assets/icons';

import {
  Container,
  GameCardLink,
  GameInformation,
  GameTitle,
  PriceInformation,
  Img,
  ImgContainer
} from './css';

import IconButton from '../IconButton';

import { formatPercentage } from '../../utils/utils';
import PriceInfo from '../PriceInfo';

const GameCard = ({
  gameDiscount,
  gameTitle,
  gamePrice,
  imgSource,
  gameId
}) => {
  const discount = gameDiscount
    ? formatPercentage(gameDiscount, gamePrice)
    : undefined;
  return (
    <Link href={`/games/${gameId}`} as={`/games/${gameId}`} passHref>
      <GameCardLink>
        <Container aria-labelledby="game-title">
          <ImgContainer>
            <Img src={imgSource} alt={`A promotional image for ${gameTitle}`} />
          </ImgContainer>

          <GameInformation aria-label="Game information">
            <GameTitle id="game-title">{gameTitle}</GameTitle>

            <PriceInformation>
              <PriceInfo
                gamePrice={gamePrice}
                discount={discount}
                gameDiscount={gameDiscount}
                gameTitle={gameTitle}
              />

              <IconButton
                description={`Click to add ${gameTitle} to cart`}
                Icon={Cart}
                variants="secondary"
                onClick={e => {
                  e.stopPropagation();
                  console.log('hello');
                }}
              />
            </PriceInformation>
          </GameInformation>
        </Container>
      </GameCardLink>
    </Link>
  );
};

GameCard.propTypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number,
  imgSource: string.isRequired,
  gameId: string.isRequired
};

GameCard.defaultProps = {
  gameDiscount: null
};

export default GameCard;
