import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

function DescriptionScreen3({ navigation }: TProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/elderly-people-exercise-old-man-woman-doing-yoga_533410-1783-removebg-preview.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Aplicación de Métodos de Autocuidado</Text>
      <Text style={styles.description}>
        Se aplicarán métodos de autocuidado para mejorar tu salud.
      </Text>
      {/*<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('principal')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DashboardScreen")}>
        
        <Text style={styles.buttonText}>Comencemos</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#ccc",
    marginHorizontal: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default DescriptionScreen3;
