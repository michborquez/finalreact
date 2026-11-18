import styled from "styled-components";
import { Pagination } from "react-bootstrap";
import { armarPaginas } from "../utils/paginacion.js";
import { theme as t } from "../styles/theme.js";

const Contenedor = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .pagination {
    --bs-pagination-color: ${t.rosa};
    --bs-pagination-hover-color: ${t.rosaOscuro};
    --bs-pagination-focus-color: ${t.rosaOscuro};
    --bs-pagination-active-bg: ${t.rosa};
    --bs-pagination-active-border-color: ${t.rosa};
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
  }
`;

export default function Paginador({ pagina, totalPaginas, onCambiar }) {
  if (totalPaginas <= 1) return null;

  return (
    <Contenedor aria-label="Paginación de productos">
      <Pagination>
        <Pagination.Prev
          disabled={pagina === 1}
          onClick={() => onCambiar(pagina - 1)}
          aria-label="Página anterior"
        />
        {armarPaginas(pagina, totalPaginas).map((item) =>
          item.gap ? (
            <Pagination.Ellipsis key={item.key} disabled />
          ) : (
            <Pagination.Item
              key={item.key}
              active={item.numero === pagina}
              onClick={() => onCambiar(item.numero)}
            >
              {item.numero}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          disabled={pagina === totalPaginas}
          onClick={() => onCambiar(pagina + 1)}
          aria-label="Página siguiente"
        />
      </Pagination>
    </Contenedor>
  );
}
