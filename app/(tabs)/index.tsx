import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BleManager } from "react-native-ble-plx";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

const bleManager = new BleManager();

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
    return (
      granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  } else if (Platform.OS === "ios") {
    const status = await check(PERMISSIONS.IOS.BLUETOOTH);
    if (status !== RESULTS.GRANTED) {
      const result = await request(PERMISSIONS.IOS.BLUETOOTH);
      return result === RESULTS.GRANTED;
    }
    return true;
  }
  return true;
};

export default function HomeScreen() {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === "ios") {
        const status = await check(PERMISSIONS.IOS.BLUETOOTH);
        if (status !== RESULTS.GRANTED) {
          await request(PERMISSIONS.IOS.BLUETOOTH);
        }
      }
    };

    checkPermissions();
  }, []);

  const startScan = async () => {
    const permission = await requestPermissions();
    if (permission) {
      bleManager
        .state()
        .then((state) => {
          if (state !== "PoweredOn") {
            Alert.alert(
              "Bluetooth Error",
              "Please enable Bluetooth to scan for devices."
            );
            return;
          }

          setIsScanning(true);
          setDevices([]);
          bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.error(
                `Error during scan: ${error.message}, Reason: ${error.reason}`
              );
              Alert.alert("Scan Error", `Error: ${error.message}`);
              setIsScanning(false);
              return;
            }
            if (device) {
              setDevices((prevDevices: any) => {
                if (!prevDevices.find((d: any) => d.id === device.id)) {
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
        "Location and Bluetooth permissions are required to scan for devices."
      );
    }
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
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
      <Button
        title={isScanning ? "Stop Scanning..." : "Start Scanning***"}
        color={isScanning ? "blue" : "green"}
        onPress={isScanning ? stopScan : startScan}
      />
      <FlatList
        data={devices}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name || "N/A"}</Text>
            <Text>RSSI: {item.rssi}</Text>
          </View>
        )}
      />
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
