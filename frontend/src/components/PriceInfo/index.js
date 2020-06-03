import React from "react";
import { formatPricing } from "../../utils/utils";
import { PriceHighlight } from "../PriceHighlight";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { PriceFlexBox, Prices, OriginalGamePrice, FinalGamePrice } from "./css";
import { number, string } from "prop-types";
import GamePrice from "../GamePrice";
const PriceInfo = ({
  gameTitle,
  gameDiscount,
  discount,
  gamePrice,
  isLarge,
  discountColor,
}) => (
  <PriceFlexBox style={{ display: "flex" }}>
    {gameDiscount && (
      <PriceHighlight modifiers={isLarge ? "large" : null}>
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

PriceInfo.proptypes = {
  gameDiscount: number.isRequired,
  gamePrice: number.isRequired,
  discount: number.isRequired,
  gameTitle: string.isRequired,
};

export default PriceInfo;
