import React from "react";
import { Prices, OriginalGamePrice, FinalGamePrice } from "./css";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { formatPricing } from "../../utils/utils";
const GamePrice = ({ gameDiscount, gamePrice, isLarge, discountColor }) => (
  <Prices gameDiscount={gameDiscount} isLarge={isLarge}>
    {gameDiscount && (
      <>
        <ScreenReaderOnly>Original price is:</ScreenReaderOnly>{" "}
        <OriginalGamePrice isLarge={isLarge} discountColor={discountColor}>
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
);

export default GamePrice;
