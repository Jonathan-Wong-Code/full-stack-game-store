import React from 'react';
import { number, string, bool } from 'prop-types';

import { PriceHighlight } from '../PriceHighlight';
import ScreenReaderOnly from '../ScreenReaderOnly';
import { PriceFlexBox } from './css';
import GamePrice from '../GamePrice';
import { formatPercentage } from '../../utils/utils';

const PriceInfo = ({
  gameTitle,
  gameDiscount,
  gamePrice,
  isLarge,
  discountColor
}) => {
  const discount = gameDiscount
    ? formatPercentage(gameDiscount, gamePrice)
    : undefined;

  return (
    <PriceFlexBox style={{ display: 'flex' }}>
      {gameDiscount && (
        <PriceHighlight modifiers={isLarge ? 'large' : null}>
          <ScreenReaderOnly>Discount on {gameTitle} is</ScreenReaderOnly>-
          {discount}%
        </PriceHighlight>
      )}

      <GamePrice
        gameDiscount={gameDiscount}
        gamePrice={gamePrice}
        isLarge={isLarge}
        discountColor={discountColor}
      />
    </PriceFlexBox>
  );
};

PriceInfo.propTypes = {
  gameDiscount: number.isRequired,
  gamePrice: number.isRequired,
  gameTitle: string.isRequired,
  isLarge: bool,
  discountColor: string
};

PriceInfo.defaultProps = {
  isLarge: false,
  discountColor: null
};

export default PriceInfo;
