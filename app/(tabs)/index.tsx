import {
  Button,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import BluetoothSerial from "react-native-bluetooth-serial-next";

export default function HomeScreen() {
  const [devices, setDevices] = useState<
    (
      | BluetoothSerial.AndroidBluetoothDevice
      | BluetoothSerial.iOSBluetoothDevice
    )[]
  >([]);
  const [connected, setConnected] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<
    | BluetoothSerial.AndroidBluetoothDevice
    | BluetoothSerial.iOSBluetoothDevice
    | null
  >(null);
  const [data, setData] = useState<string>("");
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(false);
  const readIntervalRef = useRef<any>(null);

  useEffect(() => {
    const enableBluetooth = async () => {
      try {
        await BluetoothSerial?.requestEnable();
        setBluetoothEnabled(true);
        const availableDevices = await BluetoothSerial?.list();
        setDevices(availableDevices);
      } catch (err) {
        console.error(err);
        setBluetoothEnabled(false);
      }
    };
    enableBluetooth();
    return () => {
      if (readIntervalRef.current) {
        clearInterval(readIntervalRef.current);
        readIntervalRef.current = null;
      }
    };
  }, []);

  const connectToDevice = async () => {
    if (selectedDevice) {
      try {
        await BluetoothSerial.connect(selectedDevice.id);
        setConnected(true);
        readIntervalRef.current = setInterval(async () => {
          const data = await BluetoothSerial.readFromDevice();
          setData(data);
        }, 1000); // Read data every second
      } catch (err) {
        console.error(err);
      }
    }
  };

  const disconnectFromDevice = async () => {
    if (connected && readIntervalRef.current) {
      clearInterval(readIntervalRef.current);
      readIntervalRef.current = null;
      await BluetoothSerial.disconnect();
      setConnected(false);
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
      <View style={styles.container}>
        <Text style={styles.header}>Bluetooth Devices</Text>
        <Text
          style={[
            styles.bluetoothStatus,
            { color: bluetoothEnabled ? "green" : "red" },
          ]}
        >
          Bluetooth {bluetoothEnabled ? "Enabled" : "Disabled"}
        </Text>
        <FlatList
          data={devices as BluetoothSerial.AndroidBluetoothDevice[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Button title={item.name} onPress={() => setSelectedDevice(item)} />
          )}
        />
        {selectedDevice && !connected && (
          <Button title="Conectar" onPress={connectToDevice} />
        )}
        {connected && (
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data}</Text>
            <Button title="Disconnect" onPress={disconnectFromDevice} />
          </View>
        )}
      </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  bluetoothStatus: {
    fontSize: 16,
    marginVertical: 10,
  },
  dataContainer: {
    marginTop: 20,
  },
  data: {
    fontSize: 18,
    color: "blue",
  },
});
