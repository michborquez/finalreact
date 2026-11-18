import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext.jsx";
import { theme as t } from "../styles/theme.js";

const Enlace = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${t.rosaClaro};
  color: ${t.rosa};
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    color: ${t.rosaOscuro};
    transform: translateY(-2px);
  }
`;

const Contador = styled.span`
  background: ${t.rosa};
  color: #fff;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 0.78rem;
  display: grid;
  place-items: center;
`;

export default function CartWidget() {
  // La cantidad sale del contexto, por eso se actualiza en tiempo real
  const { getCartQuantity } = useCarrito();
  const total = getCartQuantity();

  return (
    <Enlace to="/carrito" aria-label={`Ir al carrito, ${total} productos`}>
      <FaShoppingCart aria-hidden="true" />
      <Contador>{total}</Contador>
    </Enlace>
  );
}
