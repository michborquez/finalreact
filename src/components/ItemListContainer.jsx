import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";
import Seo from "./Seo.jsx";
import Item from "./Item.jsx";
import SearchBar from "./SearchBar.jsx";
import Paginador from "./Paginador.jsx";
import Cargando from "./Cargando.jsx";
import ErrorMensaje from "./ErrorMensaje.jsx";
import { Subtitulo, TituloSeccion } from "./ui/index.jsx";
import useProductos from "../hooks/useProductos.js";
import { CATEGORIAS } from "../utils/productos.js";
import { normalizar } from "../utils/texto.js";
import { theme as t } from "../styles/theme.js";

const PRODUCTOS_POR_PAGINA = 8;

const Portada = styled.section`
  background: linear-gradient(135deg, ${t.rosaClaro}, #fff);
  border-radius: ${t.radio};
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
  box-shadow: ${t.sombra};

  h1 {
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    color: ${t.rosa};
    margin-bottom: 0.6rem;
  }

  p {
    color: ${t.gris};
    max-width: 560px;
    margin: 0 auto;
  }
`;

const Filtros = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const Filtro = styled(Link)`
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  border: 1px solid ${t.borde};
  background: ${({ $activo }) => ($activo ? t.rosa : "#fff")};
  color: ${({ $activo }) => ($activo ? "#fff" : t.gris)};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: ${t.rosa};
    color: ${({ $activo }) => ($activo ? "#fff" : t.rosa)};
  }
`;

const Buscador = styled.div`
  max-width: 560px;
  margin: 0 auto 1.5rem;
`;

const Resultados = styled.p`
  text-align: center;
  color: ${t.gris};
  font-size: 0.9rem;
`;

const Vacio = styled.div`
  text-align: center;
  color: ${t.gris};
  padding: 2.5rem 0;

  svg {
    font-size: 3rem;
    margin-bottom: 0.8rem;
  }
`;

export default function ItemListContainer() {
  const { categoryId } = useParams();
  const { productos, loading, error, recargar } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  // Al cambiar de categoría o de búsqueda se vuelve a la primera página
  useEffect(() => {
    setPagina(1);
  }, [categoryId, busqueda]);

  const filtrados = useMemo(() => {
    const termino = normalizar(busqueda);
    return productos.filter((p) => {
      if (categoryId && p.categoria !== categoryId) return false;
      if (!termino) return true;
      return normalizar(`${p.nombre} ${p.categoria} ${p.descripcion}`).includes(termino);
    });
  }, [productos, categoryId, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PRODUCTOS_POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice(
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA,
    paginaActual * PRODUCTOS_POR_PAGINA
  );

  const categoria = CATEGORIAS.find((c) => c.id === categoryId);
  const titulo = categoryId ? categoria?.label ?? categoryId : "Nuestras Flores y Regalos";

  const cambiarPagina = (nueva) => {
    setPagina(nueva);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      <Seo
        titulo={categoryId ? titulo : "Inicio"}
        descripcion={
          categoryId
            ? `Mirá nuestra selección de ${titulo.toLowerCase()} en Petals & Co. Envíos a domicilio en CABA.`
            : undefined
        }
      />

      {!categoryId && (
        <Portada>
          <h1>Flores frescas & regalos con amor</h1>
          <p>
            Diseños florales exclusivos para alegrar los días de las personas
            que más querés.
          </p>
        </Portada>
      )}

      <TituloSeccion>{titulo}</TituloSeccion>
      <Subtitulo>Productos frescos y artesanales seleccionados para vos</Subtitulo>

      <Filtros>
        <Filtro to="/" $activo={!categoryId}>
          Todos
        </Filtro>
        {CATEGORIAS.map((c) => (
          <Filtro key={c.id} to={`/categoria/${c.id}`} $activo={c.id === categoryId}>
            {c.label}
          </Filtro>
        ))}
      </Filtros>

      <Buscador>
        <SearchBar valor={busqueda} onChange={setBusqueda} />
      </Buscador>

      {loading && <Cargando texto="Cargando productos..." />}
      {error && <ErrorMensaje mensaje={error} onReintentar={recargar} />}

      {!loading && !error && (
        <>
          <Resultados aria-live="polite">
            {filtrados.length === 1
              ? "1 producto encontrado"
              : `${filtrados.length} productos encontrados`}
          </Resultados>

          {filtrados.length === 0 ? (
            <Vacio>
              <FaBoxOpen aria-hidden="true" />
              <p>
                {productos.length === 0
                  ? "Todavía no hay productos cargados."
                  : "No encontramos productos que coincidan con tu búsqueda."}
              </p>
            </Vacio>
          ) : (
            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
              {visibles.map((p) => (
                <Col key={p.id}>
                  <Item {...p} />
                </Col>
              ))}
            </Row>
          )}

          <Paginador
            pagina={paginaActual}
            totalPaginas={totalPaginas}
            onCambiar={cambiarPagina}
          />
        </>
      )}
    </section>
  );
}
