import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cargando from "./Cargando.jsx";

const Pagina = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Principal = styled.main`
  flex: 1;
  padding: 2.5rem 0 4rem;
`;

const SaltarAlContenido = styled.a`
  position: absolute;
  left: -999px;
  top: 0;
  background: #fff;
  padding: 0.5rem 1rem;
  z-index: 2000;

  &:focus {
    left: 0;
  }
`;

export default function Layout() {
  return (
    <Pagina>
      <SaltarAlContenido href="#contenido">Saltar al contenido</SaltarAlContenido>
      <Header />
      <Principal id="contenido">
        <Container>
          {/* Las páginas privadas se cargan bajo demanda (lazy) */}
          <Suspense fallback={<Cargando />}>
            <Outlet />
          </Suspense>
        </Container>
      </Principal>
      <Footer />
    </Pagina>
  );
}
