import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config.js";
import { errorSinConfig } from "../utils/firebaseErrors.js";

const AuthContext = createContext(null);

// Guardamos solo los datos que usa la interfaz (objeto nuevo => React re-renderiza)
const aUsuario = (u) =>
  u
    ? {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        creadoEn: u.metadata?.creationTime ?? null,
      }
    : null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Mientras Firebase restaura la sesión no sabemos si hay usuario o no
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (u) => {
      setUser(aUsuario(u));
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    if (!auth) throw errorSinConfig();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async ({ nombre, email, password }) => {
    if (!auth) throw errorSinConfig();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (nombre) {
      await updateProfile(cred.user, { displayName: nombre });
      setUser(aUsuario(auth.currentUser));
    }
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const value = { user, loading, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
