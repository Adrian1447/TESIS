import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

const LoginScreen = ({ navigation }: TProps) => {
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
      />
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate("Principal")}
      >
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.noAccountText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text style={styles.signUpText}>Sign Up</Text>
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
