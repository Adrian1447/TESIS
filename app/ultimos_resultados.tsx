import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch, Modal, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type TProps = {
  navigation: StackNavigationProp<any, any>;
};

interface Resultado {
  id: string;
  tipo: string;
  valor: string;
  fecha: string;
}

const UltimosResultados = ({ navigation }: TProps) => {
  const [notifyMe, setNotifyMe] = useState(false);
  const [filterDate, setFilterDate] = useState<string | null>(null); // Estado para la fecha de filtrado
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  const [resultados, setResultados] = useState<Resultado[]>([
    { id: '1', tipo: 'Presión Arterial', valor: '120/80 mmHg', fecha: '2024-09-23' },
    { id: '2', tipo: 'Frecuencia Cardíaca', valor: '72 bpm', fecha: '2024-09-23' },
    { id: '3', tipo: 'Presión Arterial', valor: '130/85 mmHg', fecha: '2024-09-22' },
    { id: '4', tipo: 'Frecuencia Cardíaca', valor: '75 bpm', fecha: '2024-09-22' },
    { id: '5', tipo: 'Peso', valor: '70 kg', fecha: '2024-09-23' }, // Nuevo resultado Peso
    { id: '6', tipo: 'Nivel de Colesterol', valor: '200 mg/dL', fecha: '2024-09-23' }, // Nuevo resultado Colesterol
    { id: '7', tipo: 'Nivel de Glucosa', valor: '90 mg/dL', fecha: '2024-09-23' }, // Nuevo resultado Glucosa
    { id: '8', tipo: 'Peso', valor: '68 kg', fecha: '2024-09-22' },
    { id: '9', tipo: 'Nivel de Colesterol', valor: '190 mg/dL', fecha: '2024-09-22' },
    { id: '10', tipo: 'Nivel de Glucosa', valor: '88 mg/dL', fecha: '2024-09-22' },
  ]);

  // Filtrar los resultados por fecha si `filterDate` tiene un valor
  const filteredResults = filterDate
    ? resultados.filter(result => result.fecha === filterDate)
    : resultados;

  const renderItem = ({ item }: { item: Resultado }) => (
    <View style={styles.resultRow}>
      <Text style={styles.resultTitle}>{item.tipo}</Text>
      <Text style={styles.resultValue}>{item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botón de Retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Resultados Recientes</Text>

      {/* Botón para abrir el modal de filtrado */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterButtonText}>Filtrar por Fecha</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Notificaciones */}
      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Notificarme Diario</Text>
        <Switch
          value={notifyMe}
          onValueChange={(value) => setNotifyMe(value)}
          trackColor={{ false: '#767577', true: '#5AB9EA' }}
          thumbColor={notifyMe ? '#FFF' : '#f4f3f4'}
        />
      </View>
      <Text style={styles.nextQuiz}>Próxima medición en 6 horas</Text>

      {/* Botón de Compartir */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Compartir</Text>
      </TouchableOpacity>

      {/* Botón para ver detalles */}
      <TouchableOpacity style={styles.solutionButton}>
        <Text style={styles.solutionText}>VER DETALLES</Text>
      </TouchableOpacity>

      {/* Modal para seleccionar la fecha de filtrado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecciona una Fecha</Text>

          <TouchableOpacity
            style={[styles.modalButton, filterDate === '2024-09-23' && styles.activeFilterButton]}
            onPress={() => {
              setFilterDate('2024-09-23');
              setModalVisible(false);
            }}
          >
            <Text style={styles.filterButtonText}>23 Sep 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, filterDate === '2024-09-22' && styles.activeFilterButton]}
            onPress={() => {
              setFilterDate('2024-09-22');
              setModalVisible(false);
            }}
          >
            <Text style={styles.filterButtonText}>22 Sep 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, !filterDate && styles.activeFilterButton]}
            onPress={() => {
              setFilterDate(null);
              setModalVisible(false);
            }}
          >
            <Text style={styles.filterButtonText}>Mostrar Todos</Text>
          </TouchableOpacity>

          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: '#FF7E86',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    color: '#333',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7E86',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  switchText: {
    fontSize: 18,
    color: '#333',
  },
  nextQuiz: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5AB9EA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  shareText: {
    fontSize: 18,
    color: '#FFF',
  },
  solutionButton: {
    backgroundColor: '#FF7E86',
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solutionText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#FF7E86',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    alignSelf: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#000',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10,
  },
  activeFilterButton: {
    backgroundColor: '#FF7E86',
  },
});

export default UltimosResultados;