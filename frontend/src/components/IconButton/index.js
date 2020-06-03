import React from "react";
import ScreenReaderOnly from "../ScreenReaderOnly";
import IconComponent from "../Icon";
import { Button } from "./css";
import { func, string } from "prop-types";
import { defaultTheme } from "../../../theme/themes";

//Look in ./css.js for variants = the modifiers.
const IconButton = ({ Icon, onClick = () => {}, description, variants }) => {
  return (
    <Button onClick={onClick} modifiers={variants}>
      <ScreenReaderOnly>{description}</ScreenReaderOnly>
      <IconComponent iconColor={defaultTheme.textInverted}>
        <Icon />
      </IconComponent>
    </Button>
  );
};

IconButton.proptypes = {
  Icon: func.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  variant: string,
};

IconButton.defaultProps = {
  variant: "",
};
export default IconButton;
