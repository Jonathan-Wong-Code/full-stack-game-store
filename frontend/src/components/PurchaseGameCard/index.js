import React from "react";
import { formatPercentage } from "../../utils/utils";
import { Container, ButtonContainer } from "./css";
import PriceInfo from "../PriceInfo";
import { Cart, HeartUnfilled } from "../../assets/icons";
import { PrimaryIconButton, SecondaryIconButton } from "../ButtonWithIcons";
import { string, number } from "prop-types";
import ScreenReaderOnly from "../ScreenReaderOnly";

const PurchaseGameCard = ({ gamePrice = 60, gameDiscount = 40, gameTitle }) => {
  const discount = formatPercentage(gamePrice - gameDiscount, gamePrice);

  return (
    <Container aria-labelledby="purchase-game-information">
      <ScreenReaderOnly>
        <h2 id="purchase-game-information">
          Pricing information for {gameTitle}
        </h2>
      </ScreenReaderOnly>

      <PriceInfo
        gamePrice={gamePrice}
        gameDiscount={gameDiscount}
        gameTitle={gameTitle}
        discount={discount}
        isLarge
      />
      <ButtonContainer>
        <SecondaryIconButton Icon={Cart} buttonText="Add to Cart" />
        <PrimaryIconButton
          Icon={HeartUnfilled}
          primaryIcon
          buttonText="Add to Wishlist"
        />
      </ButtonContainer>
    </Container>
  );
};

PurchaseGameCard.proptypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number.isRequired,
};

export default PurchaseGameCard;
