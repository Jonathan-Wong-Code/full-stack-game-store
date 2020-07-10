import React from 'react';
import axios from 'axios';
import { array } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';

import Carousel from '../../src/components/Carousel';
import GameCard from '../../src/components/GameCard';
import { Wrapper } from '../../src/components/Wrapper';
import {
  GridContainer,
  GameCardSection,
  SectionHeading
} from '../../pagesStyles/index.css';

export async function getStaticProps() {
  const response = await axios.get(
    'http://localhost:5000/api/v1/games?fields=title,averageRating,cardPhoto,price,discount,coverImage,coverImageSmall,isFeatured,promoText&isFrontPage=true'
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
      coverImage: 'https://eskipaper.com/images/skyrim-wallpaper-3.jpg',
      coverImageSmall: 'https://eskipaper.com/images/skyrim-wallpaper-3.jpg'
    },
    {
      ...games[0],
      coverImage:
        'https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261',
      coverImageSmall:
        'https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261'
    },
    games[0],
    {
      ...games[0],
      discount: 20,
      coverImage:
        'https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261',
      coverImageSmall:
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
      <Wrapper>
        <h1>Welcome to Full Stack Gamers!</h1>
      </Wrapper>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Carousel slides={testGames} />
      </div>

      <GameCardSection aria-labelledby="game-card-heading">
        <Wrapper>
          <SectionHeading id="game-card-heading">
            Games Now available!
          </SectionHeading>
          <GridContainer>
            {testGames.map(game => (
              <li key={uuidv4()}>
                <GameCard
                  gameDiscount={game.discount}
                  gameTitle={game.title}
                  gamePrice={game.price}
                  imgSource={game.coverImageSmall}
                  gameId={game.id}
                />
              </li>
            ))}
          </GridContainer>
        </Wrapper>
      </GameCardSection>
    </div>
  );
}

Homepage.propTypes = {
  featuredGames: array.isRequired,
  nonFeaturedGames: array.isRequired
};

export default Homepage;
