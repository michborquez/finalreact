import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Cargando from "./Cargando.jsx";

// Solo deja pasar a usuarios logueados; al resto los manda a /login
// (recordando a dónde querían ir para volver después de ingresar).
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Cargando texto="Verificando sesión..." />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}
