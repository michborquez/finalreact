import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);
const CLAVE_STORAGE = "petals-carrito";

// El carrito sobrevive a recargas de la página (si el navegador permite storage)
const leerCarrito = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
};

export function CarritoProvider({ children }) {
  const [cart, setCart] = useState(leerCarrito);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(cart));
    } catch {
      // storage no disponible: el carrito sigue funcionando en memoria
    }
  }, [cart]);

  // Agrega un producto; si ya está, suma la cantidad sin superar el stock
  const addToCart = (producto, cantidad) => {
    setCart((prev) => {
      const existente = prev.find((p) => p.id === producto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: Math.min(p.cantidad + cantidad, producto.stock) }
            : p
        );
      }
      const { id, nombre, precio, stock, emoji, color, imagen } = producto;
      return [...prev, { id, nombre, precio, stock, emoji, color, imagen, cantidad }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCart([]);

  const getCartQuantity = () => cart.reduce((acc, p) => acc + p.cantidad, 0);

  const getCartTotal = () =>
    cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const getItemQuantity = (id) => cart.find((p) => p.id === id)?.cantidad ?? 0;

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartQuantity,
    getCartTotal,
    getItemQuantity,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
