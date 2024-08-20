import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput  } from 'react-native';
import Slider from '@react-native-community/slider';

const DataMonitor = () => {
  const [age, setAge] = useState('26');
  const [weight, setWeight] = useState('61');

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/RectangleDataMonitor.png')} />
      <View style={styles.subContainer}>
        <Text style={styles.header}>Hola!</Text>
        <Text style={styles.subHeader}>Empecemos con datos que son necesarios para el monitoreo.</Text>
      </View>
      
      <View style={styles.dataContainer}>
        <Text style={styles.labelEdad}>Edad</Text>
        <Image source={require('@/assets/images/CircleDataMonitor1.png')} />
        <TextInput
          style={styles.dataEdad}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric" // Teclado numérico
          maxLength={3} // Limita la edad a 3 dígitos
          textAlign="center"
          />
          <Image source={require('@/assets/images/5883396.png')} style={{width: 40, height: 40, position: 'absolute', right: 50, top: 110}}/>
          <Text style={styles.unitEdad}>AÑOS</Text>
      </View>
      
      <View style={styles.dataContainer}>
        <Text style={styles.labelPeso}>Peso</Text>
        <Image source={require('@/assets/images/CircleDataMonitor1.png')} />
        <TextInput
          style={styles.dataPeso}
          value={weight}
          onChangeText={setAge}
          keyboardType="numeric" // Teclado numérico
          maxLength={3} // Limita la edad a 3 dígitos
          textAlign="center"
          />
           <Image source={require('@/assets/images/1712070-200.png')} style={{width: 40, height: 40, position: 'absolute', right: 50, top: 110}}/>
          <Text style={styles.unitPeso}>KG</Text>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    top: 40,
    position: 'absolute',
  },
  header: {
    top: -20,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
  },
  subHeader: {
    top: -20,
    fontSize: 20,
    color: 'black',
    textAlign: 'justify',
  },
  dataContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  labelEdad: {
    top: 20,
    right:120,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  labelPeso: {
    top: 20,
    right:120,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dataEdad: {
    top: 85,
    left: 40,
    position: 'absolute',
    fontSize: 80,
    color: '#000',
    fontWeight: 'bold',
  },
  dataPeso:{
    top: 85,
    left: 40,
    position: 'absolute',
    fontSize: 80,
    color: '#000',
    fontWeight: 'bold',
  },
  unitEdad: {
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 150,
    right: 50

  },
  unitPeso: {
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 155,
    right: 65
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DataMonitor;
