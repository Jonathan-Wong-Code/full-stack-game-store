import React from "react";
import {
  BaseButton,
  PrimaryButton,
  PrimaryInvertedButton,
  SecondaryInvertedButton,
  SecondaryButton,
} from "../src/components/Buttons";

import CarouselPanel from "../src/components/CarouselPanel";

import GameCard from "../src/components/GameCard";

import { PriceHighlight } from "../src/components/PriceHighlight";
import PurchaseGameCard from "../src/components/PurchaseGameCard";

import { Cart, HeartUnfilled } from "../src/assets/icons";

import {
  PrimaryIconButton,
  SecondaryIconButton,
} from "../src/components/ButtonWithIcons";

import IconButton from "../src/components/IconButton";

import ReviewCard from "../src/components/ReviewCard";

import { Input } from "../src/components/Input/Input";

export default function ComponentRenderer(props) {
  return (
    <>
      <BaseButton disabled>Click</BaseButton>
      <PrimaryButton modifiers="large">Button</PrimaryButton>
      <PrimaryInvertedButton>Button</PrimaryInvertedButton>
      <SecondaryButton>Button</SecondaryButton>
      <SecondaryInvertedButton>Button</SecondaryInvertedButton>
      <PriceHighlight>-70%</PriceHighlight>
      <PriceHighlight modifiers="large">-70%</PriceHighlight>
      <GameCard gameDiscount={40} />
      <PurchaseGameCard
        gameTitle="Fallout 3"
        gamePrice={60}
        gameDiscount={40}
      />
      <PrimaryIconButton Icon={HeartUnfilled} primaryIcon buttonText="Button" />
      <SecondaryIconButton Icon={Cart} buttonText="Button" />
      <IconButton Icon={HeartUnfilled} description="A Heart" />
      <IconButton Icon={Cart} description="Add to Cart" variants="secondary" />
      <CarouselPanel
        promoText="Now available"
        offerDescription="The Elder Scrolls 5: Skyrim Available Now!"
        gamePrice={60}
        gameDiscount={40}
        gameImage='"https://eskipaper.com/images/skyrim-wallpaper-3.jpg"'
        isAddToCart={true}
        buttonText="Add to Cart"
        hasButton={true}
        textColorLight={true}
        gameTitle="The Elder Scrolls 5: Skyrim"
      />
      <ReviewCard
        title="WOW!"
        description="I keep this rather short. This is the one game, when it was released that came very close to its great ancestor in terms of modern RPGs, Baldur's Gate II. The best thing you can do is to buy this great package and enjoy hundreds of hours this gem has to offer. But why does it only almost top BG? Well it lacks the depth of the original in my opinion. The Story has its flaws and the character system is a bit overburdened, it also focuses a bit too much on items. And the characters, while excellent on its own, don't have the same depth to it. Only few games that followed can claim the same thing and of course it is by far still the best Dragon Age of the series because it focus on the core mechanics of the genre and not on the eye candy."
      />
      <Input />
    </>
  );
}
