import styled from "styled-components";
import { Badge } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import ProductImage from "./ProductImage.jsx";
import { BtnLink } from "./ui/index.jsx";
import { formatPrecio } from "../utils/format.js";
import { theme as t } from "../styles/theme.js";

const Tarjeta = styled.article`
  background: #fff;
  border-radius: ${t.radio};
  overflow: hidden;
  box-shadow: ${t.sombra};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Cuerpo = styled.div`
  padding: 1.1rem 1.2rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

const Categoria = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${t.verde};
  font-weight: 600;
`;

const Titulo = styled.h3`
  font-size: 1.15rem;
  margin: 0;
`;

const Precio = styled.p`
  font-weight: 600;
  color: ${t.rosa};
  font-size: 1.1rem;
  margin: auto 0 0.4rem;
`;

// Tarjeta reutilizable: recibe los datos del producto por props
export default function Item({ id, nombre, categoria, precio, stock, emoji, color, imagen }) {
  return (
    <Tarjeta>
      <ProductImage producto={{ nombre, emoji, color, imagen }} />
      <Cuerpo>
        <Categoria>{categoria}</Categoria>
        <Titulo>{nombre}</Titulo>
        {stock === 0 && (
          <div>
            <Badge bg="secondary">Sin stock</Badge>
          </div>
        )}
        <Precio>{formatPrecio(precio)}</Precio>
        <BtnLink to={`/producto/${id}`} aria-label={`Ver detalle de ${nombre}`}>
          <FaEye aria-hidden="true" /> Ver detalle
        </BtnLink>
      </Cuerpo>
    </Tarjeta>
  );
}
