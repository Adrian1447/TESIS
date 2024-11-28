import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function DashboardScreen({ navigation }: TProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const currentStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={currentStyles.container}>
      {/* Header Section */}
      <View style={currentStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image 
            source={require('@/assets/images/mayor_señor.png')} 
            style={currentStyles.headerUser}
          />
        </TouchableOpacity>
        <Text style={currentStyles.greeting}>Hola!</Text>
        <View style={currentStyles.iconContainer}>
          {/* Notification Icon */}
          <TouchableOpacity style={currentStyles.notificationIcon}>
            <Image 
              source={require('@/assets/images/campana-de-notificacion.png')} 
              style={[
                currentStyles.notificationImage,
                { tintColor: isDarkMode ? '#FFFFFF' : '#000000' },
              ]}
            />
          </TouchableOpacity>

          {/* Dark Mode Icon */}
          <TouchableOpacity onPress={toggleDarkMode} style={currentStyles.darkModeIcon}>
            {isDarkMode ? (
              <Image
                source={require('@/assets/images/brightness-contrast.png')} // Modo oscuro
                style={[
                  currentStyles.darkModeImage,
                  { tintColor: isDarkMode ? '#FFFFFF' : '#000000' }, // Cambia el color según el modo
                ]}
              />
            ) : (
              <Image
                source={require('@/assets/images/dark-theme.png')} // Modo claro
                style={currentStyles.darkModeImage} // Usa el mismo estilo para ambas imágenes
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={currentStyles.title}>Cuidado del Corazón</Text>

      {/* Health Section */}
      <View style={currentStyles.healthCard}>
        <View style={sharedStyles.healthHeader}>
          {/* Left Column: Text */}
          <View style={sharedStyles.leftColumn}>
            <Image source={require('@/assets/images/simple-heart.jpg')} style={currentStyles.heart} />
            <Text style={currentStyles.healthTitle}>Salud</Text>
            <Text style={currentStyles.healthSubtitle}>Última vez diagnosticado - Hace 3 días</Text>
            <TouchableOpacity style={currentStyles.diagnosticButton} onPress={() => navigation.navigate("DataMonitor")}>
              <Text style={currentStyles.diagnosticButtonText}>Diagnosticar</Text>
            </TouchableOpacity>
          </View>

          {/* Right Column: Image */}
          <View style={sharedStyles.rightColumn}>
            <Image source={require('@/assets/images/forma-de-coraz-n-Artificial.png')} style={currentStyles.heartImage} />
          </View>
        </View>
      </View>

      {/* Health Measurements */}
      <View style={sharedStyles.measurements}>
        <View style={currentStyles.measurementItemPressure}>
          <Image source={require('@/assets/images/estetoscopio.png')} style={currentStyles.estetoscopio} />
          <Text style={currentStyles.measurementLabel}>Presión Arterial</Text>
          <Text style={currentStyles.measurementValue}>123 / 80 mmHg</Text>
        </View>
        <View style={currentStyles.measurementItemRhythm}>
          <Image source={require('@/assets/images/music-rhythm.jpg')} style={currentStyles.estetoscopio} />
          <Text style={currentStyles.measurementLabel}>Ritmo Cardiaco</Text>
          <Text style={currentStyles.measurementValue}>67 / min</Text>
        </View>
      </View>

      {/* Doctor Info */}
      <View style={currentStyles.doctorInfo}>
        <Image source={require('@/assets/images/istockphoto-177373093-612x612.jpg')} style={currentStyles.doctorImage} />
        <View style={currentStyles.doctorDetails}>
          <Text style={currentStyles.doctorName}>Robert Fox</Text>
          <Text style={currentStyles.doctorSpecialty}>Cardiologist</Text>
        </View>
        <View style={sharedStyles.doctorActions}>
          <TouchableOpacity style={currentStyles.callButton}>
            <Text>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={currentStyles.messageButton}>
            <Text>💬</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Estilos compartidos que no cambian entre claro y oscuro
const sharedStyles = StyleSheet.create({
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  measurements: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  doctorActions: {
    flexDirection: 'row',
  },
  callButton: {
    marginRight: 10,
  },
  messageButton: {},
});

// Estilos para el modo claro
const lightStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    flex: 1,
    backgroundColor: '#F4F8F4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    right: 60,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    padding: 10,
    right: 10,
  },
  notificationImage: {
    width: 20,
    height: 20,
  },
  darkModeIcon: {
    padding: 10,
  },
  darkIconCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  lightIconCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  healthCard: {
    backgroundColor: '#d0e9bc',
    borderRadius: 40,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  healthSubtitle: {
    fontSize: 14,
    color: '#A9A9A9',
    marginVertical: 10,
  },
  diagnosticButton: {
    marginLeft: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginTop: 10,
  },
  diagnosticButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  heartImage: {
    borderRadius: 40,
    width: 150,
    height: 200,
  },
  heart: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  estetoscopio: {
    borderRadius: 50,
    width: 60,
    height: 60,
    right: 20,
  },
  measurementItemPressure: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  measurementItemRhythm: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  measurementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorDetails: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  darkModeImage: {
    width: 24,
    height: 24,
  },
});

// Estilos para el modo oscuro
const darkStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerUser: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    right: 60,
    color: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    padding: 10,
    right: 10,
  },
  notificationImage: {
    width: 20,
    height: 20,
  },
  darkModeIcon: {
    padding: 10,
  },
  darkIconCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  lightIconCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  healthCard: {
    backgroundColor: '#333',
    borderRadius: 40,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  healthSubtitle: {
    fontSize: 14,
    color: '#A9A9A9',
    marginVertical: 10,
  },
  diagnosticButton: {
    marginLeft: 20,
    right: 20,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    marginTop: 10,
  },
  diagnosticButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heartImage: {
    borderRadius: 40,
    width: 150,
    height: 200,
  },
  heart: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  estetoscopio: {
    borderRadius: 50,
    width: 60,
    height: 60,
    right: 20,
  },
  measurementItemPressure: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  measurementItemRhythm: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  measurementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorDetails: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  darkModeImage: {
    width: 24,
    height: 24,
  },
});