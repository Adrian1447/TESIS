import bcrypt from "bcrypt";

/**
 * Función para encriptar una contraseña.
 * @param password Contraseña en texto plano.
 * @returns Contraseña encriptada.
 */
export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Número de rondas de salting
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Función para verificar una contraseña.
 * @param plainPassword Contraseña ingresada por el usuario (texto plano).
 * @param hashedPassword Contraseña almacenada encriptada.
 * @returns `true` si coinciden, `false` si no.
 */
export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
