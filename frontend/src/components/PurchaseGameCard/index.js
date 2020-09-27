import React from 'react';
import { string, number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ReactGa from 'react-ga';

import { Container, ButtonContainer } from './css';
import PriceInfo from '../PriceInfo';
import { Cart, HeartUnfilled, HeartFilled } from '../../assets/icons';
import { PrimaryBtnWithIcon, SecondaryBtnWithIcon } from '../ButtonWithIcons';
import ScreenReaderOnly from '../ScreenReaderOnly';

import { selectCartItems } from '../../selectors/cart';
import { addItemToCart } from '../../actions/cart';
import {
  addItemToWishlist,
  removeItemFromWishlist
} from '../../actions/wishlist';
import {
  selectAuthUserWishlist,
  selectAuthLoading
} from '../../selectors/auth';
const PurchaseGameCard = props => {
  const dispatch = useDispatch();
  const {
    gamePrice = 60,
    gameDiscount = 40,
    gameTitle,
    gameId,
    gameImage
  } = props;
  const loading = useSelector(selectAuthLoading);

  const cartItems = useSelector(selectCartItems);
  const wishlist = useSelector(selectAuthUserWishlist);

  const handleAddCartItem = () => {
    ReactGa.event({
      category: 'Add to Cart Button',
      action: `Added ${gameTitle} to cart from game page`
    });

    dispatch(
      addItemToCart({
        title: gameTitle,
        price: gamePrice - gameDiscount,
        originalPrice: gamePrice,
        image: gameImage,
        id: gameId
      })
    );

    dispatch(removeItemFromWishlist(gameId));
  };

  const handleAddWishlist = () => {
    ReactGa.event({
      category: 'Add to Wishlist Button',
      action: `Added ${gameTitle} to cart from the wishlist`
    });

    dispatch(addItemToWishlist(gameId));
  };

  const handleRemoveFromWishlist = () => {
    ReactGa.event({
      category: 'Remove from Wishlist Button',
      action: `Removed ${gameTitle} to cart from the wishlist`
    });

    dispatch(removeItemFromWishlist(gameId));
  };

  const gameIsInCart = cartItems.some(item => item.id === gameId);
  const gameIsInWishlist =
    wishlist && wishlist.some(item => item.id === gameId);
  return (
    <Container aria-labelledby="purchase-game-information">
      <ScreenReaderOnly>
        <h2 id="purchase-game-information">
          Pricing information for {gameTitle}
        </h2>
      </ScreenReaderOnly>

      <PriceInfo
        gamePrice={gamePrice}
        gameDiscount={gameDiscount}
        gameTitle={gameTitle}
        isLarge
      />
      <ButtonContainer>
        <SecondaryBtnWithIcon
          Icon={Cart}
          buttonText={gameIsInCart ? 'Added to Cart!' : 'Add to Cart'}
          handleClick={handleAddCartItem}
          disabled={gameIsInCart}
        />
        {!gameIsInCart && (
          <PrimaryBtnWithIcon
            disabled={loading}
            Icon={gameIsInWishlist ? HeartUnfilled : HeartFilled}
            primaryIcon
            buttonText={gameIsInWishlist ? 'Wishlisted!' : 'Add to Wishlist'}
            handleClick={
              gameIsInWishlist ? handleRemoveFromWishlist : handleAddWishlist
            }
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

PurchaseGameCard.propTypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number.isRequired,
  gameId: string.isRequired,
  gameImage: string.isRequired
};

export default PurchaseGameCard;
