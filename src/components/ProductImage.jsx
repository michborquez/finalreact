import { useState } from "react";
import styled from "styled-components";

const Caja = styled.div`
  background: ${({ $color }) => $color};
  height: ${({ $alto }) => $alto};
  min-height: ${({ $minAlto }) => $minAlto};
  width: ${({ $ancho }) => $ancho};
  display: grid;
  place-items: center;
  font-size: ${({ $emoji }) => $emoji};
  overflow: hidden;
  border-radius: ${({ $radio }) => $radio};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Muestra la foto del producto o, si no tiene (o falla la URL), su emoji sobre color
export default function ProductImage({
  producto,
  alto = "170px",
  minAlto = "0",
  ancho = "100%",
  emoji = "4.5rem",
  radio = "0",
}) {
  const [falla, setFalla] = useState(false);
  const mostrarFoto = producto.imagen && !falla;

  return (
    <Caja
      $color={producto.color || "#fde2e4"}
      $alto={alto}
      $minAlto={minAlto}
      $ancho={ancho}
      $emoji={emoji}
      $radio={radio}
    >
      {mostrarFoto ? (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          onError={() => setFalla(true)}
        />
      ) : (
        <span role="img" aria-label={producto.nombre}>
          {producto.emoji || "🌸"}
        </span>
      )}
    </Caja>
  );
}
