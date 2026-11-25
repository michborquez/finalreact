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

## 🚀 Instalación y ejecución en local
1. Clonar el repositorio e ingresar a la carpeta

bash
git clone https://github.com/michborquez/finalreact.git
cd finalreact

2. Instalar las dependencias

bash
npm install

3. Configurar Firebase y crear en la raíz del proyecto un archivo llamado .env con los datos de tu app web de Firebase:

-VITE_FIREBASE_API_KEY=api_key

-VITE_FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com

-VITE_FIREBASE_PROJECT_ID=proyecto

-VITE_FIREBASE_STORAGE_BUCKET=proyecto.firebasestorage.app

-VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012

-VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

4. Iniciar el servidor de desarrollo

bash
npm run dev

## Configurar Firebase
-En la consola de Firebase crear un proyecto nuevo.
-"Authentication" → "Comenzar" → pestaña "Sign-in method" → habilitar Correo electrónico/contraseña.
-Firestore "Database" → "Crear base de datos"
-En Firestore, pestaña "Reglas", pegar el contenido del archivo firestore.rules y tocar "Publicar". Esas reglas permiten que cualquiera lea el catálogo, pero solo usuarios con sesión iniciada lo modifiquen.
-Configuración del proyecto (ícono de engranaje) → "Tus apps" → agregar una app web (icon </>) y copiar los datos de firebaseConfig.
-Pegar esos valores en el archivo .env (paso 3 de la instalación).

## Primer uso
-Entrar a /login, pestaña "Registrarme", y crear tu cuenta.
-Ir a "Panel de gestión" (/admin).
-Si el catálogo está vacío, tocar "Cargar productos de ejemplo" (importa los 9 productos de public/productos.json) o crear los propios.

## Despliegue en Vercel
-Subir el proyecto a GitHub.
-En Vercel elegir "Add New" → "Project" e importar el repositorio
-En "Settings" → "Environment Variables" cargar las seis variables VITE_FIREBASE_* (mismos nombres que en el .env) y volver a desplegar con Redeploy.
-En Firebase, "Authentication" → "Settings" → "Dominios autorizados", agregar el dominio de Vercel.

## 🛠️ Tecnologías

React 18 · Vite · React Router · Firebase (Auth + Firestore) · React-Bootstrap · styled-components · React Icons · React Helmet Async

Sitio Vercel: [https://finalreact-mnpm7llrr-michelles-projects-5847286f.vercel.app/
](https://finalreact-brown.vercel.app)
