const MENSAJES = {
  "app/no-config":
    "Firebase no está configurado. Completá las variables VITE_FIREBASE_* (ver README).",
  "auth/invalid-credential": "El email o la contraseña no son correctos.",
  "auth/wrong-password": "El email o la contraseña no son correctos.",
  "auth/user-not-found": "El email o la contraseña no son correctos.",
  "auth/invalid-email": "El email no tiene un formato válido.",
  "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/too-many-requests":
    "Demasiados intentos fallidos. Esperá unos minutos e intentá de nuevo.",
  "auth/network-request-failed":
    "No pudimos conectarnos. Revisá tu conexión a internet.",
  "auth/operation-not-allowed":
    "El acceso con email y contraseña no está habilitado en Firebase.",
  "permission-denied": "No tenés permisos para realizar esta acción.",
  unavailable:
    "No pudimos comunicarnos con el servidor. Revisá tu conexión e intentá de nuevo.",
};

export function mensajeError(error) {
  return (
    MENSAJES[error?.code] ??
    "Ocurrió un error inesperado. Intentá de nuevo en unos instantes."
  );
}

// Error propio para cuando faltan las variables de entorno de Firebase
export function errorSinConfig() {
  const error = new Error("Firebase no está configurado");
  error.code = "app/no-config";
  return error;
}
