import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { errorSinConfig } from "../utils/firebaseErrors.js";

const COLECCION = "productos";

const coleccion = () => {
  if (!db) throw errorSinConfig();
  return collection(db, COLECCION);
};

const conId = (snap) => ({ id: snap.id, ...snap.data() });

// READ: todos los productos, ordenados por nombre
export async function getProductos() {
  const snap = await getDocs(coleccion());
  return snap.docs
    .map(conId)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

// READ: un producto por id (null si no existe)
export async function getProducto(id) {
  if (!db) throw errorSinConfig();
  const snap = await getDoc(doc(db, COLECCION, id));
  return snap.exists() ? conId(snap) : null;
}

// CREATE
export async function addProducto(datos) {
  const ref = await addDoc(coleccion(), datos);
  return ref.id;
}

// UPDATE
export async function updateProducto(id, datos) {
  if (!db) throw errorSinConfig();
  await updateDoc(doc(db, COLECCION, id), datos);
}

// DELETE
export async function deleteProducto(id) {
  if (!db) throw errorSinConfig();
  await deleteDoc(doc(db, COLECCION, id));
}

// Carga los productos de ejemplo (public/productos.json) en Firestore.
// Usa ids fijos, así que ejecutarlo dos veces no duplica nada.
export async function cargarProductosDeEjemplo() {
  if (!db) throw errorSinConfig();
  const res = await fetch(`${import.meta.env.BASE_URL}productos.json`);
  if (!res.ok) throw new Error("No se pudo leer productos.json");
  const ejemplos = await res.json();

  const batch = writeBatch(db);
  ejemplos.forEach(({ id, ...datos }) => {
    batch.set(doc(db, COLECCION, `ejemplo-${id}`), { imagen: "", ...datos });
  });
  await batch.commit();
  return ejemplos.length;
}
