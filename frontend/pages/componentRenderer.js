import React from 'react';
import {
  BaseButton,
  PrimaryButton,
  PrimaryInvertedButton,
  SecondaryInvertedButton,
  SecondaryButton
} from '../src/components/Buttons';

import CarouselPanel from '../src/components/CarouselPanel';

import GameCard from '../src/components/GameCard';

import { PriceHighlight } from '../src/components/PriceHighlight';
import PurchaseGameCard from '../src/components/PurchaseGameCard';

import { Cart, HeartUnfilled } from '../src/assets/icons';

import {
  PrimaryBtnWithIcon,
  SecondaryBtnWithIcon
} from '../src/components/ButtonWithIcons';

import IconButton from '../src/components/IconButton';

import ReviewCard from '../src/components/ReviewCard';

import GameReviewForm from '../src/components/GameReviewForm';

import Carousel from '../src/components/Carousel';

export default function ComponentRenderer() {
  return (
    <>
      <BaseButton disabled>Click</BaseButton>
      <PrimaryButton modifiers="large">Button</PrimaryButton>
      <PrimaryInvertedButton>Button</PrimaryInvertedButton>
      <SecondaryButton>Button</SecondaryButton>
      <SecondaryInvertedButton>Button</SecondaryInvertedButton>
      <PriceHighlight>-70%</PriceHighlight>
      <PriceHighlight modifiers="large">-70%</PriceHighlight>
      <GameCard
        gameDiscount={20}
        gameTitle="Fallout 3"
        gamePrice={60}
        imgSource="https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261"
      />
      <PurchaseGameCard
        gameTitle="Fallout 3"
        gamePrice={60}
        gameDiscount={40}
      />
      <PrimaryBtnWithIcon
        Icon={HeartUnfilled}
        primaryIcon
        buttonText="Button"
      />
      <SecondaryBtnWithIcon Icon={Cart} buttonText="Button" />
      <IconButton Icon={HeartUnfilled} description="A Heart" />
      <IconButton Icon={Cart} description="Add to Cart" variants="secondary" />
      <CarouselPanel
        promoText="Now available"
        offerDescription="The Elder Scrolls 5: Skyrim Available Now!"
        gamePrice={60}
        gameDiscount={40}
        gameImage='"https://eskipaper.com/images/skyrim-wallpaper-3.jpg"'
        isAddToCart
        buttonText="Add to Cart"
        hasButton
        textColorLight
        gameTitle="The Elder Scrolls 5: Skyrim"
      />
      <ReviewCard
        title="WOW!"
        description="I keep this rather short. This is the one game, when it was released that came very close to its great ancestor in terms of modern RPGs, Baldur's Gate II. The best thing you can do is to buy this great package and enjoy hundreds of hours this gem has to offer. But why does it only almost top BG? Well it lacks the depth of the original in my opinion. The Story has its flaws and the character system is a bit overburdened, it also focuses a bit too much on items. And the characters, while excellent on its own, don't have the same depth to it. Only few games that followed can claim the same thing and of course it is by far still the best Dragon Age of the series because it focus on the core mechanics of the genre and not on the eye candy."
        userName="Jon Deer"
        userPhoto="http://www.fillmurray.com/g/200/300"
        rating={4}
        date="Jan 7th 2007"
        reviewLikes={100}
        reviewDislikes={20}
      />
      <GameReviewForm />
      <Carousel />
    </>
  );
}
