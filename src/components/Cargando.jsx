import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import { theme as t } from "../styles/theme.js";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 3rem 0;
  color: ${t.gris};
`;

export default function Cargando({ texto = "Cargando..." }) {
  return (
    <Contenedor role="status" aria-live="polite">
      <Spinner animation="border" style={{ color: t.rosa }} />
      <span>{texto}</span>
    </Contenedor>
  );
}
