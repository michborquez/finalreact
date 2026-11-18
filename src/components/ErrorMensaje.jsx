import { Alert } from "react-bootstrap";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { Btn } from "./ui/index.jsx";

export default function ErrorMensaje({ mensaje, onReintentar }) {
  return (
    <Alert variant="danger" className="d-flex flex-column align-items-start gap-2">
      <div className="d-flex align-items-center gap-2">
        <FaExclamationTriangle aria-hidden="true" />
        <span>{mensaje}</span>
      </div>
      {onReintentar && (
        <Btn $variant="danger" $sm onClick={onReintentar}>
          <FaRedo aria-hidden="true" /> Reintentar
        </Btn>
      )}
    </Alert>
  );
}
