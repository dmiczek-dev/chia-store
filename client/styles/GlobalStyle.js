import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    font-family: Roboto, Helvetica, Arial, sans-serif;

    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }
`;
