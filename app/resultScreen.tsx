import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const ResultScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pantalla de</Text>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.date}>Setiembre 1, 2024 06:12pm</Text>
      <View style={styles.containerResult}>
        <Image
          source={require("@/assets/images/RectangleResultScreen.png")}
          style={{ width: 320 }}
        />
        <View style={styles.heartRateContainer}>
          <Image
            source={require("@/assets/images/heart.png")}
            style={{ width: 55, height: 55, right: 55, top: 10 }}
          />
          {/* <Text style={styles.bpm}>${message}</Text> */}
          <Text style={styles.subBpm}>BPM</Text>
          <View style={styles.heartRateInfo}>
            <Text style={[styles.heartRateRange, { color: "#FFCC00" }]}>
              60
            </Text>
            <Text style={[styles.heartRateRange, { color: "#00FF7F" }]}>
              102
            </Text>
            <Text style={[styles.heartRateRange, { color: "#FF6347" }]}>
              142
            </Text>
            <Text style={[styles.heartRateRange, { color: "#FF4500" }]}>
              183
            </Text>
            <Text style={[styles.heartRateRange, { color: "#DC143C" }]}>
              220
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Recomendaciones</Text>
      <View style={styles.statusContainer}>
        {["Standing", "Stretching", "Resting", "Exercise"].map(
          (status, index) => (
            <TouchableOpacity key={index} style={styles.statusButton}>
              <Text style={styles.statusText}>{status}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {["Excellent", "Good", "Angry", "In Love"].map((mood, index) => (
          <TouchableOpacity key={index} style={styles.moodButton}>
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
    flex: 2,
    top: 20,
    position: "absolute",
    alignItems: "center",
    marginBottom: 20,
  },
  bpmContainer: {},
  bpm: {
    position: "absolute",
    textAlign: "center",
    fontSize: 50,
    color: "#FFFFFF",
  },
  subBpm: {
    top: 33,
    right: 83,
    position: "absolute",
    fontSize: 18,
    color: "#8a8c8e",
  },
  heartRateInfo: {
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 10,
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
});

export default ResultScreen;
