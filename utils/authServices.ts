import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { encryptPassword, verifyPassword } from "./encriptarPasswordUtils";

const db = getFirestore();

/**
 * Guardar un usuario con contraseña encriptada en Firestore.
 * @param dni Identificador único del usuario (DNI).
 * @param password Contraseña del usuario (texto plano).
 * @param userData Datos adicionales del usuario.
 */
export const saveUser = async (dni: string, password: string, userData: any) => {
  // Encriptar la contraseña
  const hashedPassword = await encryptPassword(password);

  // Guardar el documento en Firestore
  await setDoc(doc(db, "usuarios", dni), {
    ...userData,
    contraseña: hashedPassword, // Guardar la contraseña encriptada
  });

  console.log("Usuario guardado exitosamente.");
};

/**
 * Verificar las credenciales de un usuario.
 * @param dni Identificador único del usuario (DNI).
 * @param password Contraseña ingresada por el usuario.
 * @returns Datos del usuario si las credenciales son correctas.
 */
export const loginUser = async (dni: string, password: string) => {
  // Referencia al documento con el DNI
  const userDocRef = doc(db, "usuarios", dni);

  // Intentar obtener los datos del usuario desde Firestore
  const userDocSnap = await getDoc(userDocRef);

  // Validar si el usuario existe (DNI válido)
  if (!userDocSnap.exists()) {
    throw new Error("Usuario no encontrado."); // Error si el DNI no está registrado
  }

  // Obtener los datos del documento
  const userData = userDocSnap.data();

  // Verificar la contraseña ingresada con la almacenada (encriptada)
  const isPasswordValid = await verifyPassword(password, userData?.contraseña);

  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta."); // Error si la contraseña no coincide
  }

  // Devolver los datos del usuario si todo es válido
  return userData;
};
