import { Modal, Spinner } from "react-bootstrap";
import { FaExclamationTriangle, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Btn } from "./ui/index.jsx";

// Modal de confirmación reutilizable (eliminar producto, vaciar carrito, etc.)
export default function ConfirmModal({
  show,
  titulo,
  children,
  textoConfirmar = "Confirmar",
  procesando = false,
  onConfirmar,
  onCancelar,
}) {
  return (
    <Modal show={show} onHide={procesando ? undefined : onCancelar} centered>
      <Modal.Header closeButton={!procesando}>
        <Modal.Title as="h2" className="fs-4 d-flex align-items-center gap-2">
          <FaExclamationTriangle aria-hidden="true" color="#b42318" /> {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Btn $variant="outline" onClick={onCancelar} disabled={procesando}>
          <FaTimes aria-hidden="true" /> Cancelar
        </Btn>
        <Btn $variant="primary" onClick={onConfirmar} disabled={procesando}>
          {procesando ? (
            <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
          ) : (
            <FaTrashAlt aria-hidden="true" />
          )}{" "}
          {textoConfirmar}
        </Btn>
      </Modal.Footer>
    </Modal>
  );
}
