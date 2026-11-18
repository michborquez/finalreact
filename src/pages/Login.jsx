import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Alert, Col, Form, Nav, Row, Spinner } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Seo from "../components/Seo.jsx";
import { Btn, Tarjeta, TituloSeccion } from "../components/ui/index.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { mensajeError } from "../utils/firebaseErrors.js";

const VALORES_INICIALES = { nombre: "", email: "", password: "", confirmar: "" };

function validar(valores, modo) {
  const errores = {};
  if (modo === "registro" && valores.nombre.trim().length < 2)
    errores.nombre = "Ingresá tu nombre (mínimo 2 caracteres).";
  if (!/^\S+@\S+\.\S+$/.test(valores.email.trim()))
    errores.email = "Ingresá un email válido.";
  if (valores.password.length < 6)
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  if (modo === "registro" && valores.confirmar !== valores.password)
    errores.confirmar = "Las contraseñas no coinciden.";
  return errores;
}

export default function Login() {
  const { user, login, register } = useAuth();
  const location = useLocation();
  const [modo, setModo] = useState("login");
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Si ya hay sesión (o recién se inició), vamos a donde quería ir o al perfil
  if (user) return <Navigate to={location.state?.from?.pathname || "/perfil"} replace />;

  const esRegistro = modo === "registro";

  const cambiarModo = (nuevo) => {
    setModo(nuevo);
    setErrores({});
    setErrorServidor(null);
  };

  const cambiar = (e) => {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(valores, modo);
    setErrores(nuevosErrores);
    setErrorServidor(null);
    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    try {
      if (esRegistro) {
        await register({
          nombre: valores.nombre.trim(),
          email: valores.email.trim(),
          password: valores.password,
        });
      } else {
        await login(valores.email.trim(), valores.password);
      }
    } catch (err) {
      setErrorServidor(mensajeError(err));
    } finally {
      setEnviando(false);
    }
  };

  const campo = (nombre) => ({
    id: `auth-${nombre}`,
    name: nombre,
    value: valores[nombre],
    onChange: cambiar,
    isInvalid: Boolean(errores[nombre]),
  });

  return (
    <section>
      <Seo
        titulo={esRegistro ? "Crear cuenta" : "Ingresar"}
        descripcion="Ingresá o creá tu cuenta en Petals & Co."
        privada
      />

      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <TituloSeccion as="h1">{esRegistro ? "Crear cuenta" : "Ingresar"}</TituloSeccion>

          <Tarjeta className="mt-4">
            <Nav
              variant="pills"
              justify
              className="mb-4"
              activeKey={modo}
              onSelect={(clave) => cambiarModo(clave)}
            >
              <Nav.Item>
                <Nav.Link eventKey="login">Ingresar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="registro">Registrarme</Nav.Link>
              </Nav.Item>
            </Nav>

            {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

            <Form onSubmit={enviar} noValidate>
              {esRegistro && (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="auth-nombre">Nombre</Form.Label>
                  <Form.Control {...campo("nombre")} autoComplete="name" />
                  <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label htmlFor="auth-email">Email</Form.Label>
                <Form.Control {...campo("email")} type="email" autoComplete="email" />
                <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="auth-password">Contraseña</Form.Label>
                <Form.Control
                  {...campo("password")}
                  type="password"
                  autoComplete={esRegistro ? "new-password" : "current-password"}
                />
                <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
              </Form.Group>

              {esRegistro && (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="auth-confirmar">Repetir contraseña</Form.Label>
                  <Form.Control {...campo("confirmar")} type="password" autoComplete="new-password" />
                  <Form.Control.Feedback type="invalid">{errores.confirmar}</Form.Control.Feedback>
                </Form.Group>
              )}

              <div className="d-grid">
                <Btn type="submit" disabled={enviando}>
                  {enviando ? (
                    <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
                  ) : esRegistro ? (
                    <FaUserPlus aria-hidden="true" />
                  ) : (
                    <FaSignInAlt aria-hidden="true" />
                  )}{" "}
                  {esRegistro ? "Crear cuenta" : "Ingresar"}
                </Btn>
              </div>
            </Form>
          </Tarjeta>
        </Col>
      </Row>
    </section>
  );
}
