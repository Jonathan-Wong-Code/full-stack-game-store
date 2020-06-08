import { Img, ImgContainer, ProfileContainer } from "./css";

import React from "react";

const UserProfile = ({ userPhoto, userName }) => (
  <ProfileContainer>
    <ImgContainer>
      <Img src={userPhoto} alt={`A profile picture for ${userName}`} />
    </ImgContainer>
    <p>{userName}</p>
  </ProfileContainer>
);

export default UserProfile;
