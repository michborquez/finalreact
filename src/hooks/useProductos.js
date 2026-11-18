import { useCallback, useEffect, useState } from "react";
import { getProductos } from "../services/productosService.js";
import { mensajeError } from "../utils/firebaseErrors.js";

// Carga el catálogo desde Firestore y expone loading / error / recargar
export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProductos(await getProductos());
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { productos, loading, error, recargar };
}
