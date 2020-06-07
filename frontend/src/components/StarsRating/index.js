import React from "react";
import ScreenReaderOnly from "../ScreenReaderOnly";
import Icon from "../Icon";
import { StarFilled, StarUnfilled } from "../../assets/icons";
import { StarsContainer } from "./css";
import { useThemeContext } from "../../context/themeContext";
const Stars = ({ rating }) => {
  const theme = useThemeContext();
  const getFilledStars = () => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon iconColor={theme.primaryLight} variants="small">
          <StarFilled />
        </Icon>
      );
    }

    return stars.map((star) => star);
  };

  const getUnfilledStars = () => {
    const unfilledStars = 5 - rating;

    const stars = [];

    for (let i = 0; i < unfilledStars; i++) {
      stars.push(
        <Icon iconColor={theme.primaryLight} variants="small">
          <StarUnfilled />
        </Icon>
      );
    }

    return stars.map((star) => star);
  };

  return (
    <StarsContainer>
      <ScreenReaderOnly>
        The rating for this review is: {rating} out of 5
      </ScreenReaderOnly>
      {getFilledStars()}
      {getUnfilledStars()}
    </StarsContainer>
  );
};

export default Stars;
