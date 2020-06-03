//https://eskipaper.com/images/skyrim-wallpaper-3.jpg
import {
  Container,
  ContentFlexbox,
  H3,
  LeftSide,
  RightSide,
  PromoText,
  ButtonContainer,
} from "./css";

import { Cart } from "../../assets/icons";

import PriceInfo from "../PriceInfo";
import { formatPercentage } from "../../utils/utils";

import { PrimaryButton } from "../Buttons";
import { SecondaryIconButton } from "../ButtonWithIcons";

const CarouselPanel = ({
  promoText = "Now available",
  offerDescription = "The Elder Scrolls 5: Skyrim Available Now!",
  gamePrice = 60,
  gameDiscount = 40,
  gameImage = '"https://eskipaper.com/images/skyrim-wallpaper-3.jpg"',
  isAddToCart = true,
  buttonText = "Add to Cart",
  hasButton = true,
  textColorLight = true,
  gameTitle = "The Elder Scrolls 5: Skyrim",
}) => {
  const discount = formatPercentage(gamePrice - gameDiscount, gamePrice);

  const renderButtons = (isAddToCart) =>
    isAddToCart ? (
      <SecondaryIconButton
        Icon={Cart}
        buttonText={buttonText}
        variants="large"
      />
    ) : (
      <PrimaryButton>{buttonText}</PrimaryButton>
    );

  return (
    <Container gameImage={gameImage} textColorLight={textColorLight}>
      <ContentFlexbox>
        <LeftSide>
          {promoText && <PromoText>{promoText}</PromoText>}
          <H3>{offerDescription}</H3>
        </LeftSide>
        <RightSide>
          <PriceInfo
            gameDiscount={gameDiscount}
            gamePrice={gamePrice}
            discount={discount}
            gameTitle={gameTitle}
            isLarge
            discountColor="inherit"
          />
          <ButtonContainer>
            {hasButton && renderButtons(isAddToCart)}
          </ButtonContainer>
        </RightSide>
      </ContentFlexbox>
    </Container>
  );
};

export default CarouselPanel;
