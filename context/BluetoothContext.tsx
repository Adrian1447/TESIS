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

  const connectToHC06 = async () => {
    try {
      // Verifica si el Bluetooth está habilitado
      const isBluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!isBluetoothEnabled) {
        console.log(
          "Bluetooth está deshabilitado. Habilita el Bluetooth para continuar."
        );
        return;
      }

      // Inicia la búsqueda de dispositivos
      console.log("Iniciando la búsqueda de dispositivos...");
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();

      // Busca el dispositivo llamado 'HC-06'
      const hc06Device = unpairedDevices.find(
        (device: BluetoothDevice) => device.name === "HC-06"
      );

      if (!hc06Device) {
        console.log("No se encontró el dispositivo HC-06.");
        return;
      }

      // Detiene la búsqueda
      await RNBluetoothClassic.cancelDiscovery();
      console.log("Dispositivo HC-06 encontrado. Conectando...");

      // Conecta al dispositivo
      const isConnected = await hc06Device.connect();
      if (isConnected) {
        console.log("Conectado exitosamente al dispositivo HC-06");
        return hc06Device; // Retorna el dispositivo conectado
      } else {
        console.log("No se pudo conectar al dispositivo HC-06.");
      }
    } catch (error) {
      console.error("Error durante la conexión al dispositivo HC-06:", error);
    }
  };

  // Función para conectar automáticamente al dispositivo HC-06
  const connectToHC06Device = async () => {
    const device = await connectToHC06();
    if (device) {
      // setConnectedDevice(device);
      setMessageState(`Conectado a ${device.name}`);
      // Escuchar los datos entrantes
      device.onDataReceived((event) => {
        const receivedData = event.data;
        // console.log("Datos recibidos:", receivedData);
        setData(receivedData); // Almacena los datos recibidos
      });
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
        disconnectDeviceBLC,
        connectToHC06Device,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useBluetooth = () => useContext(BluetoothContext);
