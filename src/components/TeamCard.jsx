import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import { theme as t } from "../styles/theme.js";

const Tarjeta = styled.article`
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  height: 100%;
`;

const Avatar = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${t.rosa};
  display: grid;
  place-items: center;
  font-size: 1.7rem;
  margin: 0 auto 0.6rem;
`;

const Nombre = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const Rol = styled.p`
  color: #f2b8c9;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;

const Mail = styled.a`
  font-size: 0.78rem;
  color: #e6d3d9;
  word-break: break-all;

  &:hover {
    color: #fff;
  }
`;

export default function TeamCard({ nombre, rol, email, emoji }) {
  return (
    <Tarjeta>
      <Avatar aria-hidden="true">{emoji}</Avatar>
      <Nombre>{nombre}</Nombre>
      <Rol>{rol}</Rol>
      <Mail href={`mailto:${email}`}>
        <FaEnvelope aria-hidden="true" /> {email}
      </Mail>
    </Tarjeta>
  );
}
