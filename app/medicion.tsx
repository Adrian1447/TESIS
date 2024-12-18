import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"; 
import { StackNavigationProp } from "@react-navigation/stack";
import { useBluetooth } from "@/context/BluetoothContext";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

const Medicion = ({ navigation }: TProps) => {
  const {
    data,
    connectToHC06Device
  } = useBluetooth(); 
  return (
    <View style={styles.appContainer}>
      <View style={styles.dataContainerMedicion}>
        <Image
          source={require("@/assets/images/CircleMonitor2.png")}
          style={{ width: 250, height: 250, bottom: 10 }}
        />
        <Text style={styles.dataMedicion}>{data}</Text>
        <Image
          source={require("@/assets/images/red-heart.jpg")}
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: 65,
            top: 75,
          }}
        />
        <Text style={styles.unitMedicion}>BPM</Text>
      </View>
      <Text style={styles.dataPromedio}>Promedio 71</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={connectToHC06Device}
      >
        <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate("ResultScreen")}
      >
        <Text style={styles.loginButtonText}>siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
  },
  dataContainerMedicion: {
    alignItems: "center",
    marginBottom: 20,
  },
  unitMedicion: {
    fontSize: 23,
    color: "#000",
    position: "absolute",
    top: 110,
    right: 54,
  },
  dataMedicion: {
    top: 60,
    left: 60,
    position: "absolute",
    fontSize: 70,
    color: "#000",
    fontWeight: "bold",
  },
  dataPromedio: {
    bottom: 380,
    left: 125,
    position: "absolute",
    fontSize: 20,
    color: "#7D7A8E",
    fontWeight: "bold",
  },
  startButton: {
    alignItems: "center",
    width: 250,
    backgroundColor: "#97A0A8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Medicion;
