import { createGlobalStyle } from "styled-components";
import { theme as t } from "./theme.js";

const GlobalStyle = createGlobalStyle`
  :root {
    --bs-primary: ${t.rosa};
    --bs-primary-rgb: 214, 51, 108;
    --bs-link-color: ${t.rosa};
    --bs-link-hover-color: ${t.rosaOscuro};
  }

  body {
    font-family: "Poppins", system-ui, sans-serif;
    color: ${t.texto};
    background: ${t.rosaSuave};
  }

  h1, h2, h3 {
    font-family: "Playfair Display", Georgia, serif;
  }

  a {
    text-decoration: none;
  }

  :focus-visible {
    outline: 3px solid rgba(214, 51, 108, 0.45);
    outline-offset: 2px;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: ${t.rosa};
    box-shadow: 0 0 0 0.2rem rgba(214, 51, 108, 0.2);
  }
`;

export default GlobalStyle;
