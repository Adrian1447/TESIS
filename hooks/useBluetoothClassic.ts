import { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceReadEvent,
} from "react-native-bluetooth-classic";
import { requestBluetoothPermission } from "@/utils/permissionsUtils";

interface BluetoothData {
  moreInfo: BluetoothDeviceReadEvent;
  timestamp: Date;
  type: string;
}

export const useBluetoothClassic = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [data, setData] = useState<BluetoothData[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Verificar si el Bluetooth está habilitado cuando el hook se monta
    (async () => {
      try {
        const isAvailable = await RNBluetoothClassic.isBluetoothAvailable();
        if (isAvailable) {
          const isEnabled = await RNBluetoothClassic.isBluetoothEnabled();
          setIsBluetoothEnabled(isEnabled);
        } else {
          ToastAndroid.show("Bluetooth no está disponible", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error("Error verificando el estado de Bluetooth", error);
      }
    })();
  }, []);

  const onReceivedData = (event: BluetoothDeviceReadEvent) => {
    setData((prevData) => [
      ...prevData,
      {
        moreInfo: event,
        timestamp: new Date(),
        type: "receive",
      },
    ]);
  };

  const startScan = async () => {
    try {
      setDevices([]);
      const granted = await requestBluetoothPermission();
      if (!granted) {
        ToastAndroid.show(
          "Permisos Bluetooth no concedidos",
          ToastAndroid.SHORT
        );
        return;
      }

      setIsScanning(true);
      const unpairedDevices = await RNBluetoothClassic.startDiscovery();
      ToastAndroid.show(
        `Encontrados ${unpairedDevices.length} dispositivos no emparejados.`,
        ToastAndroid.SHORT
      );
      setDevices(unpairedDevices);
    } catch (err) {
      ToastAndroid.show("Error al iniciar el escaneo", ToastAndroid.SHORT);
    } finally {
      setIsScanning(false);
    }
  };

  const stopScan = async () => {
    try {
      await RNBluetoothClassic.cancelDiscovery();
      setIsScanning(false);
    } catch (e) {
      ToastAndroid.show("Error al cancelar el escaneo", ToastAndroid.SHORT);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      stopScan(); // Asegurarte de detener el escaneo antes de conectar

      let isConnected = await device.isConnected(); // Verifica si ya está conectado
      if (isConnected) {
        Alert.alert("El dispositivo ya está conectado");
        return;
      } else {
        ToastAndroid.show(
          `Intentando conectar al dispositivo ${device.name}...`,
          ToastAndroid.SHORT
        );

        const connected = await device.connect(); // Intentamos conectar el dispositivo

        if (connected) {
          setConnectedDevice(device); // Aquí se guarda el dispositivo conectado, no un booleano
          device.onDataReceived(onReceivedData); // Escuchar datos del dispositivo conectado
          const message = await device.read();
          setMessage(String(message)); // Actualizar el estado del mensaje
          Alert.alert(`Conectado a ${device.name}`);
        } else {
          Alert.alert("No se pudo conectar al dispositivo");
        }
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e?.toString());
    }
  };

  const disconnectDevice = async (device: BluetoothDevice) => {
    try {
      await device.disconnect();
      setConnectedDevice(null);
      ToastAndroid.show("Dispositivo desconectado", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Error al desconectar", ToastAndroid.SHORT);
    }
  };

  return {
    isScanning,
    devices,
    isBluetoothEnabled,
    connectedDevice,
    data,
    message,
    startScan,
    stopScan,
    connectToDevice,
    disconnectDevice,
  };
};
