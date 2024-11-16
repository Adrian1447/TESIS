import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Image,
} from "react-native";

const ResultScreen = () => {
  const [bpm, setBpm] = useState<number | null>(80); // Valor inicial de BPM
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null); // Estado para técnica seleccionada
  const [selectedMood, setSelectedMood] = useState<string | null>(null); // Estado para el estado de ánimo seleccionado

  // Función para determinar recomendaciones según el BPM
  const getRecommendations = () => {
    if (bpm === null) return "N/A"; // Validar que bpm no sea null
    if (bpm < 60) {
      return "Te recomendamos descansar y consultar con un médico si te sientes débil o mareado.";
    } else if (bpm >= 60 && bpm < 100) {
      return "Tu frecuencia cardíaca está en un rango saludable. Mantén un estilo de vida activo y balanceado.";
    } else if (bpm >= 100 && bpm < 140) {
      return "Considera realizar ejercicios de respiración profunda o técnicas de relajación. Evita el estrés excesivo.";
    } else {
      return "Tu frecuencia cardíaca está alta. Te sugerimos reducir la actividad física intensa y consultar con un médico.";
    }
  };

  // Función para obtener la descripción de cada técnica de autocuidado
  const getSelfCareDescription = (technique: string) => {
    switch (technique) {
      case "Caminar":
        return "Mantén una postura erguida, distribuye tu peso en ambos pies, y evita permanecer de pie por largos periodos.";
      case "Estirarse":
        return "Realiza estiramientos suaves para mejorar la flexibilidad, como estirar los brazos sobre la cabeza.";
      case "Descansar":
        return "Descansa en una posición cómoda, preferiblemente recostado con las piernas elevadas.";
      case "Ejercicio":
        return "Realiza ejercicios ligeros como caminar o nadar, ideal para fortalecer músculos.";
      default:
        return "";
    }
  };

  // Función para abrir el modal y establecer la técnica seleccionada
  const openModal = (technique: string) => {
    setSelectedTechnique(technique);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pantalla de</Text>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.date}>Setiembre 1, 2024 06:12pm</Text>
      <View style={styles.containerResult}>
        <View style={styles.heartRateContainer}>
          {bpm !== null ? (
            <Text style={styles.bpm}>{bpm}</Text>
          ) : (
            <Text style={styles.bpm}>N/A</Text>
          )}
          <Text style={styles.subBpm}>BPM</Text>

          {/* Imagen de la barra de colores */}
          <Image source={require('@/assets/images/Medidas.png')} style={styles.bar} />

          <View style={styles.heartRateInfo}>
            <Text style={[styles.heartRateRange, { color: "#FFCC00" }]}>60</Text>
            <Text style={[styles.heartRateRange, { color: "#00FF7F" }]}>102</Text>
            <Text style={[styles.heartRateRange, { color: "#FF6347" }]}>142</Text>
            <Text style={[styles.heartRateRange, { color: "#FF4500" }]}>183</Text>
            <Text style={[styles.heartRateRange, { color: "#DC143C" }]}>220</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />

      {/* Recomendaciones basadas en BPM */}
      <Text style={styles.sectionTitle}>Recomendaciones</Text>
      <Text style={styles.recommendationText}>{getRecommendations()}</Text>

      {/* Botones para abrir el modal */}
      <View style={styles.statusContainer}>
        {["Caminar", "Estirarse", "Descansar", "Ejercicio"].map((status, index) => (
          <TouchableOpacity
            key={index}
            style={styles.statusButton}
            onPress={() => openModal(status)}
          >
            <Text style={styles.statusText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>¿Cómo te sientes hoy?</Text>
      <View style={styles.moodContainer}>
        {["Excelente", "Bien", "Enojado", "Enamorado"].map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMoodButton, // Aplicar estilo cuando está seleccionado
            ]}
            onPress={() => setSelectedMood(mood)} // Establecer el estado de ánimo seleccionado
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.recheckButton}>
          <Text style={styles.recheckText}>Recheck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para mostrar la técnica seleccionada */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTechnique}</Text>
            <Text style={styles.modalDescription}>
              {selectedTechnique ? getSelfCareDescription(selectedTechnique) : ""}
            </Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1c1c1e",
    padding: 20,
  },
  containerResult: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  date: {
    paddingTop: 10,
    fontSize: 16,
    color: "#A4A4A4",
    textAlign: "center",
    marginBottom: 20,
  },
  heartRateContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  bpm: {
    textAlign: "center",
    fontSize: 50,
    color: "#FFFFFF",
  },
  subBpm: {
    fontSize: 18,
    color: "#8a8c8e",
  },
  bar: {
    height: 20,
    resizeMode: 'contain',
  },
  heartRateInfo: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  heartRateRange: {
    fontSize: 12,
    color: "#A4A4A4",
  },
  sectionTitle: {
    paddingTop: 10,
    fontSize: 16,
    color: "#A4A4A4",
    textAlign: "center",
    marginBottom: 20,
  },
  recommendationText: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statusButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  moodText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  selectedMoodButton: {
    backgroundColor: "#4A90E2", // Color del botón cuando está seleccionado
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  recheckButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  recheckText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#272a2e",
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ResultScreen;
