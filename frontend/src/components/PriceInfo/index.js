import React from "react";
import { PriceHighlight } from "../PriceHighlight";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { PriceFlexBox } from "./css";
import { number, string } from "prop-types";
import GamePrice from "../GamePrice";
import { formatPercentage } from "../../utils/utils";
const PriceInfo = ({
  gameTitle,
  gameDiscount,
  gamePrice,
  isLarge,
  discountColor,
}) => {
  const discount = gameDiscount
    ? formatPercentage(gameDiscount, gamePrice)
    : undefined;

  return (
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
};

PriceInfo.proptypes = {
  gameDiscount: number.isRequired,
  gamePrice: number.isRequired,
  discount: number.isRequired,
  gameTitle: string.isRequired,
};

export default PriceInfo;
