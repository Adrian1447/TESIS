import { useState, useEffect } from "react";
import { doc, collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface HealthData {
  presionCardiaca: string | null;
  timestamp: Date | null;
}

export const useHealthData = (userId: string | null) => {
  const [healthData, setHealthData] = useState<HealthData>({
    presionCardiaca: null,
    timestamp: null,
  });

  // Simular la obtención del valor desde el módulo AD8232
  const readPresionCardiaca = async (): Promise<string> => {
    // Lógica para leer del módulo AD8232
    const simulatedValue = `${Math.floor(Math.random() * 40) + 60}`; // Simulación de valores
    return simulatedValue;
  };

  // Guardar el valor de `presionCardiaca` en Firestore
  const savePresionCardiacaToFirestore = async (presionCardiaca: string) => {
    if (!userId) {
      throw new Error("Usuario no autenticado.");
    }

    const healthRecord = {
      presionCardiaca,
      timestamp: new Date(),
    };

    try {
      // Referencia a la subcolección `mediciones` dentro del documento de usuario
      const userDocRef = doc(db, "usuarios", userId);
      const measurementsCollectionRef = collection(userDocRef, "mediciones");

      // Añadir el registro a Firestore
      await addDoc(measurementsCollectionRef, healthRecord);
    } catch (error) {
      console.error("Error al guardar presionCardiaca en Firestore:", error);
    }
  };

  // Leer y actualizar el estado local y Firebase
  const updatePresionCardiaca = async () => {
    try {
      const presionCardiaca = await readPresionCardiaca();
      setHealthData({
        presionCardiaca,
        timestamp: new Date(),
      });

      // Guardar en Firebase
      await savePresionCardiacaToFirestore(presionCardiaca);
    } catch (error) {
      console.error("Error al actualizar presionCardiaca:", error);
    }
  };

  // Actualizar periódicamente los datos del sensor
  useEffect(() => {
    const interval = setInterval(() => {
      updatePresionCardiaca();
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return {
    healthData,
    updatePresionCardiaca,
  };
};
