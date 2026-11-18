import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { FaCog, FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Seo from "../components/Seo.jsx";
import { Btn, BtnLink, Tarjeta, TituloSeccion } from "../components/ui/index.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { theme as t } from "../styles/theme.js";

const Avatar = styled.div`
  font-size: 4.5rem;
  color: ${t.rosa};
  line-height: 1;
`;

const Datos = styled.dl`
  text-align: left;
  margin: 1.5rem 0;

  dt {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${t.gris};
  }

  dd {
    margin-bottom: 0.9rem;
    word-break: break-all;
  }
`;

export default function Perfil() {
  const { user, logout } = useAuth();
  const { getCartQuantity } = useCarrito();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate("/");
  };

  const desde = user.creadoEn
    ? new Date(user.creadoEn).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <section>
      <Seo titulo="Mi perfil" privada />

      <TituloSeccion as="h1">Mi perfil</TituloSeccion>

      <Row className="justify-content-center mt-4">
        <Col md={8} lg={5}>
          <Tarjeta className="text-center">
            <Avatar aria-hidden="true">
              <FaUserCircle />
            </Avatar>
            <h2 className="fs-4 mt-2">{user.displayName || "Usuario"}</h2>

            <Datos>
              <dt>Email</dt>
              <dd>{user.email}</dd>
              <dt>Miembro desde</dt>
              <dd>{desde}</dd>
              <dt>Productos en el carrito</dt>
              <dd>{getCartQuantity()}</dd>
            </Datos>

            <div className="d-grid gap-2">
              <BtnLink to="/admin">
                <FaCog aria-hidden="true" /> Panel de gestión
              </BtnLink>
              <BtnLink to="/carrito" $variant="outline">
                <FaShoppingCart aria-hidden="true" /> Ver mi carrito
              </BtnLink>
              <Btn $variant="danger" onClick={cerrarSesion}>
                <FaSignOutAlt aria-hidden="true" /> Cerrar sesión
              </Btn>
            </div>
          </Tarjeta>
        </Col>
      </Row>
    </section>
  );
}
