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
      <CarouselPanel />
    </>
  );
}
