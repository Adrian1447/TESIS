import { useState, useCallback, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

interface User {
  dni: string;
  nombre: string;
  apellidos: string;
  edad: string;
  peso: string;
  presionArterial: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  // Iniciar sesión
  const login = useCallback(async (dni: string, password: string) => {
    try {
      if (!dni || !password) {
        throw new Error("El DNI y la contraseña son obligatorios.");
      }

      // Simula un correo electrónico único basado en el DNI
      const email = `${dni}@example.com`;

      // Inicia sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Obtén información adicional del usuario desde Firestore
      const userDocRef = doc(db, "usuarios", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado en Firestore.");
      }

      const userData = userDoc.data();

      // Actualiza el estado de autenticación
      setAuthState({
        isAuthenticated: true,
        user: userData as User,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al iniciar sesión.";
      console.error("Error al iniciar sesión:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Cerrar sesión
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setAuthState({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }, []);

  // Monitorear el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "usuarios", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAuthState({
            isAuthenticated: true,
            user: userData as User,
          });
        }
      } else {
        setAuthState({ isAuthenticated: false, user: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return { authState, login, logout };
};
