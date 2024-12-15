import { registerUser } from "@/utils/registerUser";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const RegisterScreen = () => {
  const [dni, setDNI] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");

  const handleRegister = async () => {
    if (dni.length === 8 && password && nombre && apellidos) {
      const response = await registerUser(dni, password, nombre, apellidos);
      if (response.success) {
        Alert.alert("Éxito", "Usuario registrado correctamente.");
      } else {
        Alert.alert(
          "Error",
          response.error || "No se pudo registrar el usuario."
        );
      }
    } else {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos correctamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Usuario</Text>
      <TextInput
        placeholder="DNI"
        style={styles.input}
        keyboardType="numeric"
        maxLength={8}
        onChangeText={setDNI}
      />
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellidos"
        style={styles.input}
        onChangeText={setApellidos}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
