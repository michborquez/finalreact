# 🌸 Petals & Co. – Florería y Regalería

Tienda online de flores y regalos hecha con **React + Vite**. Incluye catálogo con búsqueda y paginación, carrito de compras, registro e inicio de sesión con **Firebase Authentication**, y un panel de gestión (CRUD de productos) con **Cloud Firestore**.

## ✨ Funcionalidades

| Área | Qué incluye |
| --- | --- |
| **Carrito** | `CarritoContext` (Context API): agregar, quitar, vaciar. Se guarda en `localStorage`, así que sobrevive a recargas. El ícono del carrito en el menú muestra la cantidad en tiempo real. |
| **Autenticación** | `AuthContext` + formulario de registro / login con Firebase Auth (email y contraseña). Las rutas `/perfil` y `/admin` están protegidas con `ProtectedRoute`. |
| **CRUD de productos** | Crear, editar y eliminar productos en Firestore desde `/admin`. Formulario controlado con validaciones y modal de confirmación antes de eliminar. |
| **Estados y errores** | Spinners mientras se cargan los datos y mensajes de error (con botón *Reintentar*) si falla la comunicación con Firebase. |
| **Diseño** | Grilla y componentes de **React-Bootstrap**, estilos modulares con **styled-components**, íconos de **React Icons**. |
| **SEO y accesibilidad** | Título y metaetiquetas por página con **React Helmet** (`react-helmet-async`), etiquetas ARIA, enlace "Saltar al contenido" y foco visible. |
| **Búsqueda y paginación** | Búsqueda en tiempo real (ignora mayúsculas y acentos) y paginador de 8 productos por página. |


## 🛠️ Tecnologías

React 18 · Vite · React Router · Firebase (Auth + Firestore) · React-Bootstrap · styled-components · React Icons · React Helmet Async

Sitio Vercel: https://finalreact-mnpm7llrr-michelles-projects-5847286f.vercel.app/
