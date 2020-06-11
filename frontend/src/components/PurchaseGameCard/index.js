import React from "react";
import { formatPercentage } from "../../utils/utils";
import { Container, ButtonContainer } from "./css";
import PriceInfo from "../PriceInfo";
import { Cart, HeartUnfilled } from "../../assets/icons";
import { PrimaryBtnWithIcon, SecondaryBtnWithIcon } from "../ButtonWithIcons";
import { string, number } from "prop-types";
import ScreenReaderOnly from "../ScreenReaderOnly";

const PurchaseGameCard = ({ gamePrice = 60, gameDiscount = 40, gameTitle }) => {
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
        isLarge
      />
      <ButtonContainer>
        <SecondaryBtnWithIcon Icon={Cart} buttonText="Add to Cart" />
        <PrimaryBtnWithIcon
          Icon={HeartUnfilled}
          primaryIcon
          buttonText="Add to Wishlist"
        />
      </ButtonContainer>
    </Container>
  );
};

PurchaseGameCard.propTypes = {
  gameTitle: string.isRequired,
  gamePrice: number.isRequired,
  gameDiscount: number.isRequired,
};

export default PurchaseGameCard;
