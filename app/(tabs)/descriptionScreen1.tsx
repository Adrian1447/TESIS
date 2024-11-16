import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';

function DescriptionScreen1({next} : any){
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/doctor-checking-to-heartrate-monitor-4704802-3919128.jpg')} style={styles.image} />
      <Text style={styles.title}>Medición de la Frecuencia Cardíaca</Text>
      <Text style={styles.description}>Se tomará la máximo máximo de palpitaciones según tu edad y género.</Text>
      {/*<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('descriptionScreen2')}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ccc',
    marginHorizontal: 20,
  },
});

export default DescriptionScreen1;