import React from 'react';
import axios from 'axios';
import { array } from 'prop-types';

import Head from 'next/head';
// import ComponentRenderer from '../componentRenderer';
// import CarouselPanel from '../../src/components/CarouselPanel';
import Carousel from '../../src/components/Carousel';

export async function getStaticProps() {
  const response = await axios.get(
    'http://localhost:5000/api/v1/games?fields=title,averageRating,cardPhoto,price,discount,coverImage,coverImageSmall,isFeatured,&isFrontPage=true'
  );

  const { games } = response.data;

  const featuredGames = games.filter(game => game.isFeatured);
  const nonFeaturedGames = games.filter(game => !game.isFeatured);
  return {
    props: {
      featuredGames,
      nonFeaturedGames,
      games
    }
  };
}

function Homepage({ featuredGames, nonFeaturedGames, games }) {
  const testGames = [
    games[0],
    {
      ...games[0],
      coverImage: 'https://eskipaper.com/images/skyrim-wallpaper-3.jpg'
    },
    {
      ...games[0],
      coverImage:
        'https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261'
    },
    games[0]
  ];
  if (!games) return null;
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ComponentRenderer /> */}
      {/* {featuredGames.map(game => (
        <CarouselPanel
          key={game.id}
          promoText="Now available"
          offerDescription={`${game.title}`}
          gamePrice={game.price}
          gameDiscount={game.discount}
          gameImage={game.coverImage}
          isAddToCart
          buttonText="Add to Cart"
          hasButton
          textColorLight
          gameTitle={game.title}
        />
      ))} */}
      <Carousel slides={testGames} />
    </div>
  );
}

Homepage.propTypes = {
  featuredGames: array.isRequired,
  nonFeaturedGames: array.isRequired
};

export default Homepage;
