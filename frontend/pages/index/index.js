import React from 'react';
import axios from 'axios';
import { array } from 'prop-types';

import Head from 'next/head';
import ComponentRenderer from '../componentRenderer';

export async function getStaticProps() {
  const response = await axios.get(
    'http://localhost:5000/api/v1/games?fields=title,averageRating,cardPhoto,price,discount,imageCover,imageCoverMobile,isFeatured,&isFrontPage=true'
  );

  const { games } = response.data;

  const featuredGames = games.filter(game => game.isFeatured);
  const nonFeaturedGames = games.filter(game => !game.isFeatured);
  return {
    props: {
      featuredGames,
      nonFeaturedGames
    }
  };
}

function Homepage({ featuredGames, nonFeaturedGames }) {
  console.log(featuredGames, nonFeaturedGames);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComponentRenderer />
    </div>
  );
}

Homepage.propTypes = {
  featuredGames: array.isRequired,
  nonFeaturedGames: array.isRequired
};

export default Homepage;
