import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Navbar } from "react-bootstrap";
import NavBar from "./NavBar.jsx";
import { theme as t } from "../styles/theme.js";

const Cabecera = styled.header`
  background: #fff;
  border-bottom: 1px solid ${t.borde};
  position: sticky;
  top: 0;
  z-index: 1020;
`;

const Marca = styled(Link)`
  font-family: "Playfair Display", serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: ${t.rosa};

  &:hover {
    color: ${t.rosa};
  }

  span {
    color: ${t.verde};
  }
`;

export default function Header() {
  // Controlamos el menú para cerrarlo en el celular al elegir una opción
  const [abierto, setAbierto] = useState(false);

  return (
    <Cabecera>
      <Container>
        <Navbar expand="lg" expanded={abierto} onToggle={setAbierto} className="py-2">
          <Navbar.Brand as="div" className="m-0">
            <Marca to="/">
              Petals <span>&</span> Co.
            </Marca>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú" />
          <Navbar.Collapse id="menu-principal">
            <NavBar onNavegar={() => setAbierto(false)} />
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Cabecera>
  );
}
