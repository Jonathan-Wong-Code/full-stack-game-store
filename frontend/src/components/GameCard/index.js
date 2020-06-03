import React from "react";

import { Cart } from "../../assets/icons";
import { number, string } from "prop-types";

import { Container, GameInformation, GameTitle, PriceInformation } from "./css";

import IconButton from "../IconButton";

import { formatPercentage } from "../../utils/utils";
import PriceInfo from "../PriceInfo";
import GamePrice from "../GamePrice";
import PriceHighlight from "../PriceHighlight";

const GameCard = ({
  gameDiscount,
  gameTitle = "Fallout 3",
  gamePrice = 60,
  imgSource = "https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261",
}) => {
  const discount = gameDiscount
    ? formatPercentage(gamePrice - gameDiscount, gamePrice)
    : undefined;
  return (
    <Container aria-labelledby="game-title">
      <div>
        <img src={imgSource} alt={`image for ${gameTitle}`} />
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

GameCard.proptypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number,
  imgSource: string.isRequired,
};

GameCard.defaultProps = {
  gameDiscount: null,
};

export default GameCard;
