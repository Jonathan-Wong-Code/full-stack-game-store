import React from "react";
import ScreenReaderOnly from "../ScreenReaderOnly";
import IconComponent from "../Icon";
import { Button } from "./css";
import { func, string } from "prop-types";
const IconButton = ({ Icon, onClick = () => {}, description }) => {
  return (
    <Button onClick={onClick}>
      <ScreenReaderOnly>{description}</ScreenReaderOnly>
      <IconComponent>
        <Icon />
      </IconComponent>
    </Button>
  );
};

IconButton.proptypes = {
  Icon: func.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
};

export default IconButton;
