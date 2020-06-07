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

import { bool, string, number } from "prop-types";

import PriceInfo from "../PriceInfo";
import { formatPercentage } from "../../utils/utils";

import { PrimaryButton } from "../Buttons";
import { SecondaryBtnWithIcon } from "../ButtonWithIcons";

const CarouselPanel = ({
  promoText,
  offerDescription,
  gamePrice,
  gameDiscount,
  gameImage,
  isAddToCart,
  buttonText,
  textColorLight,
  gameTitle,
}) => {
  const discount = formatPercentage(gamePrice - gameDiscount, gamePrice);

  const renderButtons = (isAddToCart) =>
    isAddToCart ? (
      <SecondaryBtnWithIcon
        Icon={Cart}
        buttonText={buttonText}
        variants="large fullWidth"
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
            {buttonText && renderButtons(isAddToCart)}
          </ButtonContainer>
        </RightSide>
      </ContentFlexbox>
    </Container>
  );
};

CarouselPanel.proptypes = {
  buttonText: string,
  gamePrice: number,
  gameDiscount: number,
  gameTitle: string,
  isAddToCart: bool,
  gameImage: string.isRequired,
  offerDescription: string.isRequired,
  promoText: string,
  textColorLight: bool,
};

CarouselPanel.defaultProps = {
  buttonText: "",
  gamePrice: null,
  gameDiscount: null,
  gameTitle: "",
  isAddToCart: true,
  promoText: "",
  textColorLight: true,
};

export default CarouselPanel;
