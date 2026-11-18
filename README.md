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

## 🧰 Requisitos

- [Node.js](https://nodejs.org/) **18 o superior** (incluye `npm`)
- [Git](https://git-scm.com/)
- Una cuenta de Google para crear el proyecto de [Firebase](https://console.firebase.google.com/) (el plan gratuito alcanza)

## 🚀 Instalación y ejecución en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/michborquez/prereact.git
cd prereact

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno (ver sección Firebase)
cp .env.example .env        # en Windows (PowerShell): copy .env.example .env

# 4. Levantar el servidor de desarrollo
npm run dev
```

Abrí la dirección que muestra la terminal (normalmente <http://localhost:5173>).

### Otros comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la carpeta `dist/` para probar el build |

## 🔥 Configurar Firebase

1. En la [consola de Firebase](https://console.firebase.google.com/) creá un proyecto nuevo.
2. **Authentication** → *Comenzar* → pestaña *Sign-in method* → habilitá **Correo electrónico/contraseña**.
3. **Firestore Database** → *Crear base de datos* (modo producción, la región que prefieras).
4. En Firestore, pestaña **Reglas**, pegá el contenido del archivo [`firestore.rules`](./firestore.rules) y publicá. Esas reglas permiten que cualquiera lea el catálogo, pero solo usuarios con sesión iniciada lo modifiquen.
5. **Configuración del proyecto** (ícono de engranaje) → *Tus apps* → agregá una **app web** (`</>`) y copiá los datos de `firebaseConfig`.
6. Pegá esos valores en tu archivo `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> El archivo `.env` está en `.gitignore`: **no lo subas a GitHub**. Si falta la configuración, la app igual carga y avisa que Firebase no está configurado.

### Primer uso

1. Entrá a `/login`, pestaña **Registrarme**, y creá tu cuenta.
2. Andá a **Panel de gestión** (`/admin`).
3. Si el catálogo está vacío, tocá **Cargar productos de ejemplo** (importa los 9 productos de `public/productos.json`) o creá los tuyos con **Nuevo producto**.

## ☁️ Despliegue en Vercel

1. Subí el proyecto a GitHub.
2. En [Vercel](https://vercel.com/) elegí **Add New → Project** e importá el repositorio (Vercel detecta Vite solo).
3. En **Settings → Environment Variables** cargá las seis variables `VITE_FIREBASE_*` y volvé a desplegar (*Redeploy*).
4. En Firebase, **Authentication → Settings → Dominios autorizados**, agregá el dominio de Vercel (por ejemplo `tu-proyecto.vercel.app`); si no, el login no funcionará en producción.

El archivo [`vercel.json`](./vercel.json) redirige todas las rutas a `index.html`, necesario para que `/carrito`, `/producto/...` y las demás funcionen al recargar la página o abrir un enlace directo.

## 🗂️ Estructura del proyecto

```
├── public/
│   └── productos.json            # Productos de ejemplo (para cargar en Firestore)
├── src/
│   ├── components/
│   │   ├── ui/                   # Botones y contenedores con styled-components
│   │   ├── Layout.jsx            # Header + contenido + Footer
│   │   ├── Header.jsx / NavBar.jsx / CartWidget.jsx / Footer.jsx / TeamCard.jsx
│   │   ├── ItemListContainer.jsx # Catálogo (filtros, búsqueda, paginación)
│   │   ├── Item.jsx              # Tarjeta de producto reutilizable (props)
│   │   ├── ItemDetailContainer.jsx / ItemCount.jsx
│   │   ├── SearchBar.jsx / Paginador.jsx
│   │   ├── ProductoFormModal.jsx # Formulario controlado con validaciones
│   │   ├── ConfirmModal.jsx      # Confirmación (eliminar, vaciar carrito)
│   │   ├── ProtectedRoute.jsx    # Protege rutas privadas
│   │   └── Seo.jsx, Cargando.jsx, ErrorMensaje.jsx, ProductImage.jsx
│   ├── context/
│   │   ├── AuthContext.jsx       # Usuario logueado / no logueado
│   │   └── CarritoContext.jsx    # Estado global del carrito
│   ├── firebase/config.js        # Inicialización de Firebase
│   ├── services/productosService.js  # CRUD contra Firestore
│   ├── hooks/useProductos.js     # Carga del catálogo (loading / error)
│   ├── pages/                    # Cart, Login, Perfil, Admin, NotFound
│   ├── styles/                   # theme.js y GlobalStyle.js
│   ├── utils/                    # Validaciones, formato, errores, búsqueda
│   ├── App.jsx                   # Rutas
│   └── main.jsx                  # Providers y arranque
├── firestore.rules               # Reglas de seguridad de Firestore
├── vercel.json                   # Rewrite para app de una sola página
└── .env.example                  # Plantilla de variables de entorno
```

## 🧭 Rutas

| Ruta | Acceso | Descripción |
| --- | --- | --- |
| `/` | Público | Catálogo completo |
| `/categoria/:categoryId` | Público | Catálogo filtrado (`ramos`, `plantas`, `regalos`) |
| `/producto/:id` | Público | Detalle y botón para agregar al carrito |
| `/carrito` | Público | Detalle del carrito |
| `/login` | Público | Ingresar / registrarse |
| `/perfil` | 🔒 Con sesión | Datos de la cuenta |
| `/admin` | 🔒 Con sesión | Panel de gestión (CRUD de productos) |

## 🌐 Compatibilidad de navegadores

El build de Vite apunta a navegadores modernos (Chrome 87+, Edge 88+, Firefox 78+, Safari 14+). Antes de entregar, conviene recorrer esta lista en **Chrome, Firefox, Edge y Safari**, y en un celular:

- [ ] El catálogo carga y se ven las tarjetas en 1, 2, 3 y 4 columnas según el ancho de pantalla
- [ ] La búsqueda filtra mientras se escribe y el paginador cambia de página
- [ ] Se puede agregar al carrito desde el detalle y el contador del menú se actualiza
- [ ] El carrito conserva los productos al recargar la página
- [ ] Registro e inicio de sesión funcionan; `/admin` redirige a `/login` si no hay sesión
- [ ] Se puede crear, editar y eliminar un producto (con el modal de confirmación)
- [ ] El menú hamburguesa funciona en pantallas chicas
- [ ] Abrir directamente `/carrito` o `/producto/ID` (o recargar) no da error 404

## ⚠️ Nota de seguridad

Con las reglas incluidas, **cualquier persona que se registre puede modificar el catálogo**. Para una tienda real conviene limitar la escritura a administradores (por ejemplo, comparando `request.auth.token.email` con una lista de emails autorizados en `firestore.rules`).

## 🛠️ Tecnologías

React 18 · Vite · React Router · Firebase (Auth + Firestore) · React-Bootstrap · styled-components · React Icons · React Helmet Async
