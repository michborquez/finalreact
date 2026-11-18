import { useState } from "react";
import styled from "styled-components";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { Btn } from "./ui/index.jsx";
import { theme as t } from "../styles/theme.js";

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Controles = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${t.borde};
  border-radius: 999px;
  overflow: hidden;

  button {
    width: 40px;
    height: 40px;
    border: none;
    background: ${t.rosaSuave};
    color: ${t.rosa};
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: ${t.rosaClaro};
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  output {
    min-width: 44px;
    text-align: center;
    font-weight: 600;
  }
`;

export default function ItemCount({ stock, onAdd }) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <Contenedor>
      <Controles>
        <button
          type="button"
          aria-label="Restar uno"
          disabled={cantidad <= 1}
          onClick={() => setCantidad((c) => c - 1)}
        >
          <FaMinus aria-hidden="true" />
        </button>
        <output aria-live="polite">{cantidad}</output>
        <button
          type="button"
          aria-label="Sumar uno"
          disabled={cantidad >= stock}
          onClick={() => setCantidad((c) => c + 1)}
        >
          <FaPlus aria-hidden="true" />
        </button>
      </Controles>
      <Btn disabled={stock === 0} onClick={() => onAdd(cantidad)}>
        <FaCartPlus aria-hidden="true" /> Agregar al carrito
      </Btn>
    </Contenedor>
  );
}
