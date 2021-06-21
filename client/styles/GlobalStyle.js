import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    //font-size: 62.5%;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    font-family: 'Roboto', sans-serif;

    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: 'Roboto', sans-serif;
    background-color: transparent;
    color: inherit;
    text-decoration: initial;
  }

  h1, h2, h3, h4, p, span, img, figure {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;

  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  /**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input { /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select { /* 1 */
    text-transform: none;
  }

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
`;
