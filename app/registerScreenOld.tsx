import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterScreen = () => {
  const [DNI, dni] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
    console.log('Estado de visibilidad de contraseña:', !isPasswordVisible);
  };

  const handleRegister = () => {
    // Aquí manejo el registro, por ejemplo enviar los datos a tu backend o Firebase.
    console.log('Datos registrados:', { DNI });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <Image
        style={styles.icon}
        source={require('@/assets/images/grandparents.png')}
      />

      <Text style={styles.title}>REGISTRAR</Text>

      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={DNI}
        onChangeText={dni}
        placeholderTextColor="#fff"
        keyboardType='numeric'
        maxLength={8}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#fff"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.showPasswordText}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CREAR CUENTA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    padding: 20,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 10,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginVertical: 10,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  showPasswordText: {
    color: '#fff',
    fontSize: 18,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#E53E3E',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;