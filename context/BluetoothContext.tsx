import React, { createContext, useContext, useState, useEffect } from "react";
import RNBluetoothClassic, {
  BluetoothDevice,
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
  const [data, setData] = useState<any>([]);
  const [messageState, setMessageState] = useState<string>("");

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
      }
    } catch (error) {
      setMessageState(`Error al conectar con ${device.name}`);
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
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useBluetooth = () => useContext(BluetoothContext);
