import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';// You can replace this with any icon library you use


const Medicion = () => {
  return (
    <View style={styles.appContainer}>
      <View style={styles.dataContainerMedicion}> 
        <Image source={require('@/assets/images/CircleMonitor2.png')}style={{width: 250, height: 250, bottom: 10}}/>
        <Text style={styles.dataMedicion}>--</Text>
        <Image source={require('@/assets/images/red-heart.jpg')} style={{width: 40, height: 40, position: 'absolute', right: 65, top: 75}}/>
        <Text style={styles.unitMedicion}>BRM</Text>
      </View>
      <Text style={styles.dataPromedio}>Promedio 71</Text>
      <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
  },
  dataContainerMedicion: {
    alignItems: 'center',
    marginBottom: 20,
  },
  unitMedicion:{
    fontSize: 23,
    color: '#000',
    position: 'absolute',
    top: 110,
    right: 54
  },
  dataMedicion: {
    top: 60,
    left: 60,
    position: 'absolute',
    fontSize: 70,
    color: '#000',
    fontWeight: 'bold',
  },
  dataPromedio:{
    bottom: 310,
    left: 125,
    position: 'absolute',
    fontSize: 20,
    color: '#7D7A8E',
    fontWeight: 'bold',
  },
  startButton: {
    alignItems: 'center',
    width: 250,
    backgroundColor: '#97A0A8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top: 20
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Medicion;
