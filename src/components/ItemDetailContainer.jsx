import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import Seo from "./Seo.jsx";
import ItemCount from "./ItemCount.jsx";
import ProductImage from "./ProductImage.jsx";
import Cargando from "./Cargando.jsx";
import ErrorMensaje from "./ErrorMensaje.jsx";
import { BtnLink, Tarjeta } from "./ui/index.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { getProducto } from "../services/productosService.js";
import { mensajeError } from "../utils/firebaseErrors.js";
import { formatPrecio } from "../utils/format.js";
import { theme as t } from "../styles/theme.js";

const Volver = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
  color: ${t.rosa};
  font-weight: 500;
`;

const Detalle = styled(Tarjeta)`
  padding: 0;
  overflow: hidden;
`;

const Info = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const Categoria = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${t.verde};
  font-weight: 600;
`;

const Precio = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
  color: ${t.rosa};
  margin: 0;
`;

const Nota = styled.p`
  color: ${t.gris};
  font-size: 0.9rem;
  margin: 0;
`;

const Agregado = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  color: ${t.verde};
  font-weight: 500;
`;

export default function ItemDetailContainer() {
  const { id } = useParams();
  const { addToCart, getItemQuantity } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAgregado(false);
    try {
      setProducto(await getProducto(id));
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  if (loading) return <Cargando texto="Cargando producto..." />;
  if (error) return <ErrorMensaje mensaje={error} onReintentar={cargar} />;

  if (!producto) {
    return (
      <div className="text-center py-5">
        <Seo titulo="Producto no encontrado" privada />
        <h1 className="fs-2">Producto no encontrado</h1>
        <p className="text-secondary">
          El producto que buscás no existe o ya no está disponible.
        </p>
        <BtnLink to="/">
          <FaArrowLeft aria-hidden="true" /> Volver al catálogo
        </BtnLink>
      </div>
    );
  }

  const enCarrito = getItemQuantity(producto.id);
  const disponible = producto.stock - enCarrito;

  const handleAdd = (cantidad) => {
    addToCart(producto, cantidad);
    setAgregado(true);
  };

  return (
    <section>
      <Seo titulo={producto.nombre} descripcion={producto.descripcion} />

      <Volver to="/">
        <FaArrowLeft aria-hidden="true" /> Volver al catálogo
      </Volver>

      <Detalle>
        <Row className="g-0">
          <Col md={6}>
            <ProductImage producto={producto} alto="100%" minAlto="320px" emoji="9rem" />
          </Col>
          <Col md={6}>
            <Info>
              <Categoria>{producto.categoria}</Categoria>
              <h1>{producto.nombre}</h1>
              <p>{producto.descripcion}</p>
              <Precio>{formatPrecio(producto.precio)}</Precio>
              <Nota>
                Stock disponible: {disponible}
                {enCarrito > 0 && ` (ya tenés ${enCarrito} en el carrito)`}
              </Nota>

              {disponible > 0 ? (
                // key reinicia el contador cuando cambia el stock disponible
                <ItemCount key={disponible} stock={disponible} onAdd={handleAdd} />
              ) : (
                <Nota>
                  {producto.stock === 0
                    ? "Este producto está sin stock."
                    : "Ya agregaste todo el stock disponible de este producto."}
                </Nota>
              )}

              {agregado && (
                <Agregado role="status">
                  <span>
                    <FaCheckCircle aria-hidden="true" /> Producto agregado al carrito
                  </span>
                  <BtnLink to="/carrito" $variant="outline" $sm>
                    <FaShoppingCart aria-hidden="true" /> Ir al carrito
                  </BtnLink>
                </Agregado>
              )}
            </Info>
          </Col>
        </Row>
      </Detalle>
    </section>
  );
}
