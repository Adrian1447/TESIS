import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import {
  BleError,
  BleManager,
  Device as DeviceBLE,
  State as StateBluetooth,
} from "react-native-ble-plx";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

const requestBluetoothPermission = async () => {
  if (Platform.OS === "ios") {
    return true;
  }
  if (
    Platform.OS === "android" &&
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ) {
    const apiLevel = parseInt(Platform.Version.toString(), 10);

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    if (
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    ) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        result["android.permission.BLUETOOTH_CONNECT"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.BLUETOOTH_SCAN"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result["android.permission.ACCESS_FINE_LOCATION"] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
  }
  // this.showErrorToast("Permission have not been granted");

  return false;
};

export default function HomeScreen() {
  //#region Bluetooth BLE
  const [bleManager] = useState(new BleManager());
  const [statusBleManager, setStatusBleManager] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [bluetoothState, setBluetoothState] = useState<StateBluetooth | null>(
    null
  );
  const [devicesBLE, setDevicesBLE] = useState<DeviceBLE[]>([]);
  const [isScanningBLE, setIsScanningBLE] = useState<boolean>(false);
  const [connectedDeviceBLE, setConnectedDeviceBLE] =
    useState<DeviceBLE | null>(null);

  //#region Bluetooth BLC
  const [isScanningBLC, setIsScanningBLC] = useState<boolean>(false);
  const [devicesBLC, setDevicesBLC] = useState<BluetoothDevice[]>([]);
  const [isBluetoothEnabledBLC, setIsBluetoothEnabledBLC] =
    useState<boolean>(false);
  // const [device, setDevice] = useState<BluetoothDevice>();
  const [data, setData] = useState<any>([]);
  console.log(data);

  useEffect(function checkPermissions() {
    (async () => {
      if (Platform.OS === "ios") {
        const status = await check(PERMISSIONS.IOS.BLUETOOTH);
        if (status !== RESULTS.GRANTED) {
          await request(PERMISSIONS.IOS.BLUETOOTH);
        }
      }
    })();
  }, []);

  //region Bluetooth Classic Functions
  const initializeRead = (device: BluetoothDevice) => {
    console.log("initializeRead successful");
    device.onDataReceived((event) => {
      console.log("Datos recibidos:", event.data);
      setData((prevData: any) => [...prevData, event.data]);
    });
  };

  const startScanBLC = async () => {
    try {
      const granted = await requestBluetoothPermission();
      if (!granted) {
        throw new Error("Access fine location was not granted");
      }
      setIsScanningBLC(true);
      try {
        const unpairedDevices = await RNBluetoothClassic.startDiscovery();
        ToastAndroid.show(
          `Encontrados ${unpairedDevices.length} dispositivos no emparejados.`,
          ToastAndroid.SHORT
        );
        setDevicesBLC(unpairedDevices);
      } finally {
        setIsScanningBLC(false);
      }
    } catch (err) {
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  };

  async function stopScanBLC() {
    try {
      await RNBluetoothClassic.cancelDiscovery();
      setIsScanningBLC(false);
    } catch (e) {
      ToastAndroid.show(
        `Se produjo un error al intentar cancelar la detección de dispositivos`,
        2000
      );
    }
  }

  const connectToDeviceBLC = async (device: BluetoothDevice) => {
    try {
      stopScanBLC();
      console.log("Connecting to device1");
      console.log(device);
      console.log("Connecting to device2");
      let isConnected = await device.isConnected();
      if (isConnected) {
        Alert.alert("Device is already connected");
        return;
      } else {
        ToastAndroid.show(
          `Intentando conectar al dispositivo ${device.name}...`,
          5000
        );
        await device.connect();
        console.log("Connecting successful");
        // device.onDataReceived((data) => {
        //   console.log("Datos recibidos:", data);
        // });
        console.log("handleDataReceived successful");
        Alert.alert(`Connected to ${device.name}`);
      }
      console.log("handleDataReceived successful1");
      initializeRead(device);
      console.log("handleDataReceived successful2");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e?.toString());
    }
  };

  useEffect(function firstLoadingLibraryBlC() {
    (async () => {
      // RNBluetoothClassic.();
      const isBluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();
      setIsBluetoothEnabledBLC(isBluetoothEnabled);
    })();
  });

  //region Bluetooth BLE Functions
  useEffect(
    function firstLoadingLibraryBleManager() {
      const subscription = bleManager.onStateChange((stateBluetooth) => {
        setStatusBleManager("success");
        setBluetoothState(stateBluetooth);
      }, true);
      return () => {
        subscription.remove();
        bleManager.destroy();
      };
    },
    [bleManager]
  );

  const startScanBLE = async () => {
    const permission = await requestBluetoothPermission();
    if (permission) {
      bleManager
        .state()
        .then((state) => {
          if (state !== "PoweredOn") {
            Alert.alert(
              "Bluetooth Error",
              "Activa el Bluetooth primero pz sano"
            );
            return;
          }
          setIsScanningBLE(true);
          setDevicesBLE([]);
          bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.error(
                `Error during scan: ${error.message}, Reason: ${error.reason}`
              );
              Alert.alert("Scan Error", `Error: ${error.message}`);
              setIsScanningBLE(false);
              return;
            }
            if (device) {
              setDevicesBLE((prevDevices) => {
                if (!prevDevices.find((d) => d.id === device.id)) {
                  return [...prevDevices, device];
                }
                return prevDevices;
              });
            }
          });
        })
        .catch((error) => {
          console.error(`Bluetooth state error: ${error.message}`);
        });
    } else {
      Alert.alert(
        "Permission Error",
        "Location and Bluetooth permissions are required to scan for devicesBLE."
      );
    }
  };

  const stopScanBLE = () => {
    bleManager.stopDeviceScan();
    setIsScanningBLE(false);
  };

  const connectToDeviceBLE = async (device: DeviceBLE) => {
    try {
      stopScanBLE();
      // Verificar si el dispositivo ya está conectado
      const connectedDevices = await bleManager.connectedDevices([device.id]);
      if (connectedDevices.length > 0) {
        Alert.alert("Device is already connected");
        return;
      }

      // Intentar conectar al dispositivo
      const connectedDeviceBLE = await device.connect();
      setConnectedDeviceBLE(connectedDeviceBLE);
      Alert.alert("Connected to device");
    } catch (error) {
      if (error instanceof BleError) {
        console.error("BLE Error:", error.message);
        Alert.alert("BLE Error:", error.message);
      } else {
        console.error("Error:", error);
        Alert.alert("Error:", error?.toString());
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView
        style={{
          borderWidth: 2,
          borderColor: "green",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <ThemedText type="title">Bluetooht BLE</ThemedText>

        {statusBleManager === "pending" ||
          (statusBleManager === "idle" && (
            <ActivityIndicator size="large" color="#0000ff" />
          ))}

        {statusBleManager === "success" && (
          <>
            {bluetoothState === StateBluetooth.PoweredOn ? (
              <Text>Bluetooth is ON</Text>
            ) : bluetoothState === StateBluetooth.PoweredOff ? (
              <Text>Bluetooth is OFF</Text>
            ) : (
              <Text>Bluetooth State: {bluetoothState}</Text>
            )}
          </>
        )}

        {bluetoothState === StateBluetooth.PoweredOn && (
          <>
            <Text>
              Cuando el dispositivo está conectado, no transmitirá y debe
              desconectarse de la central para volver a escanear. Solo se puede
              registrar un agente de escucha de exploración.
            </Text>
            <Button
              title={isScanningBLE ? "Stop Scanning..." : "Start Scanning***"}
              color={isScanningBLE ? "blue" : "green"}
              onPress={isScanningBLE ? stopScanBLE : startScanBLE}
            />
            {connectedDeviceBLE && (
              <Text>Connected to: {connectedDeviceBLE.name}</Text>
            )}
            <FlatList
              showsHorizontalScrollIndicator
              showsVerticalScrollIndicator
              horizontal
              data={devicesBLE}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <Text>ID: {item.id}</Text>
                  <Text>Name: {item.name || "N/A"}</Text>
                  <Text>RSSI: {item.rssi}</Text>
                  <Text>LocalName: {item.localName}</Text>
                  <Text>ManufacturerData: {item.manufacturerData}</Text>
                  <Text>
                    IsConnectable:{" "}
                    {item.isConnectable ? (
                      <Text style={{ color: "green" }}>Yes</Text>
                    ) : (
                      <Text style={{ color: "red" }}>No</Text>
                    )}
                  </Text>
                  <Pressable style={{ width: 100, height: 50 }}>
                    <Button
                      title="Connect"
                      onPress={() => connectToDeviceBLE(item)}
                    />
                  </Pressable>
                </View>
              )}
            />
          </>
        )}
      </ThemedView>

      <ThemedView
        style={{
          borderWidth: 2,
          borderColor: "green",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <ThemedText type="title">Bluetooht BLC</ThemedText>
        {isBluetoothEnabledBLC ? (
          <Text>Bluetooth is ON</Text>
        ) : (
          <Text>Bluetooth is OFF</Text>
        )}
        {isBluetoothEnabledBLC && (
          <>
            <Text>Bluetooth devicesBLClasic:</Text>
            <Button
              title={isScanningBLC ? "Stop Scanning..." : "Start Scanning***"}
              color={isScanningBLC ? "blue" : "green"}
              onPress={isScanningBLC ? stopScanBLC : startScanBLC}
            />
            <FlatList
              showsHorizontalScrollIndicator
              showsVerticalScrollIndicator
              horizontal
              data={devicesBLC}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <Text>ID: {item.id}</Text>
                  <Text>Name: {item.name || "N/A"}</Text>
                  <Text>address: {item.address}</Text>
                  <Pressable style={{ width: 100, height: 50 }}>
                    <Button
                      title="Connect"
                      onPress={() => connectToDeviceBLC(item)}
                    />
                  </Pressable>
                </View>
              )}
            />
          </>
        )}
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
