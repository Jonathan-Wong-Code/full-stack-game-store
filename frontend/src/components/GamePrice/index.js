import React from 'react';
import { number, bool, string } from 'prop-types';

import { Prices, OriginalGamePrice, FinalGamePrice } from './css';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { formatPricing } from '../../utils/utils';
import { PriceHighlight } from '../PriceHighlight';
const GamePrice = ({ gameDiscount, gamePrice, isLarge, discountColor }) => {
  const finalPrice = gamePrice - gameDiscount;

  return (
    <Prices gameDiscount={gameDiscount} isLarge={isLarge}>
      {!!gameDiscount && (
        <>
          <ScreenReaderOnly>Original price is:</ScreenReaderOnly>
          <OriginalGamePrice isLarge={isLarge} discountColor={discountColor}>
            {formatPricing(gamePrice, 2)}
          </OriginalGamePrice>
        </>
      )}
      <ScreenReaderOnly>Current price is:</ScreenReaderOnly>
      <FinalGamePrice isLarge={isLarge}>
        {gameDiscount && gameDiscount > 0 ? (
          <p> {formatPricing(finalPrice, 2)}</p>
        ) : (
          <PriceHighlight modifiers={isLarge && 'large'}>
            {formatPricing(gamePrice, 2)}
          </PriceHighlight>
        )}
      </FinalGamePrice>
    </Prices>
  );
};

GamePrice.propTypes = {
  gameDiscount: number,
  gamePrice: number.isRequired,
  isLarge: bool,
  discountColor: string
};

GamePrice.defaultProps = {
  gameDiscount: null,
  isLarge: false,
  discountColor: null
};

export default GamePrice;
