import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase

/**
 * Registra un usuario con DNI y contraseña.
 * @param dni El DNI del usuario.
 * @param password La contraseña del usuario.
 * @param nombre El nombre del usuario.
 * @param apellidos Los apellidos del usuario.
 * @returns Un objeto indicando el éxito o error.
 */
export const registerUser = async (
  dni: string,
  password: string,
  nombre: string,
  apellidos: string
) => {
  try {
    if (!dni || dni.length !== 8 || !password) {
      throw new Error(
        "El DNI debe tener 8 dígitos y la contraseña no puede estar vacía."
      );
    }

    // Generar un correo electrónico único basado en el DNI
    const email = `${dni}@example.com`;

    // Crear el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Guardar información adicional del usuario en Firestore
    const userDocRef = doc(db, "usuarios", userCredential.user.uid);
    await setDoc(userDocRef, {
      dni,
      nombre,
      apellidos,
      edad: "", // Puedes agregar más campos según sea necesario
      peso: "",
      presionArterial: "",
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al registrar el usuario.";
    console.error("Error al registrar usuario:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
