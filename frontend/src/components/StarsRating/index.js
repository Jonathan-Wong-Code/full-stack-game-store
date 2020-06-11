import React from "react";
import { number } from "prop-types";

import ScreenReaderOnly from "../ScreenReaderOnly";
import Icon from "../Icon";
import { StarFilled, StarUnfilled } from "../../assets/icons";
import { StarsContainer } from "./css";
import { v4 as uuidv4 } from "uuid";
import useTheme from "../../hooks/useTheme";

const StarsRating = ({ rating }) => {
  const theme = useTheme();
  const getFilledStars = () => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon iconColor={theme.primaryLight} variants="small" key={uuidv4()}>
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
        <Icon iconColor={theme.primaryLight} variants="small" key={uuidv4()}>
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

StarsRating.propTypes = {
  rating: number.isRequired,
};

export default StarsRating;
