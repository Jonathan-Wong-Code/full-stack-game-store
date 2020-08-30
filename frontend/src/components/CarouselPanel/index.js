import React from 'react';
import { bool, string, number } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  ContentFlexbox,
  H3,
  LeftSide,
  RightSide,
  PromoText,
  ButtonContainer
} from './css';

import { Cart } from '../../assets/icons';
import { selectCartItems } from '../../selectors/cart';
import { addCartItem } from '../../actions/cart';

import PriceInfo from '../PriceInfo';

import { PrimaryButton } from '../Buttons';
import { SecondaryBtnWithIcon } from '../ButtonWithIcons';

const CarouselPanel = ({
  promoText,
  gamePrice,
  gameDiscount,
  gameImage,
  isAddToCart,
  buttonText,
  textColorLight,
  gameTitle,
  tabIndex,
  gameId
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addToCart = () => {
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

  const isInCart = cartItems.some(item => item.id === gameId);

  const renderButtons = isAddToCart =>
    isAddToCart ? (
      <SecondaryBtnWithIcon
        Icon={Cart}
        buttonText={isInCart ? 'Added to Cart!' : buttonText}
        variants={['large', 'fullWidth']}
        tabIndex={tabIndex}
        handleClick={addToCart}
        disabled={isInCart}
      />
    ) : (
      <PrimaryButton>{buttonText}</PrimaryButton>
    );

  return (
    <Container gameImage={gameImage} textColorLight={textColorLight}>
      <ContentFlexbox>
        <LeftSide>
          {promoText && <PromoText>{promoText}</PromoText>}
          <H3>{gameTitle}</H3>
        </LeftSide>
        <RightSide gameDiscount={gameDiscount}>
          <PriceInfo
            gameDiscount={gameDiscount}
            gamePrice={gamePrice}
            gameTitle={gameTitle}
            isLarge
            discountColor="inherit"
          />
          <ButtonContainer gameDiscount={gameDiscount}>
            {buttonText && renderButtons(isAddToCart)}
          </ButtonContainer>
        </RightSide>
      </ContentFlexbox>
    </Container>
  );
};

CarouselPanel.propTypes = {
  /* Will render a button if there is buttonText */
  buttonText: string,
  gameImage: string.isRequired,
  gameDiscount: number,
  gamePrice: number,
  gameTitle: string,
  /* Dictates if the button should be an Add to Cart or regular button */
  isAddToCart: bool,
  promoText: string,
  textColorLight: bool,
  tabIndex: number,
  gameId: string.isRequired
};

CarouselPanel.defaultProps = {
  buttonText: '',
  gamePrice: null,
  gameDiscount: null,
  gameTitle: '',
  isAddToCart: true,
  promoText: '',
  textColorLight: true,
  tabIndex: 0
};

export default CarouselPanel;
