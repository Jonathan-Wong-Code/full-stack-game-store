import React from 'react';
import { number, string } from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ReactGa from 'react-ga';

import { addItemToCart } from '../../actions/cart';
import { Cart } from '../../assets/icons';
import { selectCartItems } from '../../selectors/cart';
import {
  Container,
  GameInformation,
  GameTitle,
  PriceInformation,
  Img,
  ImgContainer
} from './css';

import IconButton from '../IconButton';

import { formatPercentage } from '../../utils/utils';
import PriceInfo from '../PriceInfo';
// Done for next link
/* eslint-disable jsx-a11y/anchor-is-valid */

const GameCard = ({
  gameDiscount,
  gameTitle,
  gamePrice,
  imgSource,
  gameId
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const discount = gameDiscount
    ? formatPercentage(gameDiscount, gamePrice)
    : undefined;

  const onAddItemClick = e => {
    e.stopPropagation();

    ReactGa.event({
      category: 'Add to Cart Button',
      action: `Added ${gameTitle} to cart from game card.`
    });

    dispatch(
      addItemToCart({
        title: gameTitle,
        price: gamePrice - gameDiscount,
        originalPrice: gamePrice,
        image: imgSource,
        id: gameId
      })
    );
  };

  return (
    <Container aria-labelledby="game-title">
      <Link href="/games/[gameId]" as={`/games/${gameId}`} passHref>
        <a>
          <ImgContainer>
            <Img src={imgSource} alt={`A promotional image for ${gameTitle}`} />
          </ImgContainer>
        </a>
      </Link>

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
            onClick={onAddItemClick}
            disabled={cartItems.some(item => item.id === gameId)}
          />
        </PriceInformation>
      </GameInformation>
    </Container>
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
