import React from "react";

import { Cart } from "../../assets/icons";
import { number, string } from "prop-types";

import {
  Container,
  GameInformation,
  GameTitle,
  PriceInformation,
  Img,
} from "./css";

import IconButton from "../IconButton";

import { formatPercentage } from "../../utils/utils";
import PriceInfo from "../PriceInfo";

const GameCard = ({ gameDiscount, gameTitle, gamePrice, imgSource }) => {
  const discount = gameDiscount
    ? formatPercentage(gameDiscount, gamePrice)
    : undefined;
  return (
    <Container aria-labelledby="game-title">
      <div>
        <Img src={imgSource} alt={`image for ${gameTitle}`} />
      </div>

      <GameInformation aria-label="Game information">
        <GameTitle id="game-title">{gameTitle}</GameTitle>

        <PriceInformation>
          <PriceInfo
            gamePrice={gamePrice}
            discount={discount}
            gameDiscount={gameDiscount}
            gameTitle={gameTitle}
          />

          <IconButton
            description={`Click to add ${gameTitle} to cart`}
            Icon={Cart}
            variants="secondary"
            onClick={undefined}
          />
        </PriceInformation>
      </GameInformation>
    </Container>
  );
};

GameCard.propTypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number,
  imgSource: string.isRequired,
};

GameCard.defaultProps = {
  gameDiscount: null,
};

export default GameCard;
