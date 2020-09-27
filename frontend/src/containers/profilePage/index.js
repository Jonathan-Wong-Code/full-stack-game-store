import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import {
  Section,
  H2,
  ImgContainer,
  Img,
  Content,
  P,
  StyledLink,
  Grid
} from './css';
import { selectAuthUser } from '../../selectors/auth';
import GameCard from '../../components/GameCard';

const Profile = () => {
  const user = useSelector(selectAuthUser);
  if (!user) return null;
  return (
    <>
      <Section aria-labelledby="my-profile-header">
        <Content className="content">
          <H2 id="my-profile-header">My Profile</H2>
          <ImgContainer>
            <Img src={user.photo} alt="Your profile img" />
          </ImgContainer>
          <P>Username: {user.name}</P>
          <P>Email: {user.email}</P>
          <Link href="/edit-profile" as="/edit-profile">
            <StyledLink>Edit Profile</StyledLink>
          </Link>
        </Content>
      </Section>
      {user.wishlist?.length > 0 && (
        <Section>
          <H2 id="my-profile-header">My Wishlist</H2>
          <Grid>
            {user.wishlist.map(item => {
              const { title, price, discount, id, coverImageSmall } = item;
              return (
                <GameCard
                  key={id}
                  gameTitle={title}
                  gamePrice={price}
                  gameDiscount={discount}
                  gameId={id}
                  imgSource={coverImageSmall}
                />
              );
            })}
          </Grid>
        </Section>
      )}
    </>
  );
};

export default Profile;
