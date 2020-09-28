import React from 'react';
import axios from 'axios';
import { array } from 'prop-types';
import Head from 'next/head';

import Carousel from '../../src/components/Carousel';
import GameCard from '../../src/components/GameCard';
import { Wrapper } from '../../src/components/Wrapper';
import {
  GridContainer,
  GameCardSection,
  SectionHeading
} from '../../src/containers/homePage/index.css';

export async function getStaticProps() {
  const response = await axios.get(
    `${NEXT_PUBLIC_API_URL}/api/v1/games?fields=title,averageRating,cardPhoto,price,discount,coverImage,coverImageSmall,isFeatured,promoText&isFrontPage=true`
  );

  const { games } = response.data;

  const featuredGames = games.filter(game => game.isFeatured);

  return {
    props: {
      featuredGames,
      games
    }
  };
}

function Homepage({ featuredGames, games }) {
  if (!games || !featuredGames) return null;
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
        <Carousel slides={featuredGames} />
      </div>

      <GameCardSection aria-labelledby="game-card-heading">
        <Wrapper>
          <SectionHeading id="game-card-heading">
            Games Now available!
          </SectionHeading>
          <GridContainer>
            {games.map(game => (
              <li key={game.id}>
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
  games: array.isRequired
};

export default Homepage;
