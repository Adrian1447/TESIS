import { useState, useCallback, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  dni: string;
  name: string;
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
        throw new Error('El DNI y la contraseña son obligatorios.');
      }

      // Iniciar sesión con Firebase Authentication
      const userCredential = await auth().signInWithEmailAndPassword(
        `${dni}@example.com`, // Email generado a partir del DNI
        password
      );

      // Obtener información del usuario desde Firestore
      const userDoc = await firestore()
        .collection('usuarios')
        .doc(userCredential.user.uid)
        .get();

      if (!userDoc.exists) {
        throw new Error('Usuario no encontrado en Firestore.');
      }

      const userData = userDoc.data();

      // Guardar datos en AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

      // Actualizar el estado de autenticación
      setAuthState({
        isAuthenticated: true,
        user: userData as User,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error desconocido al iniciar sesión.';
      console.error('Error al iniciar sesión:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Cerrar sesión
  const logout = useCallback(async () => {
    try {
      // Cerrar sesión con Firebase Authentication
      await auth().signOut();

      // Limpiar datos almacenados localmente
      await AsyncStorage.removeItem('userInfo');

      // Actualizar el estado
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, []);

  // Cargar datos del usuario desde AsyncStorage
  const loadUserFromStorage = useCallback(async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        setAuthState({
          isAuthenticated: true,
          user: JSON.parse(userInfo),
        });
      }
    } catch (error) {
      console.error('Error al cargar usuario desde el almacenamiento:', error);
    }
  }, []);

  // Monitorear cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await firestore()
          .collection('usuarios')
          .doc(firebaseUser.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setAuthState({
            isAuthenticated: true,
            user: userData as User,
          });
          await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        }
      } else {
        // Si no hay un usuario autenticado, limpiamos el estado
        await AsyncStorage.removeItem('userInfo');
        setAuthState({
          isAuthenticated: false,
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Inicializar estado al cargar el componente
  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return {
    authState,
    login,
    logout,
    loadUserFromStorage,
  };
};