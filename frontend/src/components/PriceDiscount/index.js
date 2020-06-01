import React from "react";
import { formatPricing } from "../../utils/utils";
import { PriceHighlight } from "../PriceHighlight";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { PriceFlexBox, Prices, OriginalGamePrice, FinalGamePrice } from "./css";
import { number, string } from "prop-types";

const PriceDiscount = ({
  gameTitle,
  gameDiscount,
  discount,
  gamePrice,
  isLarge,
}) => (
  <PriceFlexBox style={{ display: "flex" }}>
    {gameDiscount && (
      <PriceHighlight modifiers={isLarge ? "large" : null}>
        <ScreenReaderOnly>Discount on {gameTitle} is</ScreenReaderOnly>-
        {discount}%
      </PriceHighlight>
    )}

    <Prices gameDiscount={gameDiscount} isLarge={isLarge}>
      {gameDiscount && (
        <>
          <ScreenReaderOnly>Original price is:</ScreenReaderOnly>{" "}
          <OriginalGamePrice isLarge={isLarge}>
            {formatPricing(gamePrice, 2)}
          </OriginalGamePrice>
        </>
      )}

      <ScreenReaderOnly>Current price is:</ScreenReaderOnly>
      <FinalGamePrice isLarge={isLarge}>
        {gameDiscount ? (
          formatPricing(gameDiscount, 2)
        ) : (
          <PriceHighlight isLarge={isLarge}>
            {formatPricing(gamePrice, 2)}
          </PriceHighlight>
        )}
      </FinalGamePrice>
    </Prices>
  </PriceFlexBox>
);

PriceDiscount.proptypes = {
  gameDiscount: number.isRequired,
  gamePrice: number.isRequired,
  discount: number.isRequired,
  gameTitle: string.isRequired,
};

export default PriceDiscount;
