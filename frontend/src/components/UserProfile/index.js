import React from "react";
import { string } from "prop-types";
import { Img, ImgContainer, ProfileContainer } from "./css";

const UserProfile = ({ userPhoto, userName }) => (
  <ProfileContainer>
    <ImgContainer>
      <Img src={userPhoto} alt={`A profile picture for ${userName}`} />
    </ImgContainer>
    <p>{userName}</p>
  </ProfileContainer>
);

UserProfile.propTypes = {
  userName: string.isRequired,
  userPhoto: string.isRequired,
};

export default UserProfile;
