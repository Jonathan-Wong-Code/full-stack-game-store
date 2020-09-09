import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { Section, H2, ImgContainer, Img, Content, P, StyledLink } from './css';
import { selectAuthUser } from '../../selectors/auth';
const Profile = () => {
  const user = useSelector(selectAuthUser);
  if (!user) return null;
  return (
    <Section>
      <Content className="content">
        <H2>My Profile</H2>
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
  );
};

export default Profile;
