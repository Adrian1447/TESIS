import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const App = () => {
  const [manager] = useState(new BleManager());
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const DEVICE_NAME = 'HC-06';

  useEffect(() => {
    const scanAndConnect = async () => {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error(error);
          return;
        }

        if (device?.name === DEVICE_NAME) {
          manager.stopDeviceScan();

          device
            .connect()
            .then((connectedDevice) => {
              setConnectedDevice(connectedDevice);
              return connectedDevice.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
              monitorBattery(device);
            })
            .catch((error) => console.error(error));
        }
      });
    };

    scanAndConnect();

    return () => {
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, [manager]);

  const monitorBattery = (device: Device) => {
    const BATTERY_SERVICE_UUID = 'battery-service-uuid';
    const BATTERY_CHARACTERISTIC_UUID = 'battery-characteristic-uuid';

    device.monitorCharacteristicForService(
      BATTERY_SERVICE_UUID,
      BATTERY_CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.error(error.message);
          return;
        }

        const batteryValue = parseInt(characteristic?.value || '0', 10); // Decodifica el valor
        setBatteryLevel(batteryValue);

        if (batteryValue <= 10) { // Configura el umbral de alerta (10% de batería)
          Alert.alert(
            'Advertencia de batería baja',
            'La batería de 5V está a punto de agotarse. Por favor, reemplázala o recárgala.',
            [{ text: 'Entendido' }]
          );
        }
      }
    );
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      connectedDevice.cancelConnection().then(() => {
        setConnectedDevice(null);
        setBatteryLevel(null);
        Alert.alert('Desconectado', 'El dispositivo se ha desconectado.');
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Estado del dispositivo:</Text>
      {connectedDevice ? (
        <>
          <Text>Dispositivo conectado: {connectedDevice.name}</Text>
          <Text>Nivel de batería: {batteryLevel ? `${batteryLevel}%` : 'Cargando...'}</Text>
          <Button title="Desconectar" onPress={disconnectDevice} />
        </>
      ) : (
        <Text>Buscando dispositivo...</Text>
      )}
    </View>
  );
};

export default App;
