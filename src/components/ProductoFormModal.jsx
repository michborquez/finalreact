import { useEffect, useMemo, useState } from "react";
import { Alert, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { FaSave, FaTimes } from "react-icons/fa";
import ProductImage from "./ProductImage.jsx";
import { Btn } from "./ui/index.jsx";
import {
  CATEGORIAS,
  VALORES_INICIALES,
  aPayload,
  desdeProducto,
  validarProducto,
} from "../utils/productos.js";
import { mensajeError } from "../utils/firebaseErrors.js";

// Formulario controlado para crear (producto = null) o editar un producto
export default function ProductoFormModal({ show, producto, onHide, onGuardar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  // Cada vez que se abre, parte de cero (o de los datos del producto a editar)
  useEffect(() => {
    if (!show) return;
    setValores(producto ? desdeProducto(producto) : VALORES_INICIALES);
    setTocados({});
    setEnviado(false);
    setErrorEnvio(null);
  }, [show, producto]);

  const errores = useMemo(() => validarProducto(valores), [valores]);
  // Un error se muestra si el campo ya se tocó o si se intentó enviar
  const errorDe = (campo) => (enviado || tocados[campo] ? errores[campo] : undefined);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setValores((v) => ({ ...v, [name]: value }));
  };

  const tocar = (e) => {
    const { name } = e.target;
    setTocados((t) => ({ ...t, [name]: true }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setEnviado(true);
    if (Object.keys(errores).length > 0) return;

    setGuardando(true);
    setErrorEnvio(null);
    try {
      await onGuardar(aPayload(valores));
    } catch (err) {
      setErrorEnvio(mensajeError(err));
    } finally {
      setGuardando(false);
    }
  };

  // Props comunes de cada campo, para no repetirlas
  const campo = (nombre) => ({
    id: `producto-${nombre}`,
    name: nombre,
    value: valores[nombre],
    onChange: cambiar,
    onBlur: tocar,
    isInvalid: Boolean(errorDe(nombre)),
  });

  return (
    <Modal show={show} onHide={guardando ? undefined : onHide} centered size="lg">
      <Modal.Header closeButton={!guardando}>
        <Modal.Title as="h2" className="fs-4">
          {producto ? "Editar producto" : "Nuevo producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorEnvio && <Alert variant="danger">{errorEnvio}</Alert>}

        <Form id="form-producto" onSubmit={enviar} noValidate>
          <Row className="g-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label htmlFor="producto-nombre">Nombre *</Form.Label>
                <Form.Control {...campo("nombre")} maxLength={60} />
                <Form.Control.Feedback type="invalid">
                  {errorDe("nombre")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor="producto-categoria">Categoría *</Form.Label>
                <Form.Select {...campo("categoria")}>
                  {CATEGORIAS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errorDe("categoria")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label htmlFor="producto-precio">Precio ($) *</Form.Label>
                <Form.Control {...campo("precio")} type="number" min="0" step="0.01" />
                <Form.Control.Feedback type="invalid">
                  {errorDe("precio")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label htmlFor="producto-stock">Stock *</Form.Label>
                <Form.Control {...campo("stock")} type="number" min="0" step="1" />
                <Form.Control.Feedback type="invalid">
                  {errorDe("stock")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label htmlFor="producto-emoji">Emoji</Form.Label>
                <Form.Control {...campo("emoji")} maxLength={4} />
              </Form.Group>
            </Col>

            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label htmlFor="producto-color">Color de fondo</Form.Label>
                <Form.Control {...campo("color")} type="color" />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label htmlFor="producto-descripcion">Descripción *</Form.Label>
                <Form.Control {...campo("descripcion")} as="textarea" rows={3} maxLength={400} />
                <Form.Control.Feedback type="invalid">
                  {errorDe("descripcion")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label htmlFor="producto-imagen">URL de la imagen (opcional)</Form.Label>
                <Form.Control {...campo("imagen")} type="url" placeholder="https://..." />
                <Form.Control.Feedback type="invalid">
                  {errorDe("imagen")}
                </Form.Control.Feedback>
                <Form.Text>Si la dejás vacía se usa el emoji sobre el color elegido.</Form.Text>
              </Form.Group>
            </Col>

            <Col xs={12} className="d-flex align-items-center gap-3">
              <ProductImage
                key={valores.imagen}
                producto={{
                  nombre: valores.nombre || "Vista previa",
                  emoji: valores.emoji,
                  color: valores.color,
                  imagen: valores.imagen.trim(),
                }}
                alto="80px"
                ancho="80px"
                emoji="2.4rem"
                radio="12px"
              />
              <span className="text-secondary small">Vista previa</span>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Btn $variant="outline" onClick={onHide} disabled={guardando}>
          <FaTimes aria-hidden="true" /> Cancelar
        </Btn>
        <Btn type="submit" form="form-producto" disabled={guardando}>
          {guardando ? (
            <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
          ) : (
            <FaSave aria-hidden="true" />
          )}{" "}
          {producto ? "Guardar cambios" : "Crear producto"}
        </Btn>
      </Modal.Footer>
    </Modal>
  );
}
