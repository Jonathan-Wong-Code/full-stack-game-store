import { createGlobalStyle } from "styled-components";
import { primaryFont } from "./typography";
import { normalize } from "polished";
import { defaultTheme } from "../theme/themes";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 16px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${primaryFont};
    background: ${defaultTheme.bodyBackground};
    color: ${defaultTheme.textColor};
  }

  ul, li {
    list-style-type: none;
  }

  img {
    display: block;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  button {
    background: none;
    cursor: pointer;
    border: none;
  }

`;
