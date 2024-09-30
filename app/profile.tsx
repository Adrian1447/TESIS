import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ListRenderItem, Image } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};
interface ListItem {
  id: string;
  title: string;
}

const ProfileScreen = ({ navigation }: TProps) => {
  const [showResultados, setShowResultados] = useState(false);
  const [showComparativa, setShowComparativa] = useState(false);

  const resultados: ListItem[] = [{ id: '1', title: 'Ultimos Resultados' }];
  const comparativas: ListItem[] = [{ id: '1', title: 'Ultimos Comparativas' }];

  const toggleResultados = () => {
    setShowResultados(!showResultados);
  };

  const toggleComparativa = () => {
    setShowComparativa(!showComparativa);
  };

  const renderListItem: ListRenderItem<ListItem> = ({ item }) => (
    <TouchableOpacity style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate("DashboardScreen") }}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      {/* Avatar and Edit Icon */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('@/assets/images/mayor_señor.png')} // Aquí deberías poner la URL real o el path a la imagen
        />
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate("EditProfileScreen")}>
          <Image
            style={styles.sizeIcon}
            source={require('@/assets/images/pencilblack.png')} // Aquí deberías poner la URL real o el path a la imagen
          />
        </TouchableOpacity>
      </View>

      {/* Sección de Resultados */}
      <TouchableOpacity onPress={toggleResultados} style={styles.section}>
        <Text style={styles.sectionText}>Resultados</Text>
        <Text style={styles.arrow}>{showResultados ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      {showResultados && (
        <FlatList
          data={resultados}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItemContainer}
              onPress={() => navigation.navigate('UltimosResultados', { item })}
            >
              <Text style={styles.listItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Sección de Comparativa */}
      <TouchableOpacity onPress={toggleComparativa} style={styles.section}>
        <Text style={styles.sectionText}>Comparativa</Text>
        <Text style={styles.arrow}>{showComparativa ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      {showComparativa && (
        <FlatList
          data={comparativas}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItemContainer}
              onPress={() => navigation.navigate('UltimasComparativa', { item })}
            >
              <Text style={styles.listItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Botón de Inicio Sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginButtonText}>Inicio Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 100,
    bottom: 0,
    backgroundColor: '#FFF',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sizeIcon: {
    width: 45,
    height: 45,
  },
  section: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: "#000",
  },
  listItemContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;