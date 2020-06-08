import React from "react";
import { Prices, OriginalGamePrice, FinalGamePrice } from "./css";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { formatPricing } from "../../utils/utils";
import { PriceHighlight } from "../PriceHighlight";
const GamePrice = ({ gameDiscount, gamePrice, isLarge, discountColor }) => {
  const finalPrice = gamePrice - gameDiscount;

  return (
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
          formatPricing(finalPrice, 2)
        ) : (
          <PriceHighlight isLarge={isLarge}>
            {formatPricing(gamePrice, 2)}
          </PriceHighlight>
        )}
      </FinalGamePrice>
    </Prices>
  );
};

export default GamePrice;
