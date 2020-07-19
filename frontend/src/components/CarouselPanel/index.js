import React from 'react';
import { bool, string, number } from 'prop-types';

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
  tabIndex
}) => {
  const renderButtons = isAddToCart =>
    isAddToCart ? (
      <SecondaryBtnWithIcon
        Icon={Cart}
        buttonText={buttonText}
        variants={['large', 'fullWidth']}
        tabIndex={tabIndex}
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
  tabIndex: number
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
