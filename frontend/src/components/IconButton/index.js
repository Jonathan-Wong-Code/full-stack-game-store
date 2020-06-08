import React, { useContext } from "react";
import ScreenReaderOnly from "../ScreenReaderOnly";
import IconComponent from "../Icon";
import { Button } from "./css";
import { func, string } from "prop-types";
import { ThemeContext, ThemeConsumer } from "styled-components";

//Look in ./css.js for variants = the modifiers.
const IconButton = ({ Icon, onClick = () => {}, description, variants }) => {
  const theme = useContext(ThemeContext);
  return (
    <Button onClick={onClick} modifiers={variants}>
      <ScreenReaderOnly>{description}</ScreenReaderOnly>
      <IconComponent iconColor={theme.textInverted}>
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
