import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  Alert,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Dimensions,
  Linking,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothDeviceReadEvent,
} from "react-native-bluetooth-classic";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import * as Device from "expo-device";

const handlePermissionDenied = () => {
  Alert.alert(
    "Permiso bloqueado",
    "Uno o más permisos fueron denegados. Para continuar, habilita los permisos manualmente en la configuración.",
    [
      { text: "Abrir configuración", onPress: () => Linking.openSettings() },
      { text: "Cancelar", style: "cancel" },
    ]
  );
};

const requestAndroid31Permissions = async () => {
  try {
    if (Platform.OS === "android") {
      // Solicitar BLUETOOTH_SCAN
      const scanPermission = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      if (scanPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      // Solicitar BLUETOOTH_CONNECT
      const connectPermission = await request(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
      );
      if (connectPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      // Solicitar ACCESS_FINE_LOCATION
      const locationPermission = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (locationPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      // Si todos los permisos son concedidos
      alert("Permisos Bluetooth concedidos");
    }
  } catch (error) {
    console.error("Error solicitando permisos Bluetooth:", error);
  }
};

const requestBluetoothPermission = async () => {
  if (Platform.OS === "android") {
    if ((Device.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth requires Location",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

      return isAndroid31PermissionsGranted;
    }
  } else {
    return true;
  }
};

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function PrincipalScreen({ navigation }: TProps) {
  //#region Bluetooth BLC
  const [isScanningBLC, setIsScanningBLC] = useState<boolean>(false);
  const [devicesBLC, setDevicesBLC] = useState<BluetoothDevice[]>([]);
  const [isBluetoothEnabledBLC, setIsBluetoothEnabledBLC] =
    useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [messageState, setMessageState] = useState<string>("");
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
      // const granted = await requestBluetoothPermission();
      // if (!granted) {
      //   throw new Error("Access fine location was not granted");
      // }
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
        setMessageState(String(message));
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

  type TProps = {
    navigation: StackNavigationProp<any, any>;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={requestBluetoothPermission}
        style={styles.appButtonContainer}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#FFF" }}
        >
          Solicitar permisos Bluetooth
        </Text>
      </TouchableOpacity>
      <Text style={{ textAlign: "center", fontWeight: "bold", color: "#FFF" }}>
        {messageState}
      </Text>
      <View>
        <Text style={styles.title}>
          Asegurate que tu Bluetooth esté encedido.
        </Text>
        <FastImage
          source={require("@/assets/images/f35f936bc51ddff8ba8fdaf13209be9a.gif")}
          style={styles.imageBluetooth}
        />
        {isBluetoothEnabledBLC ? (
          <Text
            style={{
              paddingBottom: 50,
              fontWeight: "bold",
              color: "white",
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Bluetooth is ON
          </Text>
        ) : (
          <Text
            style={{
              paddingBottom: 50,
              fontWeight: "bold",
              color: "white",
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Bluetooth is OFF
          </Text>
        )}
        {isBluetoothEnabledBLC && (
          <>
            <Button
              title={isScanningBLC ? "Stop Scanning..." : "Start Scanning!"}
              color={isScanningBLC ? "blue" : "#97A0A8"}
              onPress={isScanningBLC ? stopScanBLC : startScanBLC}
            />
            <Button
              title="Next"
              onPress={() => navigation.navigate("HeartRateMonitor")}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D1D1D",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF", // White color for the text
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 50,
  },
  imageBluetooth: {
    width: 250,
    height: 250,
    bottom: 5,
    resizeMode: "contain",
    left: 20,
  },
  appButtonContainer: {
    top: 20,
    backgroundColor: "#97A0A8",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
  },
});
