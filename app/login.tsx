import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

const LoginScreen = ({ navigation }: TProps) => {
  const [dni, setDNI] = useState('');

  const handleLogin = () => {
    // Aquí debes verificar si el DNI está registrado (por ejemplo, en Firebase o local storage)
    if (dni.length === 8) {
      // Simular que verificamos si el DNI está registrado
      console.log('Iniciando sesión con DNI:', dni);
      navigation.navigate("DashboardScreen");
    } else {
      Alert.alert('Error', 'Debe ingresar un DNI válido de 8 dígitos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/pequeno-medico-enfermera-cardiologia-que-examinan-corazon-presion-arterial-prescriben-tratamiento-ilustracion-vector-plano-chequeo-cardiovascular-medico-anatomia-hospital-enfermedades-corazon-concepto-atencion-medi.png')} 
          style={styles.logo} 
        />
      </View>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.loginText}>Ingresa a tu cuenta</Text>
      
      <TextInput
        placeholder="DNI"
        style={styles.input}
        keyboardType="numeric" // Teclado numérico
        maxLength={8}
        onChangeText={setDNI}
      />
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate("DashboardScreen")}
      >
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.noAccountText}>¿No tiene un cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.signUpText}>Registrate!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#E53E3E',
  },
  loginButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#808080',
    marginRight: 5,
  },
  signUpText: {
    color: '#E53E3E',
  },
});

export default LoginScreen;
