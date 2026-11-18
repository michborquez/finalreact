import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";

// Páginas de acceso/gestión: se descargan solo cuando se necesitan
const Login = lazy(() => import("./pages/Login.jsx"));
const Perfil = lazy(() => import("./pages/Perfil.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas: solo usuarios autenticados */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
