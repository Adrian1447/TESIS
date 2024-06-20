import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HeartRateMonitor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mide tu Frecuencia Cardiaca</Text>
      <Image source={require('@/assets/images/heart-beat-5665510-4788941.jpg')} style={styles.heartImage} />
      <View style={styles.heartRateContainer}>
        <Text style={styles.heartRateText}>Frecuencia Cardiaca</Text>
        <View style={styles.heartRateScale}>
          <Text style={[styles.scaleText, styles.average]}>60</Text>
          <Text style={[styles.scaleText, styles.healthy]}>102</Text>
          <Text style={[styles.scaleText, styles.maximum]}>142</Text>
          <Text style={[styles.scaleText, styles.danger]}>183</Text>
          <Text style={[styles.scaleText, styles.danger]}>220</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  heartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heartRateContainer: {
    width: '90%',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  heartRateText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  heartRateScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HeartRateMonitor;