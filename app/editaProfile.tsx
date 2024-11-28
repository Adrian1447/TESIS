import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, Button, Modal, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

const EditProfileScreen = ({navigation }: TProps) => {
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.navigate("ProfileScreen")}}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      {/* Avatar y Edit Icon */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('@/assets/images/mayor_señor.png')}
        />
      </View>

      {/* Form Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Primer Nombre</Text>
        <TextInput style={styles.input} placeholder="Primer Nombre" />

        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} placeholder="Apellido" />

        {/* Birth Date Picker */}
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TouchableOpacity style={styles.placeholder} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.placeholderText}>{birthDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Gender Picker */}
        <Text style={styles.label}>Género</Text>
        <TouchableOpacity style={styles.placeholder} onPress={() => setShowGenderModal(true)}>
          <Text style={styles.placeholderText}>{gender || 'Selecciona tu género'}</Text>
        </TouchableOpacity>

        {/* Modal for gender selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showGenderModal}
          onRequestClose={() => setShowGenderModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona tu género</Text>
              <TouchableOpacity onPress={() => { setGender('Hombre'); setShowGenderModal(false); }}>
                <Text style={styles.genderOption}>Hombre</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setGender('Mujer'); setShowGenderModal(false); }}>
                <Text style={styles.genderOption}>Mujer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setGender('Otro'); setShowGenderModal(false); }}>
                <Text style={styles.genderOption}>Otro</Text>
              </TouchableOpacity>
              <Button title="Cerrar" onPress={() => setShowGenderModal(false)} />
            </View>
          </View>
        </Modal>
      </View>

      {/* Change Password Button */}
      <Button
        title="Guardar"
        onPress={() => Alert.alert('Información Actualizada')}
        color="black"
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Cerrar Sesión')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute', // Superposición
    right: 100, // Se posiciona dentro del avatar, en la esquina inferior derecha
    bottom: 0, // Mueve el ícono hacia arriba desde la esquina inferior
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 2, // Sombras en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 2 }, // Sombras en iOS
    shadowOpacity: 0.25, // Sombras en iOS
    shadowRadius: 3.84, // Sombras en iOS
  },
  sizeIcon:{
    width: 40,
    height: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    fontSize: 16,
    padding: 10,
  },
  placeholder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genderOption: {
    fontSize: 16,
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});

export default EditProfileScreen;
