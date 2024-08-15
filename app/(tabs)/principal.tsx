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
  Dimensions,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceReadEvent,
} from "react-native-bluetooth-classic";
// import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

const requestAccessFineLocationPermission = async () => {
  try {
    // Verifica si la plataforma es Android (esto no es necesario en iOS)
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      console.log("Granted:", granted);

      // Revisa los resultados para cada permiso
      const permissionsGranted =
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED;

      if (permissionsGranted) {
        console.log("All permissions granted");
      } else {
        console.log("One or more permissions denied");
        Alert.alert("Permiso denegado", "One or more permissions denied");
      }
    } else {
      console.log("Platform is not Android, no permissions needed");
    }
  } catch (err) {
    console.error("Error while requesting permissions:", err);
  }

  // const granted = await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   {
  //     title: "Access fine location required for discovery",
  //     message:
  //       "In order to perform discovery, you must enable/allow " +
  //       "fine location access.",
  //     buttonNeutral: "Ask Me Later",
  //     buttonNegative: "Cancel",
  //     buttonPositive: "OK",
  //   }
  // );
  // return granted === PermissionsAndroid.RESULTS.GRANTED;
};

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

export default function PrincipalScreen() {
  //#region Bluetooth BLC
  const [isScanningBLC, setIsScanningBLC] = useState<boolean>(false);
  const [devicesBLC, setDevicesBLC] = useState<BluetoothDevice[]>([]);
  const [isBluetoothEnabledBLC, setIsBluetoothEnabledBLC] =
    useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  console.log("Data");

  //region Bluetooth Classic Functions
  const onReceivedData = (event: BluetoothDeviceReadEvent) => {
    setData((data: any) => [
      ...data,
      {
        moreInfo: {
          ...event,
          timestamp: new Date(), // Add the current date
          type: "receive", // Add a type for UI
        },
      },
    ]);
  };

  const startScanBLC = async () => {
    try {
      setDevicesBLC([]);
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
        const connectedDevice = await device.connect();
        console.log(connectedDevice);
        device.onDataReceived(onReceivedData);
        console.log("Message");
        const message = await device.read();
        console.log(message);
        Alert.alert(`Connected to ${device.name}`);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e?.toString());
    }
  };

  useEffect(function firstLoadingLibraryBlC() {
    (async () => {
      try {
        console.log("RNBluetoothClassic");
        const isBluetoothAvailable =
          await RNBluetoothClassic.isBluetoothAvailable();
        console.log("isBluetoothAvailable", isBluetoothAvailable);
        const isBluetoothEnabled =
          await RNBluetoothClassic.isBluetoothEnabled();
        console.log("isBluetoothEnabled", isBluetoothEnabled);
        setIsBluetoothEnabledBLC(isBluetoothEnabled);
      } catch (error) {
        // console.error("Error:", error);
      }
    })();
  }, []);

  const width = Dimensions.get("window").width;

  return (
    <View>
      <Button
        title="request permissions"
        onPress={requestAccessFineLocationPermission}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Asegurate que tu Bluetooth esté encedido.
        </ThemedText>
        <Image
          source={require("@/assets/images/f35f936bc51ddff8ba8fdaf13209be9a.gif")}
          style={styles.imageBluetooth}
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
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
  background: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    color: "#FFF",
  },
  image1: { position: "relative", aspectRatio: "0.89" },
  imageBluetooth: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});
