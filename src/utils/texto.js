// Minúsculas y sin acentos: "Orquídea" y "orquidea" se consideran iguales
export const normalizar = (texto = "") =>
  String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
