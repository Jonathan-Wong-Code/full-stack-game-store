import React from 'react';
import { string, number } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Container, ButtonContainer } from './css';
import PriceInfo from '../PriceInfo';
import { Cart, HeartUnfilled } from '../../assets/icons';
import { PrimaryBtnWithIcon, SecondaryBtnWithIcon } from '../ButtonWithIcons';
import ScreenReaderOnly from '../ScreenReaderOnly';

import { selectCartItems } from '../../selectors/cart';
import { addCartItem } from '../../actions/cart';
const PurchaseGameCard = props => {
  const dispatch = useDispatch();

  const {
    gamePrice = 60,
    gameDiscount = 40,
    gameTitle,
    gameId,
    gameImage
  } = props;
  const cartItems = useSelector(selectCartItems);

  const handleAddCartItem = () => {
    dispatch(
      addCartItem({
        title: gameTitle,
        price: gamePrice - gameDiscount,
        originalPrice: gamePrice,
        image: gameImage,
        id: gameId
      })
    );
  };

  const gameIsInCart = cartItems.some(item => item.id === gameId);

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
            Icon={HeartUnfilled}
            primaryIcon
            buttonText="Add to Wishlist"
            handleClick={() => {}}
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
