import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Lexend', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffffff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  /* Adicione outros estilos globais aqui */
`;

export default GlobalStyles;