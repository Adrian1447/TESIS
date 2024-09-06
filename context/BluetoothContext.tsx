import React, { createContext, useContext, useState, useEffect } from "react";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
} from "react-native-bluetooth-classic";

// Definimos el contexto
const BluetoothContext = createContext<any>(null);

// Proveedor del contexto
export const BluetoothProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isBluetoothEnabledBLC, setIsBluetoothEnabledBLC] =
    useState<boolean>(false);
  const [devicesBLC, setDevicesBLC] = useState<BluetoothDevice[]>([]);
  const [isScanningBLC, setIsScanningBLC] = useState<boolean>(false);
  const [data, setData] = useState<string>(""); // Cambiamos a array para almacenar múltiples entradas de datos
  const [messageState, setMessageState] = useState<string>("");
  const [deviceSubscription, setDeviceSubscription] =
    useState<BluetoothEventSubscription | null>(null); // Para manejar la suscripción a datos

  // Función para verificar si el Bluetooth está habilitado
  useEffect(() => {
    const checkBluetoothEnabled = async () => {
      try {
        const isBluetoothEnabled =
          await RNBluetoothClassic.isBluetoothEnabled();
        setIsBluetoothEnabledBLC(isBluetoothEnabled);
      } catch (error) {
        console.error("Error checking Bluetooth status:", error);
      }
    };

    checkBluetoothEnabled();
  }, []);

  // Funciones para iniciar y detener escaneo
  const startScanBLC = async () => {
    try {
      setDevicesBLC([]);
      setIsScanningBLC(true);
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();
      setDevicesBLC(unpairedDevices);
    } finally {
      setIsScanningBLC(false);
    }
  };

  const stopScanBLC = async () => {
    try {
      await RNBluetoothClassic.cancelDiscovery();
      setIsScanningBLC(false);
    } catch (error) {
      console.error("Error stopping scan:", error);
    }
  };

  // Función para conectar con un dispositivo
  const connectToDeviceBLC = async (device: BluetoothDevice) => {
    try {
      stopScanBLC();
      const isConnected = await device.isConnected();
      if (!isConnected) {
        await device.connect();
        setMessageState(`Conectado a ${device.name}`);

        // Escuchar datos recibidos desde el dispositivo
        const subscription = device.onDataReceived((event) => {
          const receivedData = event.data;
          console.log(`Datos recibidos de ${device.name}:`, receivedData);

          // Actualizar el estado `data` con los datos recibidos
          setData(receivedData);
        });

        // Guardar la suscripción para cancelarla más tarde si es necesario
        setDeviceSubscription(subscription);
      }
    } catch (error) {
      setMessageState(`Error al conectar con ${device.name}`);
    }
  };

  // Limpiar la suscripción cuando se desconecte el dispositivo
  const disconnectDeviceBLC = async (device: BluetoothDevice) => {
    try {
      if (deviceSubscription) {
        deviceSubscription.remove();
        setDeviceSubscription(null);
      }
      await device.disconnect();
      setMessageState(`Desconectado de ${device.name}`);
    } catch (error) {
      setMessageState(`Error al desconectar de ${device.name}`);
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        isBluetoothEnabledBLC,
        isScanningBLC,
        devicesBLC,
        data,
        messageState,
        startScanBLC,
        stopScanBLC,
        connectToDeviceBLC,
        disconnectDeviceBLC, // Nueva función para desconectar
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useBluetooth = () => useContext(BluetoothContext);
