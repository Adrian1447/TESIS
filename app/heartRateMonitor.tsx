import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HeartRateMonitor = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/RectangleHeartMonitor.png')} />
      <View style={styles.subContainer}>
        <Text style={styles.title}>Mide tu Frecuencia Cardiaca</Text>
      </View>
      <Image 
        source={require('@/assets/images/heart-beat-5665510-4788941.jpg')} // assuming you have a heart image in assets
        style={styles.heartImage}
      />
      <View style={styles.heartRateContainer}>
      <Image source={require('@/assets/images/RectangleHeartMonitorBottom.png')}/>
        <View style={styles.heartRateContainerInside}>
          <Image source={require('@/assets/images/RectangleHeartMonitorInside.png')}/>
          <View style={styles.heartRateContainerInsideText}>
           <Text style={styles.heartRateText}>Frecuencia Cardiaca</Text>
            <View style={styles.heartRateScale}>
              <Text style={[styles.scaleText]}>60</Text>
              <Text style={[styles.scaleText]}>102</Text>
              <Text style={[styles.scaleText]}>142</Text>
              <Text style={[styles.scaleText]}>183</Text>
              <Text style={[styles.scaleText]}>220</Text>
            </View>
            <View style={styles.heartRateLabels}>
              <Text style={[styles.labelText, styles.average]}>Promedio</Text>
              <Text style={[styles.labelText, styles.healthy]}>Saludable</Text>
              <Text style={[styles.labelText, styles.maximum]}>Máximo</Text>
              <Text style={[styles.labelText, styles.danger]}>Peligro</Text>
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Comencemos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    top: 80,
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  },
  heartImage: {
    top: 20,
    width: 150,
    height: 150,
  },
  heartRateContainer: {
    top: 25,
    backgroundColor: '#1c1c1c',
    padding: 20,
    alignItems: 'center',

  },
  heartRateContainerInside: {
    top: 50,
    position: 'absolute'
  },
  heartRateContainerInsideText:{
    position: 'absolute',
    alignContent: 'center',
  },
  heartRateText: {
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  heartRateScale: {
    flex: 2,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight:10,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scaleText: {
    fontSize: 14,
    color: '#fff',
  },
  average: {
    color: '#ffff00',
  },
  healthy: {
    color: '#00ff00',
  },
  maximum: {
    color: '#ff8800',
  },
  danger: {
    color: '#ff0000',
  },
  heartRateLabels: {
    flex: 2,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    fontWeight:'bold'
  },
  startButton: {
    alignItems: 'center',
    width: 300,
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    left: 20
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HeartRateMonitor;