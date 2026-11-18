import { useState } from "react";
import styled from "styled-components";
import { Alert, Col, Row } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaInfoCircle,
  FaShoppingCart,
  FaSignInAlt,
  FaTrashAlt,
} from "react-icons/fa";
import Seo from "../components/Seo.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { Btn, BtnLink, Subtitulo, Tarjeta, TituloSeccion } from "../components/ui/index.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatPrecio } from "../utils/format.js";
import { theme as t } from "../styles/theme.js";

const Fila = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${t.borde};

  &:last-child {
    border-bottom: none;
  }
`;

const Datos = styled.div`
  flex: 1;
  min-width: 0;

  p {
    margin: 0;
  }
`;

const Detalle = styled.p`
  color: ${t.gris};
  font-size: 0.88rem;
`;

const Subtotal = styled.p`
  font-weight: 600;
  min-width: 90px;
  text-align: right;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;

  span:last-child {
    color: ${t.rosa};
  }
`;

const Vacio = styled(Tarjeta)`
  text-align: center;
  padding: 3rem 1rem;

  svg {
    font-size: 3.5rem;
    color: ${t.rosa};
  }

  p {
    color: ${t.gris};
    margin: 0.6rem 0 1.4rem;
  }
`;

export default function Cart() {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCarrito();
  const { user } = useAuth();
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);
  const [intentoCompra, setIntentoCompra] = useState(false);

  if (cart.length === 0) {
    return (
      <Vacio>
        <Seo titulo="Mi carrito" privada />
        <FaShoppingCart aria-hidden="true" />
        <h1 className="fs-2 mt-3">Tu carrito está vacío</h1>
        <p>Todavía no agregaste ninguna flor ni regalo.</p>
        <BtnLink to="/">Ver catálogo</BtnLink>
      </Vacio>
    );
  }

  return (
    <section>
      <Seo titulo="Mi carrito" privada />

      <TituloSeccion as="h1">
        <FaShoppingCart aria-hidden="true" /> Mi carrito de compras
      </TituloSeccion>
      <Subtitulo>Revisá tu pedido antes de finalizar</Subtitulo>

      <Row className="g-4">
        <Col lg={8}>
          <Tarjeta>
            {cart.map((p) => (
              <Fila key={p.id}>
                <ProductImage
                  key={p.imagen}
                  producto={p}
                  alto="70px"
                  ancho="70px"
                  emoji="2.2rem"
                  radio="12px"
                />
                <Datos>
                  <p className="fw-semibold text-truncate">{p.nombre}</p>
                  <Detalle>
                    {formatPrecio(p.precio)} c/u · Cantidad: {p.cantidad}
                  </Detalle>
                </Datos>
                <Subtotal>{formatPrecio(p.precio * p.cantidad)}</Subtotal>
                <Btn
                  $variant="danger"
                  $sm
                  onClick={() => removeFromCart(p.id)}
                  aria-label={`Quitar ${p.nombre} del carrito`}
                >
                  <FaTrashAlt aria-hidden="true" />
                  <span className="d-none d-sm-inline">Quitar</span>
                </Btn>
              </Fila>
            ))}
          </Tarjeta>
        </Col>

        <Col lg={4}>
          <Tarjeta>
            <Total>
              <span>Total</span>
              <span>{formatPrecio(getCartTotal())}</span>
            </Total>

            <div className="d-grid gap-2">
              {user ? (
                <Btn onClick={() => setIntentoCompra(true)}>
                  <FaCheckCircle aria-hidden="true" /> Finalizar compra
                </Btn>
              ) : (
                <BtnLink to="/login" state={{ from: { pathname: "/carrito" } }}>
                  <FaSignInAlt aria-hidden="true" /> Ingresá para finalizar
                </BtnLink>
              )}
              <BtnLink to="/" $variant="outline">
                <FaArrowLeft aria-hidden="true" /> Seguir comprando
              </BtnLink>
              <Btn $variant="danger" onClick={() => setConfirmarVaciar(true)}>
                <FaTrashAlt aria-hidden="true" /> Vaciar carrito
              </Btn>
            </div>

            {intentoCompra && (
              <Alert variant="info" className="mt-3 mb-0" role="status">
                <FaInfoCircle aria-hidden="true" /> El pago online todavía no está
                disponible. Contactanos para coordinar tu pedido.
              </Alert>
            )}
          </Tarjeta>
        </Col>
      </Row>

      <ConfirmModal
        show={confirmarVaciar}
        titulo="Vaciar carrito"
        textoConfirmar="Sí, vaciar"
        onConfirmar={() => {
          clearCart();
          setConfirmarVaciar(false);
        }}
        onCancelar={() => setConfirmarVaciar(false)}
      >
        Se van a quitar todos los productos de tu carrito. ¿Querés continuar?
      </ConfirmModal>
    </section>
  );
}
