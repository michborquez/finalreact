import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import TeamCard from "./TeamCard.jsx";

const Pie = styled.footer`
  background: #3a2e33;
  color: #f5e9ec;
  padding: 3rem 0 1.5rem;
`;

const Empresa = styled.section`
  h2 {
    font-size: 1.5rem;
    color: #fff;
  }

  p,
  li {
    color: #e6d3d9;
    font-size: 0.93rem;
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.35rem;
  }

  svg {
    margin-right: 0.4rem;
    color: #f2b8c9;
  }
`;

const TituloEquipo = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.9rem;
`;

const Legal = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 2rem;
  padding-top: 1.2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #d3bfc6;
`;

const equipo = [
  {
    nombre: "Micaela Borquez",
    rol: "Fundadora y Florista",
    email: "mica@petalsandco.com",
    emoji: "🌷",
  },
  {
    nombre: "Lucas Fernández",
    rol: "Diseño y Desarrollo Web",
    email: "lucas@petalsandco.com",
    emoji: "💻",
  },
  {
    nombre: "Sofía Ramírez",
    rol: "Atención al Cliente",
    email: "sofia@petalsandco.com",
    emoji: "💬",
  },
];

export default function Footer() {
  return (
    <Pie>
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <Empresa>
              <h2>Petals & Co.</h2>
              <p>
                Florería y regalería con diseños florales exclusivos para
                alegrar los días de las personas que más querés. Envíos a
                domicilio en toda la Ciudad de Buenos Aires.
              </p>
              <ul>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" />
                  Av. Corrientes y Av. 9 de Julio, CABA
                </li>
                <li>
                  <FaPhoneAlt aria-hidden="true" />
                  +54 11 5555-0123
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  hola@petalsandco.com
                </li>
                <li>
                  <FaClock aria-hidden="true" />
                  Lun a Sáb de 9 a 19 hs
                </li>
              </ul>
            </Empresa>
          </Col>

          <Col lg={8}>
            <TituloEquipo>Nuestro equipo</TituloEquipo>
            <Row xs={1} sm={3} className="g-3">
              {equipo.map((persona) => (
                <Col key={persona.email}>
                  <TeamCard {...persona} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Legal>
          © 2026 Petals & Co. Florería & Regalería. Todos los derechos
          reservados.
        </Legal>
      </Container>
    </Pie>
  );
}
