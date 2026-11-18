import { FaHome } from "react-icons/fa";
import Seo from "../components/Seo.jsx";
import { BtnLink } from "../components/ui/index.jsx";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <Seo titulo="Página no encontrada" privada />
      <div style={{ fontSize: "3.5rem" }} aria-hidden="true">
        🥀
      </div>
      <h1 className="fs-2">Página no encontrada</h1>
      <p className="text-secondary mb-4">La página que buscás no existe.</p>
      <BtnLink to="/">
        <FaHome aria-hidden="true" /> Volver al inicio
      </BtnLink>
    </div>
  );
}
