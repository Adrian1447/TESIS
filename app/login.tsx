import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/hooks/useAuth"; // Importa el hook de autenticación

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

const LoginScreen = ({ navigation }: TProps) => {
  const [dni, setDNI] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (dni.length === 8 && password) {
      const response = await login(dni, password);
      if (response.success) {
        navigation.navigate("DashboardScreen");
      } else {
        Alert.alert("Error", response.error || "No se pudo iniciar sesión.");
      }
    } else {
      Alert.alert("Error", "Debe ingresar un DNI válido y una contraseña.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <TextInput
        placeholder="DNI"
        style={styles.input}
        keyboardType="numeric"
        maxLength={8}
        onChangeText={setDNI}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
