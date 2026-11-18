import { Link, NavLink, useNavigate } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaCog, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import CartWidget from "./CartWidget.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { CATEGORIAS } from "../utils/productos.js";

export default function NavBar({ onNavegar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    onNavegar();
    navigate("/");
  };

  return (
    <Nav className="ms-auto align-items-lg-center gap-lg-2" onClick={onNavegar}>
      <Nav.Link as={NavLink} to="/" end>
        Inicio
      </Nav.Link>
      {CATEGORIAS.map((c) => (
        <Nav.Link key={c.id} as={NavLink} to={`/categoria/${c.id}`}>
          {c.label}
        </Nav.Link>
      ))}

      {user ? (
        <NavDropdown
          align="end"
          title={
            <span>
              <FaUserCircle aria-hidden="true" /> {user.displayName || "Mi cuenta"}
            </span>
          }
          id="menu-usuario"
        >
          <NavDropdown.Item as={Link} to="/perfil">
            <FaUser aria-hidden="true" /> Mi perfil
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/admin">
            <FaCog aria-hidden="true" /> Panel de gestión
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as="button" onClick={cerrarSesion}>
            <FaSignOutAlt aria-hidden="true" /> Cerrar sesión
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={NavLink} to="/login">
          <FaSignInAlt aria-hidden="true" /> Ingresar
        </Nav.Link>
      )}

      <div className="mt-2 mt-lg-0">
        <CartWidget />
      </div>
    </Nav>
  );
}
