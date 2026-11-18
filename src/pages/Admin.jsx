import { useState } from "react";
import styled from "styled-components";
import { Alert, Badge, Spinner, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaSeedling, FaTrashAlt } from "react-icons/fa";
import Seo from "../components/Seo.jsx";
import Cargando from "../components/Cargando.jsx";
import ErrorMensaje from "../components/ErrorMensaje.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import ProductImage from "../components/ProductImage.jsx";
import ProductoFormModal from "../components/ProductoFormModal.jsx";
import { Btn, Subtitulo, Tarjeta, TituloSeccion } from "../components/ui/index.jsx";
import useProductos from "../hooks/useProductos.js";
import {
  addProducto,
  cargarProductosDeEjemplo,
  deleteProducto,
  updateProducto,
} from "../services/productosService.js";
import { mensajeError } from "../utils/firebaseErrors.js";
import { formatPrecio } from "../utils/format.js";

const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
`;

const Celda = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default function Admin() {
  const { productos, loading, error, recargar } = useProductos();
  const [formVisible, setFormVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [porEliminar, setPorEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [cargandoEjemplos, setCargandoEjemplos] = useState(false);
  const [aviso, setAviso] = useState(null); // { tipo: "success" | "danger", texto }

  const abrirNuevo = () => {
    setEditando(null);
    setFormVisible(true);
  };

  const abrirEdicion = (producto) => {
    setEditando(producto);
    setFormVisible(true);
  };

  // Si falla, el error vuelve al modal del formulario (lo muestra ahí)
  const guardar = async (datos) => {
    if (editando) {
      await updateProducto(editando.id, datos);
    } else {
      await addProducto(datos);
    }
    setFormVisible(false);
    setAviso({
      tipo: "success",
      texto: editando ? "Producto actualizado correctamente." : "Producto creado correctamente.",
    });
    await recargar();
  };

  const confirmarEliminar = async () => {
    setEliminando(true);
    try {
      await deleteProducto(porEliminar.id);
      setAviso({ tipo: "success", texto: `Se eliminó "${porEliminar.nombre}".` });
      setPorEliminar(null);
      await recargar();
    } catch (e) {
      setPorEliminar(null);
      setAviso({ tipo: "danger", texto: mensajeError(e) });
    } finally {
      setEliminando(false);
    }
  };

  const cargarEjemplos = async () => {
    setCargandoEjemplos(true);
    try {
      const cantidad = await cargarProductosDeEjemplo();
      setAviso({ tipo: "success", texto: `Se cargaron ${cantidad} productos de ejemplo.` });
      await recargar();
    } catch (e) {
      setAviso({ tipo: "danger", texto: mensajeError(e) });
    } finally {
      setCargandoEjemplos(false);
    }
  };

  return (
    <section>
      <Seo titulo="Panel de gestión" privada />

      <TituloSeccion>Panel de gestión</TituloSeccion>
      <Subtitulo>Creá, editá y eliminá los productos del catálogo</Subtitulo>

      <Acciones>
        <Btn onClick={abrirNuevo}>
          <FaPlus aria-hidden="true" /> Nuevo producto
        </Btn>
        {!loading && !error && productos.length === 0 && (
          <Btn $variant="outline" onClick={cargarEjemplos} disabled={cargandoEjemplos}>
            {cargandoEjemplos ? (
              <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
            ) : (
              <FaSeedling aria-hidden="true" />
            )}{" "}
            Cargar productos de ejemplo
          </Btn>
        )}
      </Acciones>

      {aviso && (
        <Alert variant={aviso.tipo} dismissible onClose={() => setAviso(null)} role="status">
          {aviso.texto}
        </Alert>
      )}

      {loading && <Cargando texto="Cargando productos..." />}
      {error && <ErrorMensaje mensaje={error} onReintentar={recargar} />}

      {!loading && !error && (
        <Tarjeta>
          {productos.length === 0 ? (
            <p className="text-center text-secondary m-0">
              Todavía no hay productos. Creá el primero o cargá los de ejemplo.
            </p>
          ) : (
            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Celda>
                        <ProductImage
                          key={p.imagen}
                          producto={p}
                          alto="48px"
                          ancho="48px"
                          emoji="1.6rem"
                          radio="10px"
                        />
                        <strong>{p.nombre}</strong>
                      </Celda>
                    </td>
                    <td className="text-capitalize">{p.categoria}</td>
                    <td>{formatPrecio(p.precio)}</td>
                    <td>
                      {p.stock === 0 ? <Badge bg="secondary">Sin stock</Badge> : p.stock}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <Btn
                          $variant="outline"
                          $sm
                          onClick={() => abrirEdicion(p)}
                          aria-label={`Editar ${p.nombre}`}
                        >
                          <FaEdit aria-hidden="true" /> Editar
                        </Btn>
                        <Btn
                          $variant="danger"
                          $sm
                          onClick={() => setPorEliminar(p)}
                          aria-label={`Eliminar ${p.nombre}`}
                        >
                          <FaTrashAlt aria-hidden="true" /> Eliminar
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tarjeta>
      )}

      <ProductoFormModal
        show={formVisible}
        producto={editando}
        onHide={() => setFormVisible(false)}
        onGuardar={guardar}
      />

      <ConfirmModal
        show={Boolean(porEliminar)}
        titulo="Eliminar producto"
        textoConfirmar="Sí, eliminar"
        procesando={eliminando}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      >
        ¿Seguro que querés eliminar <strong>{porEliminar?.nombre}</strong>? Esta
        acción no se puede deshacer.
      </ConfirmModal>
    </section>
  );
}
