import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { theme as t } from "../../styles/theme.js";

const variantes = {
  primary: css`
    background: ${t.rosa};
    border-color: ${t.rosa};
    color: #fff;
    &:hover:not(:disabled) {
      background: ${t.rosaOscuro};
      border-color: ${t.rosaOscuro};
      color: #fff;
    }
  `,
  outline: css`
    background: transparent;
    border-color: ${t.rosa};
    color: ${t.rosa};
    &:hover:not(:disabled) {
      background: ${t.rosaClaro};
      color: ${t.rosaOscuro};
    }
  `,
  danger: css`
    background: transparent;
    border-color: #f1b5b5;
    color: #b42318;
    &:hover:not(:disabled) {
      background: #fff0f0;
      color: #b42318;
    }
  `,
};

const botonCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: ${({ $sm }) => ($sm ? "0.35rem 0.8rem" : "0.6rem 1.2rem")};
  font-size: ${({ $sm }) => ($sm ? "0.85rem" : "0.95rem")};
  font-weight: 600;
  line-height: 1.2;
  border: 2px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  ${({ $variant = "primary" }) => variantes[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Botón de acción (por defecto type="button" para no enviar formularios sin querer)
export const Btn = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  ${botonCss}
`;

// Link de react-router con aspecto de botón
export const BtnLink = styled(Link)`
  ${botonCss}
`;

export const TituloSeccion = styled.h2`
  font-size: 1.9rem;
  text-align: center;
  margin-bottom: 0.3rem;
`;

export const Subtitulo = styled.p`
  text-align: center;
  color: ${t.gris};
  margin-bottom: 1.8rem;
`;

export const Tarjeta = styled.div`
  background: #fff;
  border-radius: ${t.radio};
  box-shadow: ${t.sombra};
  padding: 1.5rem;
`;
