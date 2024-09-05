import React from "react";
import FastImage from "react-native-fast-image";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useBluetooth } from "@/context/BluetoothContext"; // Importar el hook del contexto
import { requestBluetoothPermission } from "@/utils/permissionsUtils";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function PrincipalScreen({ navigation }: TProps) {
  const {
    isScanningBLC,
    devicesBLC,
    startScanBLC,
    stopScanBLC,
    connectToDeviceBLC,
    data,
    isBluetoothEnabledBLC,
    messageState,
  } = useBluetooth(); // Usamos el contexto Bluetooth

  const width = Dimensions.get("window").width;
  console.log("messageState", messageState);
  console.log("data", data);

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
    color: "#FFF",
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
