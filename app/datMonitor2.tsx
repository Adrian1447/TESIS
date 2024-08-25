import React, { useState } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    TextInput
} from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";

type TProps = {
  navigation: StackNavigationProp<any, any>;
};


const DataMonitor2 = ({ navigation }: TProps) => {
    const [presion, setPresion] = useState('65');
    const [colestrol, setColesterol] = useState('150');
    const [glucosa, setGlucosa] = useState('100');
  return (
    <View style={styles.appContainer}>
        {/* PRESION ARTERIAL */}
        <View style={styles.dataContainerPresion}> 
            <Text style={styles.labelPresionArterilal}>Presion Arterial</Text>
            <Image source={require('@/assets/images/CircleMonitor2.png')} style={{width: 160, height: 160, bottom: 10}}/>
                <TextInput
                style={styles.dataPresionArterial}
                value={presion}
                onChangeText={setPresion}
                keyboardType="numeric" // Teclado numérico
                maxLength={3} // Limita la edad a 3 dígitos
                textAlign="center"
            />
            <Image source={require('@/assets/images/1142147.png')} style={{width: 30, height: 30, position: 'absolute', right: 35, top: 80}}/>
            <Text style={styles.unitPresionArterial}>Hg</Text>
        </View>
        {/* COLESTEROL */}
        <View style={styles.dataContainerColesterol}>
            <Text style={styles.labelColesterol}>Nivel de Colesterol</Text>
            <Image source={require('@/assets/images/CircleMonitor2.png')} style={{width: 160, height: 160,bottom: 10}}/>
                <TextInput
                style={styles.dataColesterol}
                value={colestrol}
                onChangeText={setColesterol}
                keyboardType="numeric" // Teclado numérico
                maxLength={3} // Limita la edad a 3 dígitos
                textAlign="center"
            />
            <Image source={require('@/assets/images/6192010.png')} style={{width: 30, height: 30, position: 'absolute', right: 35, top: 85}}/>
            <Text style={styles.unitColesterol}>mg/dl</Text>
        </View>
        {/* GLUCOSA */}
        <View style={styles.dataContainerGlucosa}>
            <Text style={styles.labelGlucosa}>Nivel de Glucosa</Text>
            <Image source={require('@/assets/images/CircleMonitor2.png')} style={{width: 160, height: 160,bottom: 10}}/>
                <TextInput
                style={styles.dataGlucosa}
                value={glucosa}
                onChangeText={setGlucosa}
                keyboardType="numeric" // Teclado numérico
                maxLength={3} // Limita la edad a 3 dígitos
                textAlign="center"
            />
            <Image source={require('@/assets/images/6192150.png')} style={{width: 30, height: 30, position: 'absolute', right: 35, top: 85}}/>
            <Text style={styles.unitGlucosa}>mg/dL</Text>
        </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Medicion")}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
  },
  dataContainerPresion: {
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  labelPresionArterilal: {
    right: 90,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dataPresionArterial: {
    top: 60,
    left: 30,
    position: 'absolute',
    fontSize: 60,
    color: '#000',
    fontWeight: 'bold',
  },
  unitPresionArterial: {
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 110,
    right: 40
  },
  dataContainerColesterol:{
    marginTop: -20,
    alignItems: 'center',
    marginBottom: 20,
  },
  labelColesterol:{
    right: 80,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dataColesterol:{
    top: 80,
    left: 20,
    position: 'absolute',
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
  },
  unitColesterol:{
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 115,
    right: 35
  },
  dataContainerGlucosa:{
    marginTop: -20,
    alignItems: 'center',
    marginBottom: 20,
  },
  labelGlucosa:{
    right: 80,
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dataGlucosa:{
    top: 80,
    left: 20,
    position: 'absolute',
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
  },
  unitGlucosa:{
    fontSize: 14,
    color: '#000',
    position: 'absolute',
    top: 115,
    right: 25
  },
  button: {
    marginTop: -10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#444',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DataMonitor2;
