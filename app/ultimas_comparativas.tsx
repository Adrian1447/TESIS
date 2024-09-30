import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
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

const UltimasComparativa = ({ navigation }: TProps) => {
  const [resultados, setResultados] = useState<Resultado[]>([
    { id: '1', tipo: 'Presión Arterial', valor: '120/80 mmHg', fecha: '2024-09-23' },
    { id: '2', tipo: 'Frecuencia Cardíaca', valor: '72 bpm', fecha: '2024-09-23' },
    { id: '3', tipo: 'Presión Arterial', valor: '130/85 mmHg', fecha: '2024-09-22' },
    { id: '4', tipo: 'Frecuencia Cardíaca', valor: '75 bpm', fecha: '2024-09-22' },
    { id: '5', tipo: 'Peso', valor: '70 kg', fecha: '2024-09-23' },
    { id: '6', tipo: 'Colesterol', valor: '200 mg/dL', fecha: '2024-09-23' },
    { id: '7', tipo: 'Glucosa', valor: '90 mg/dL', fecha: '2024-09-23' },
    { id: '8', tipo: 'Peso', valor: '68 kg', fecha: '2024-09-22' },
    { id: '9', tipo: 'Colesterol', valor: '190 mg/dL', fecha: '2024-09-22' },
    { id: '10', tipo: 'Glucosa', valor: '88 mg/dL', fecha: '2024-09-22' },
  ]);

  // Filtrar resultados por tipo (Presión Arterial, Frecuencia Cardíaca, Peso, Colesterol, Glucosa)
  const filterByType = (tipo: string) => {
    return resultados.filter(result => result.tipo === tipo);
  };

  // Función para comparar los resultados y calcular la diferencia
  const compareResults = (tipo: string) => {
    const filteredResults = filterByType(tipo);
    if (filteredResults.length < 2) return null;

    const latestResult = filteredResults[0];
    const previousResult = filteredResults[1];

    const latestValue = parseFloat(latestResult.valor.split(' ')[0]);
    const previousValue = parseFloat(previousResult.valor.split(' ')[0]);
    const difference = latestValue - previousValue;

    return `Cambio: ${difference > 0 ? '+' : ''}${difference} ${tipo === 'Presión Arterial' ? 'mmHg' : tipo === 'Frecuencia Cardíaca' ? 'bpm' : tipo === 'Peso' ? 'kg' : tipo === 'Colesterol' ? 'mg/dL' : 'mg/dL'}`;
  };

  const renderComparativeItem = ({ item }: { item: Resultado }) => (
    <View style={styles.resultRow}>
      <Text style={styles.resultDate}>{item.fecha}</Text>
      <Text style={styles.resultValue}>{item.valor}</Text>
    </View>
  );

  // Función para renderizar las secciones
  const renderSection = ({ item }: { item: string }) => {
    if (item === 'imágenes') {
      return (
        <View style={styles.imageContainer}>
          <View style={styles.imageItem}>
            <Image source={require('@/assets/images/pressure.png')} style={styles.image} />
            <Text style={styles.imageDescription}>Presión Arterial</Text>
          </View>
          <View style={styles.imageItem}>
            <Image source={require('@/assets/images/heart_rate_icon.png')} style={styles.image} />
            <Text style={styles.imageDescription}>Frecuencia Cardíaca</Text>
          </View>
        </View>
      );
    } else if (['Presión Arterial', 'Frecuencia Cardíaca', 'Peso', 'Colesterol', 'Glucosa'].includes(item)) {
      return (
        <View style={styles.comparativeContainer}>
          <Text style={styles.sectionTitle}>{item}</Text>
          <FlatList
            data={filterByType(item)}
            renderItem={renderComparativeItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.comparisonResult}>{compareResults(item)}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={['imágenes', 'Presión Arterial', 'Frecuencia Cardíaca', 'Peso', 'Colesterol', 'Glucosa']}
      renderItem={renderSection}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          {/* Botón de Retroceso */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Comparativa de Resultados</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20, // Añadir padding alrededor de todo el contenido
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  comparativeContainer: {
    marginBottom: 20,
    paddingVertical: 10, // Añadir espacio vertical
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
  resultDate: {
    fontSize: 18,
    color: '#333',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7E86',
  },
  comparisonResult: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10, // Añadir espacio vertical alrededor de las imágenes
  },
  imageItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  imageDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 10, // Añadir espacio entre la imagen y la descripción
  },
});

export default UltimasComparativa;