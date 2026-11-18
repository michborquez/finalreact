export const CATEGORIAS = [
  { id: "ramos", label: "Ramos" },
  { id: "plantas", label: "Plantas" },
  { id: "regalos", label: "Regalos" },
];

export const VALORES_INICIALES = {
  nombre: "",
  categoria: "ramos",
  precio: "",
  stock: "",
  emoji: "🌸",
  color: "#fde2e4",
  descripcion: "",
  imagen: "",
};

const esUrl = (valor) => {
  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

// Devuelve un objeto { campo: "mensaje" } solo con los campos inválidos
export function validarProducto(valores) {
  const errores = {};

  const nombre = valores.nombre.trim();
  if (!nombre) errores.nombre = "El nombre es obligatorio.";
  else if (nombre.length < 3)
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  else if (nombre.length > 60)
    errores.nombre = "El nombre no puede superar los 60 caracteres.";

  if (!CATEGORIAS.some((c) => c.id === valores.categoria))
    errores.categoria = "Elegí una categoría.";

  const precioTexto = String(valores.precio).trim();
  if (precioTexto === "") errores.precio = "El precio es obligatorio.";
  else if (!Number.isFinite(Number(precioTexto)) || Number(precioTexto) <= 0)
    errores.precio = "El precio debe ser mayor a 0.";

  const stockTexto = String(valores.stock).trim();
  if (stockTexto === "") errores.stock = "El stock es obligatorio.";
  else if (!Number.isInteger(Number(stockTexto)) || Number(stockTexto) < 0)
    errores.stock = "El stock debe ser un número entero de 0 o más.";

  const descripcion = valores.descripcion.trim();
  if (!descripcion) errores.descripcion = "La descripción es obligatoria.";
  else if (descripcion.length < 10)
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  else if (descripcion.length > 400)
    errores.descripcion = "La descripción no puede superar los 400 caracteres.";

  const imagen = valores.imagen.trim();
  if (imagen && !esUrl(imagen))
    errores.imagen = "Ingresá una URL válida (http o https).";

  return errores;
}

// Del formulario (todo texto) al documento que se guarda en Firestore
export const aPayload = (valores) => ({
  nombre: valores.nombre.trim(),
  categoria: valores.categoria,
  precio: Number(valores.precio),
  stock: Number(valores.stock),
  emoji: valores.emoji.trim() || "🌸",
  color: valores.color,
  descripcion: valores.descripcion.trim(),
  imagen: valores.imagen.trim(),
});

// De un producto guardado a los valores del formulario (para editar)
export const desdeProducto = (producto) => ({
  nombre: producto.nombre ?? "",
  categoria: producto.categoria ?? "ramos",
  precio: String(producto.precio ?? ""),
  stock: String(producto.stock ?? ""),
  emoji: producto.emoji ?? "🌸",
  color: producto.color ?? "#fde2e4",
  descripcion: producto.descripcion ?? "",
  imagen: producto.imagen ?? "",
});
