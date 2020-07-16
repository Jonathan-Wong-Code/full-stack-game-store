import { createGlobalStyle } from 'styled-components';
import { normalize, hideVisually } from 'polished';

import { primaryFont } from './typography';
import { defaultTheme } from './themes';
import 'what-input';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 16px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${primaryFont};
    background: ${defaultTheme.bodyBackground};
    color: ${defaultTheme.textColor};
    line-height: 1.5;
    margin: 0;
  }

 

  html, body, #__next {
    height: 100%;
  }

  #__next {
    display: flex;
    flex-direction: column;
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
    color: inherit;
    display: block;
  }

  button {
    background: none;
    cursor: pointer;
    border: none;
  }
  
  .screen-reader-only {
    ${hideVisually}
  }

  [data-whatintent='mouse'] *:focus {
    outline: none;
  }

  *:focus {
    outline: 5px solid blue;
  }

   @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

`;
